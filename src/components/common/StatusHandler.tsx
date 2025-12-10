import React from "react";
import { AxiosError } from "axios";

interface StatusHandlerProps {
  isLoading: boolean;
  isError: boolean;
  error?: AxiosError<any> | null | Error;
  children: React.ReactNode;
}

function isAxiosError(error: any): error is AxiosError {
  return error && typeof error === "object" && "isAxiosError" in error;
}

export default function StatusHandler(
  {
    isLoading,
    isError,
    error,
    children,
  }: StatusHandlerProps) {

  if (isError) {
    if (isAxiosError(error)) {
      const errorData = error.response?.data as any;
      return (
        <div className="p-5">{errorData?.error ?? "에러 발생"}</div>
      );
    }
    // AxiosError가 아니면 그냥 에러 메시지 출력
    return <div className="p-5">{error?.message ?? "에러 발생"}</div>;
  }

  if (isLoading) {
    return <div className="p-5">로딩중...</div>;
  }

  return <>{children}</>;
}
