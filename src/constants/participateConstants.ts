export type ExchangeHistoryStatus = "NONE" | "EXISTS";

export const EXCHANGE_HISTORY_DESCRIPTION: Record<ExchangeHistoryStatus, string> = {
  NONE: "교환 이력 없음",
  EXISTS: "교환 이력 있음",
};

export function getExchangeDescription(clothingNumber: string | null): string {
  if (clothingNumber) {
    return clothingNumber;
  }
  return EXCHANGE_HISTORY_DESCRIPTION.NONE;
}