/**
 * 데이터를 CSV 형식으로 변환하여 다운로드하는 유틸리티 함수
 */

export interface CSVData {
  [key: string]: string | number | null | undefined;
}

/**
 * 객체 배열을 CSV 문자열로 변환
 */
export const convertToCSV = (data: CSVData[], headers?: string[]): string => {
  if (data.length === 0) return "";

  // 헤더 추출 (headers가 제공되지 않으면 첫 번째 객체의 키 사용)
  const csvHeaders = headers || Object.keys(data[0]);

  // CSV 헤더 행
  const headerRow = csvHeaders.join(",");

  // 데이터 행들
  const dataRows = data.map((row) => {
    return csvHeaders
      .map((header) => {
        const value = row[header];
        // 값이 null이나 undefined인 경우 빈 문자열
        if (value === null || value === undefined) return "";
        // 문자열에 쉼표나 따옴표가 포함된 경우 처리
        const stringValue = String(value);
        if (stringValue.includes(",") || stringValue.includes('"') || stringValue.includes("\n")) {
          return `"${stringValue.replace(/"/g, '""')}"`;
        }
        return stringValue;
      })
      .join(",");
  });

  return [headerRow, ...dataRows].join("\n");
};

/**
 * CSV 파일 다운로드
 */
export const downloadCSV = (csvContent: string, filename: string = "data.csv"): void => {
  // BOM 추가 (한글 깨짐 방지)
  const BOM = "\uFEFF";
  const blob = new Blob([BOM + csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * 데이터를 CSV로 변환하고 다운로드
 */
export const exportToCSV = (data: CSVData[], filename: string, headers?: string[]): void => {
  const csvContent = convertToCSV(data, headers);
  downloadCSV(csvContent, filename);
};
