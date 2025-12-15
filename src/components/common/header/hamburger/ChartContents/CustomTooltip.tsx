import type { TooltipProps } from "recharts";

interface CustomTooltipProps extends TooltipProps<any, any> {
  payload?: any[];
  label?: string;
  active?: boolean;
}

const CustomTooltip=({ active, payload, label }: CustomTooltipProps)=> {
  if (active && payload && payload.length) {
    return (
      <div style={{
        padding: "5px",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        border: "1px solid #E0E2E4",
        borderRadius: "4px",
        fontSize: 12,
        fontWeight: 400,
        color: "#939396",
      }}>
        {`${label}: ${payload[0].value}`}
      </div>
    );
  }
  return null;
};

export default CustomTooltip;