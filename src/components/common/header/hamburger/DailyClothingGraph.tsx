import { getDateTime } from "@/utils/common/convertDataUtils.ts";
import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import CustomTooltip from "@/components/common/header/hamburger/ChartContents/CustomTooltip.tsx";
import CustomXAxisTick from "@/components/common/header/hamburger/ChartContents/CustomXAxisTick.tsx";


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

export default function DailyClothingGraph() {

  const mockData = generateMockData(7);

  const maxValue = Math.max(...mockData.map(d => d.react));
  const totalValue = mockData.reduce((acc, cur) => acc + cur.react, 0);
  const maxRounded = Math.ceil(maxValue / 10) * 10;

  return (
    <div className="flex flex-col px-4 py-5 gap-4">
      <div className='flex flex-col p-1 gap-2 w-full'>
        <div className="flex items-center justify-between">
          <label className="font-bold text-base">일간 의류교환수</label>
          <span className="text-xs text-[#939396]">{getDateTime(new Date(), "yyyy.MM.dd HH:")}00</span>
        </div>
        <div className="flex justify-end">
          <h4 className="font-medium text-[20px]">{totalValue}</h4>
        </div>
      </div>
      <div style={{ height: 120 }}>
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart data={mockData} style={{ outline: 'none' }}>
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
