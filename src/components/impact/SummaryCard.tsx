interface SummaryData {
  // 기간별 데이터
  hostedParties?: number;
  participatedParties?: number;
  clothesCount?: number;
  exchangedClothesCount?: number;
  // 파티별 데이터
  parties?: number;
  participants?: number;
}

interface SummaryCardProps {
  title: string;
  data: SummaryData;
  showUpdateAt?: boolean;
}

export const SummaryCard = ({ title, data, showUpdateAt = false }: SummaryCardProps) => {
  const metrics = [];

  if (data.hostedParties !== undefined) {
    metrics.push({ label: "주최 파티수", value: data.hostedParties });
  }
  if (data.participatedParties !== undefined) {
    metrics.push({ label: "참여 파티수", value: data.participatedParties });
  }
  if (data.parties !== undefined) {
    metrics.push({ label: "파티수", value: data.parties });
  }
  if (data.participants !== undefined) {
    metrics.push({ label: "파티 참가자수", value: data.participants });
  }
  if (data.clothesCount !== undefined) {
    metrics.push({ label: "의류수", value: data.clothesCount });
  }
  if (data.exchangedClothesCount !== undefined) {
    metrics.push({ label: "의류교환수", value: data.exchangedClothesCount });
  }

  return (
    <div className='bg-[#F4F5F6] rounded-[10px] p-4'>
      <div className='flex items-center justify-between mb-4'>
        <h4 className='text-base font-bold'>{title}</h4>
        {showUpdateAt && <span className='text-xs text-gray-500'>updateAt 기준</span>}
      </div>
      <div className='flex flex-col gap-3'>
        {metrics.map((metric) => (
          <div key={metric.label} className='flex items-center justify-between'>
            <span className='text-sm text-gray-700'>{metric.label}</span>
            <span className='text-sm font-semibold'>{metric.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
