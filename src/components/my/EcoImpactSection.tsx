interface EcoImpactProps {
  updatedAt: string;
}

const exchangeRecords = [
    {
      title: "GoodBye&Hello태그",
      countLabel: "1개",
      icon: "🏷️",
    },
    {
      title: "이번 달 의류교환",
      countLabel: "1번",
      icon: "👔",
    },
];

export default function EcoImpactSection({ updatedAt }: EcoImpactProps) {
  return (
    <div className='flex flex-col gap-4 px-5 my-5'>
      <div className='flex items-center justify-between'>
        <h3>내 의류교환 기록</h3>
        <span className='text-xs text-[#939396]'>{updatedAt}</span>
      </div>
      <div className='grid grid-cols-2 gap-4'>
        {exchangeRecords.map(({ title, countLabel, icon }) => (
          <div
            key={title}
            className='rounded-xl bg-[#F3F4F6] py-5 flex flex-col items-center justify-center gap-2'
          >
            <p className='text-sm font-medium text-[#555558]'>{title}</p>
            <div className='flex items-center gap-2 text-sm font-semibold text-(--color-mint-light)'>
              <span>{icon}</span>
              <span>{countLabel}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
