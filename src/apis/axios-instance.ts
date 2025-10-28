import axios, {
  type AxiosInstance,
  AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
  AxiosHeaders,
} from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: new AxiosHeaders({ "Content-Type": "application/json" }),
});

let csrfTokenCache = "";
let csrfInitPromise: Promise<void> | null = null;

export const ensureCsrf = async (): Promise<void> => {
  if (csrfTokenCache) return;

  if (csrfInitPromise) {
    await csrfInitPromise;
    return;
  }

  csrfInitPromise = (async () => {
    try {
      await axiosInstance.get("/csrf", { withCredentials: true });

      const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
      if (match) {
        csrfTokenCache = decodeURIComponent(match[1]);
        console.info("쿠키에서 CSRF 토큰을 읽어왔습니다: ", csrfTokenCache);
      } else {
        console.warn("/csrf 요청 이후에도 쿠키에 XSRF-TOKEN이 존재하지 않습니다.");
      }

      const commonHeaders = axiosInstance.defaults.headers.common;
      if (commonHeaders instanceof AxiosHeaders) {
        commonHeaders.set("X-XSRF-TOKEN", csrfTokenCache);
      } else {
        axiosInstance.defaults.headers.common = new AxiosHeaders({
          ...(commonHeaders || {}),
          "X-XSRF-TOKEN": csrfTokenCache,
        });
      }
    } catch (err) {
      console.error("CSRF 초기화 실패:", err);
    } finally {
      csrfInitPromise = null;
    }
  })();

  await csrfInitPromise;
};

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    const method = (config.method ?? "get").toUpperCase();

    if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
      if (!csrfTokenCache) {
        await ensureCsrf();
      }

      const headers =
        config.headers instanceof AxiosHeaders ? config.headers : new AxiosHeaders(config.headers);

      headers.set("X-XSRF-TOKEN", csrfTokenCache);
      config.headers = headers;
    }

    return config;
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.warn("세션 만료 감지 -> CSRF 토큰 초기화");
      csrfTokenCache = "";
      window.location.href = "/auth/signin";
    }
    return Promise.reject(error);
  }
);
