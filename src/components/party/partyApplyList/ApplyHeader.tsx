interface ApplyHeaderProps {
  currentTab: "participate" | "host";
  setCurrentTab: (tab: "participate" | "host") => void;
}

export const ApplyHeader = ({ currentTab, setCurrentTab }: ApplyHeaderProps) => {
  const tabs = [
    { id: "participate" as const, label: "파티 참여" },
    { id: "host" as const, label: "파티 주최" },
  ];

  const getTabStyle = (tab: "participate" | "host") => {
    const isActive = currentTab === tab;
    const baseStyle = "w-1/2 text-center cursor-pointer pb-2 transition-colors border-b";

    if (!isActive) {
      return `${baseStyle} border-[#E0E2E4]`;
    }

    const borderColor =
      tab === "participate"
        ? "border-[var(--color-mint-light)] text-[var(--color-mint-light)]"
        : "border-[var(--color-purple-light)] text-[var(--color-purple-light)]";

    return `${baseStyle} font-bold ${borderColor}`;
  };

  return (
    <div className='sticky top-0 flex justify-between pt-6 bg-white z-10'>
      {tabs.map((tab) => (
        <div key={tab.id} onClick={() => setCurrentTab(tab.id)} className={getTabStyle(tab.id)}>
          {tab.label}
        </div>
      ))}
    </div>
  );
};
