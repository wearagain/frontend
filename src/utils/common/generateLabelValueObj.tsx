export const generateLabelValueObj = <T extends string>(
  record: Record<T, string>
): { label: string; value: T }[] => {
  return (Object.entries(record) as [T, string][]).map(([key, value]) => ({
    label: value,
    value: key,
  }));
};


export const generateALLLabelValueObj = <T extends string>(
  record: Record<T, string>
): { label: string; value: T | "ALL" }[] => {
  const arr = (Object.entries(record) as [T, string][]).map(([key, value]) => ({
    label: value,
    value: key,
  }));

  return [{ label: "전체", value: "ALL" }, ...arr];
};