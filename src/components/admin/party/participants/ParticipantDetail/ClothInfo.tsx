import SectionTitle from "@/components/community/exchange/requestApply/SectionTitle.tsx";

interface ClothInfoProps {
  code: string;
  name?: string;
  compact?: boolean;
  imageUrl?: string | null;
  description?: string;
}

export default function ClothInfo({ code, name, imageUrl, description }: ClothInfoProps) {
  return (
    <div className={`flex gap-4 items-start`}>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name || "의류"}
          className="w-[66px] min-w-[66px] h-[66px] rounded-[10px] object-cover"
        />
      ) : (
        <div className="w-[66px] min-w-[66px] h-[66px] rounded-[10px] bg-gray-200" />
      )}

      <div className="flex-1 min-w-0 flex flex-col">
        <SectionTitle title={name || "수선의류명"} />

        <span className="flex flex-col break-words">
          {description && (<p className="font-medium text-[#555558] truncate">{description}</p>)}
          <p className="font-medium truncate">의류코드 {code}</p>
        </span>
      </div>
    </div>

  );
}
