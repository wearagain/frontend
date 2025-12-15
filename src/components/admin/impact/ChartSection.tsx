import {useState} from "react";
import CustomXAxisTick from "@/components/common/header/hamburger/ChartContents/CustomXAxisTick.tsx";
import CustomTooltip from "@/components/common/header/hamburger/ChartContents/CustomTooltip.tsx";
import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getDateTime } from "@/utils/common/convertDataUtils.ts";
import { useGetAdminImpactTotal } from "@/hooks/admin/impact/useGetAdminImpactTotal.ts";
import type { Metric } from "@/types/pages.ts";


interface ChartSectionProps {
  title: string;
}

function generateMockData(days = 7) {
  const data = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const dateObj = new Date(today);
    dateObj.setDate(today.getDate() - i);

    const day = dateObj.getDate();
    const reactValue = Math.floor(Math.random() * 100) + 1; // 1~100 랜덤 숫자

    data.push({
      date: `${day}일`,
      react: reactValue,
    });
  }

  return data;
}


export default function ChartSection({ title }: ChartSectionProps) {

  const {data} = useGetAdminImpactTotal();
  const [category, setCategory] = useState<keyof Metric>("co2Kg");

  const mockData = generateMockData(7);

  const maxValue = Math.max(...mockData.map(d => d.react));
  const maxRounded = Math.ceil(maxValue / 10) * 10;

  const METRIC_BUTTONS: {
    label: string;
    value: keyof Metric;
  }[] = [
    { label: "탄소", value: "co2Kg" },
    { label: "에너지", value: "energyMj" },
    { label: "물", value: "waterM3" },
  ];

  const updateAt = `${getDateTime(new Date(), "yyyy.MM.dd HH")}:00`
  return (
    <div className="flex px-5 flex-col">
      <div className="flex items-center justify-between">
        <label className="font-bold text-base">{title}</label>
        <span className="text-xs text-[#939396]">{updateAt}</span>
      </div>
      <div className="flex justify-end">
        <h4 className="font-medium text-[20px]">{data?.totalMetrics?.[category]}</h4>
      </div>
      <div className="flex flex-row gap-2">
        {METRIC_BUTTONS.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setCategory(value)}
            className={`font-bold text-[14px] ${
              category === value ? "text-black" : "text-[#B0B0B0]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div style={{ height: 120 }}>
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart data={mockData} style={{ outline: "none" }}>
            <Line type="linear" dataKey="react" stroke="#222222" strokeWidth={2} />
            <CartesianGrid
              stroke="#E0E2E4"
              vertical={false}
              strokeDasharray="2 2"
            />
            <YAxis
              domain={[0, maxRounded]}
              ticks={[0, maxRounded / 2, maxRounded]}
              hide
            />
            <XAxis
              dataKey="date"
              axisLine={{ stroke: "#E0E2E4" }}
              tickLine={false}
              interval={0}
              padding={{ left: 15, right: 15 }}
              tick={(props) => (
                <CustomXAxisTick
                  {...props}
                  lastIndex={mockData.length - 1}
                />
              )}
            />
            <Tooltip
              content={<CustomTooltip />}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>

  );
}