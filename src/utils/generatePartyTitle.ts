/**
 * 주소와 주최자명으로 파티 타이틀을 생성
 * @param address 전체 주소 문자열
 * @param groupName 주최자명 (단체명 또는 개인명)
 * @returns ex) "서울 강남구 같이입어", "부산 같이입어", "성남 같이입어"
 */
export const generatePartyTitle = (address: string, groupName: string): string => {
  if (!address) return groupName;

  const seoulMatch = address.match(/서울특별시\s?(\S+구)/);
  if (seoulMatch) {
    return `서울 ${seoulMatch[1]} ${groupName}`.trim();
  }

  const metroMatch = address.match(/(대전|광주|대구|부산|울산|인천|제주)/);
  if (metroMatch) {
    return `${metroMatch[1]} ${groupName}`.trim();
  }

  const regionMatch = address.match(/(\S+(시|군|구))/);
  if (regionMatch) {
    return `${regionMatch[1]} ${groupName}`.trim();
  }

  return groupName;
};
