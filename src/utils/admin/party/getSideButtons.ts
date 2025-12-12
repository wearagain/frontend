export const copyClipboard = (text: string) => navigator.clipboard.writeText(text);

export const getSideButton: Record<string, (v?: any) => Promise<void>> = {
  currentAttendeeCnt: async () => console.log("참여자 보기"),
  deliverAddress: copyClipboard,
  taxReceipt: async (onClick: (v?: boolean) => void) => onClick(),
  taxId: copyClipboard,
};

