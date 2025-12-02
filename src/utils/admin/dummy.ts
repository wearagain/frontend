export interface PartyItem {
  partyId: string;
  partyName: string;
  register: string;
  size: number;
}

export const generateDummyParties = (count: number): PartyItem[] => {
  return Array.from({ length: count }, (_, index) => ({
    partyId: `party-${index + 1}`,
    partyName: `파티 이름 ${index + 1}`,
    register: `주최자-${index + 1}`,
    size: Math.floor(Math.random() * 50) + 1, // 1~50
  }));
};
