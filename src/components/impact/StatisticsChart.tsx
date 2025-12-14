import { useState, useMemo } from "react";

interface DataPoint {
  label: string;
  value: number;
}

interface StatisticsChartProps {
  period: number;
  dataPoints: DataPoint[];
  activeMetric?:
    | "participants"
    | "clothes"
    | "exchangedClothes"
    | "carbon"
    | "energy"
    | "water"
    | "hostedParties"
    | "participatedParties";
  metrics?: Array<
    | "participants"
    | "clothes"
    | "exchangedClothes"
    | "carbon"
    | "energy"
    | "water"
    | "hostedParties"
    | "participatedParties"
  >;
  showPeriod?: boolean;
  // 메트릭별 데이터 매핑 (선택한 메트릭에 따라 다른 값을 표시)
  metricDataMap?: Record<string, DataPoint[]>;
}

const metricLabels: Record<
  | "participants"
  | "clothes"
  | "exchangedClothes"
  | "carbon"
  | "energy"
  | "water"
  | "hostedParties"
  | "participatedParties",
  string
> = {
  participants: "참가자수",
  clothes: "의류수",
  exchangedClothes: "의류교환수",
  carbon: "탄소",
  energy: "에너지",
  water: "물",
  hostedParties: "주최 파티수",
  participatedParties: "참여 파티수",
};

export const StatisticsChart = ({
  period,
  dataPoints,
  activeMetric = "exchangedClothes",
  metrics = ["participants", "clothes", "exchangedClothes"],
  showPeriod = true,
  metricDataMap,
}: StatisticsChartProps) => {
  const [selectedMetric, setSelectedMetric] = useState(activeMetric);

  // 선택한 메트릭에 따라 데이터 포인트 선택
  const currentDataPoints = useMemo(() => {
    if (metricDataMap && metricDataMap[selectedMetric]) {
      return metricDataMap[selectedMetric];
    }
    return dataPoints;
  }, [selectedMetric, metricDataMap, dataPoints]);

  // 그래프 높이와 너비
  const chartHeight = 200;
  const chartWidth = 100;
  const padding = 20;

  // 데이터가 없을 때 처리
  if (currentDataPoints.length === 0) {
    return (
      <div className='flex flex-col gap-4'>
        <div className='flex items-center justify-center py-12 text-gray-500'>
          <p>표시할 데이터가 없습니다.</p>
        </div>
      </div>
    );
  }

  // 데이터 정규화 (그래프 영역에 맞게)
  const maxValue = Math.max(...currentDataPoints.map((d) => d.value), 1);
  const minValue = Math.min(...currentDataPoints.map((d) => d.value), 0);
  const range = maxValue - minValue || 1;

  // SVG 경로 생성
  const points = currentDataPoints.map((point, index) => {
    const x = padding + (index * (chartWidth - padding * 2)) / (currentDataPoints.length - 1 || 1);
    const y =
      padding +
      chartHeight -
      padding * 2 -
      ((point.value - minValue) / range) * (chartHeight - padding * 2);
    return { x, y, value: point.value };
  });

  // 라인 경로 생성
  const pathData = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  return (
    <div className='flex flex-col gap-4'>
      {/* 메트릭 선택 */}
      <div className='flex items-center gap-1 flex-wrap'>
        {metrics.map((key, index) => (
          <span key={key} className='flex items-center'>
            <button
              onClick={() => setSelectedMetric(key)}
              className={`text-sm transition-colors ${
                selectedMetric === key
                  ? "text-[var(--color-mint-dark)] font-semibold"
                  : "text-gray-500"
              }`}
            >
              {metricLabels[key]}
            </button>
            {index < metrics.length - 1 && <span className='text-gray-400 mx-1'>·</span>}
          </span>
        ))}
      </div>

      {/* 진행기간 */}
      {showPeriod && (
        <div className='flex items-center gap-2'>
          <span className='text-sm text-gray-500'>진행기간</span>
          <span className='text-2xl font-bold text-[var(--color-mint-dark)]'>{period}</span>
        </div>
      )}

      {/* 그래프 */}
      <div className='relative w-full' style={{ height: `${chartHeight}px` }}>
        <svg
          width='100%'
          height={chartHeight}
          className='overflow-visible'
          viewBox={`0 0 ${chartWidth + padding * 2} ${chartHeight}`}
          preserveAspectRatio='xMidYMid meet'
        >
          {/* 그리드 라인 */}
          {[0, 1, 2, 3, 4].map((i) => {
            const y = padding + (i * (chartHeight - padding * 2)) / 4;
            return (
              <line
                key={i}
                x1={padding}
                y1={y}
                x2={chartWidth + padding}
                y2={y}
                stroke='#E5E7EB'
                strokeWidth='1'
                strokeDasharray='2 2'
              />
            );
          })}

          {/* 데이터 라인 */}
          <path
            d={pathData}
            fill='none'
            stroke='var(--color-mint-dark)'
            strokeWidth='2.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />

          {/* 데이터 포인트 */}
          {points.map((point, index) => (
            <g key={index}>
              <circle
                cx={point.x}
                cy={point.y}
                r='5'
                fill='var(--color-mint-dark)'
                stroke='white'
                strokeWidth='2'
              />
              {/* X축 라벨 */}
              <text
                x={point.x}
                y={chartHeight - 5}
                textAnchor='middle'
                fontSize='10'
                fill='#6B7280'
                className='font-medium'
              >
                {currentDataPoints[index].label}
              </text>
            </g>
          ))}

          {/* 최신 값 표시 */}
          {points.length > 0 && (
            <text
              x={points[points.length - 1].x + 12}
              y={points[points.length - 1].y - 8}
              fontSize='16'
              fill='var(--color-mint-dark)'
              className='font-bold'
            >
              {points[points.length - 1].value}
            </text>
          )}
        </svg>
      </div>
    </div>
  );
};
