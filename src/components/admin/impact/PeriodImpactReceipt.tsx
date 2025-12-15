import { Download, Calendar } from "lucide-react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import type { DateRange } from "react-day-picker";
import type { EnvironmentalImpactsResponse } from "@/types/impact.ts";

interface PeriodImpactReciptProps {
  onCalendarClick: (v?: boolean) => void;
  dateRange: DateRange | undefined;
  handleDownload: () => void;
  data: EnvironmentalImpactsResponse | undefined;
}

export default function PeriodImpactRecbeipt(
  {
    onCalendarClick,
    dateRange,
    handleDownload,
    data,
  }: PeriodImpactReciptProps) {

  const formatDateRange = (range: DateRange | undefined): string => {
    if (!range?.from) return "전체";
    if (range.from && range.to) {
      return `${format(range.from, "yyyy.MM.dd", { locale: ko })} - ${format(range.to, "yyyy.MM.dd", { locale: ko })}`;
    }
    return format(range.from, "yyyy.MM.dd", { locale: ko });
  };

  return (
    <>
      <button
        onClick={() => onCalendarClick()}
        className="flex items-center gap-2 text-base font-medium"
      >
        <span>{formatDateRange(dateRange)}</span>
        <Calendar size={18} className="text-gray-600" />
      </button>
      <button onClick={handleDownload} className="p-2" disabled={!data}>
        <Download size={20} className="text-gray-600" />
      </button>
    </>
  );
}