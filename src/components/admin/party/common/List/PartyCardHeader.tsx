import { Play } from "lucide-react";

type HeaderTitle<TStatus extends string> = TStatus | "ALL";

interface PartyCardHeaderProps<TStatus extends string> {
  title: HeaderTitle<TStatus>;
  descriptionMap: Partial<Record<TStatus, string>>;

  total: number;
  className?: string;
  setAccordian?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PartyCardHeader<TStatus extends string>(
  {
    title,
    total,
    className,
    setAccordian,
    descriptionMap,
  }: PartyCardHeaderProps<TStatus>) {
  return (
    <div className={`px-5 flex items-center gap-1 font-bold text-base ${className}`}>
      {title !== "ALL" && <button
        type="button"
        onClick={() => setAccordian?.(prev => !prev)}
      >
        <Play fill="#222222" stroke="#222222" className="w-3" />
      </button>}
      <h4>{title == "ALL" ? "전체" : descriptionMap[title]}</h4>
      <h4>{total}</h4>
    </div>
  );
}