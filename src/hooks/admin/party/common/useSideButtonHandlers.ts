export const copyClipboard = (text: string) => navigator.clipboard.writeText(text);

export function useSideButtonHandlers() {

  const navigateTo = async (onClick?: (v?: boolean) => void) => {
    onClick?.(true);
  };


  const taxReceipt = async (onClick?: (v?: boolean) => void) => {
    onClick?.(true);
  };

  const taxId = async (text?: string) => {
    if (text) await copyClipboard(text);
  };

  const deliverAddress = async (text?: string) => {
    if (text) await copyClipboard(text);
  };

  return {
    currentAttendeeCnt: navigateTo,
    deliverAddress,
    taxReceipt,
    taxId,
  };
}
