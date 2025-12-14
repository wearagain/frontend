import { TreePine, Zap, Droplet } from "lucide-react";

interface EnvironmentalMetricsProps {
  carbonReduced: number; // kg
  energySaved: number; // kWh
  waterSaved: number; // L
}

export const EnvironmentalMetrics = ({
  carbonReduced,
  energySaved,
  waterSaved,
}: EnvironmentalMetricsProps) => {
  const metrics = [
    {
      icon: TreePine,
      label: "감소 탄소량",
      value: `${carbonReduced}kg`,
    },
    {
      icon: Zap,
      label: "아낀 에너지",
      value: `${energySaved}kWh`,
    },
    {
      icon: Droplet,
      label: "아낀 물",
      value: `${waterSaved}L`,
    },
  ];

  return (
    <div className='flex flex-col gap-4'>
      {metrics.map((metric) => {
        const IconComponent = metric.icon;
        return (
          <div key={metric.label} className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <IconComponent size={20} className='text-gray-800' />
              <span className='text-sm text-gray-700'>{metric.label}</span>
            </div>
            <span className='text-sm font-semibold'>{metric.value}</span>
          </div>
        );
      })}
    </div>
  );
};
