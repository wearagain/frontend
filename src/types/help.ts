// ParyInquiry Type
export type inquiryType = "APPLICATION" | "PAYMENT" | "DELIVERY" | "ETC";

// Request DTO
export interface CreateInquiryRequest {
  inquiryType: inquiryType,
  title: string,
  content: string,
}