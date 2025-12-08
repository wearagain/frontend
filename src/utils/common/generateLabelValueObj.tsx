export const generateLabelValueObj = <T extends string>(
  record: Record<T, string>
): { label: string; value: T }[] => {
  return (Object.entries(record) as [T, string][]).map(([key, value]) => ({
    label: value,
    value: key,
  }));
};
