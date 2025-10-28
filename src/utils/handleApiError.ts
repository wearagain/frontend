import type { AxiosError } from "axios";

function isAxiosErrorWithMessage(
  error: unknown
): error is AxiosError<{ error?: string; message?: string }> {
  return (
    typeof error === "object" &&
    error !== null &&
    "isAxiosError" in error &&
    (error as AxiosError).isAxiosError === true
  );
}

export function handleApiError(error: unknown): string {
  if (isAxiosErrorWithMessage(error)) {
    const data = error.response?.data;
    return data?.error || data?.message || "요청 처리 중 오류가 발생했습니다.";
  }

  if (error instanceof Error) {
    return error.message || "알 수 없는 오류가 발생했습니다.";
  }

  return "요청 처리 중 예상치 못한 오류가 발생했습니다.";
}
