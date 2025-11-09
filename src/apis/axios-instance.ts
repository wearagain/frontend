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

export const getPing = async (): Promise<void> => {
  try {
    await axiosInstance.get("/public/ping");

    const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
    if (match) {
      csrfTokenCache = decodeURIComponent(match[1]);
      console.info("쿠키에서 XSRF-TOKEN 읽어옴:", csrfTokenCache);
    } else {
      console.warn("/ping 요청 후에도 XSRF-TOKEN 쿠키가 존재하지 않습니다.");
    }
  } catch (error) {
    console.error("Ping 요청 실패:", error);
  }
};

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    const method = (config.method ?? "get").toUpperCase();

    if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
      if (!csrfTokenCache) {
        await getPing();
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
      console.warn("세션 만료 감지 → 쿠키 초기화");
      csrfTokenCache = "";
    }
    return Promise.reject(error);
  }
);
