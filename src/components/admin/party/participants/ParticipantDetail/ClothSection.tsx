import ClothInfo from "@/components/admin/party/participants/ParticipantDetail/ClothInfo.tsx";
import type { PartyParticipantResponse } from "@/types/apply.ts";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface ClothSectionProps {
  data: PartyParticipantResponse | undefined;
}

export default function ClothSection({ data }: ClothSectionProps) {
  const [collapse, setCollapse] = useState<boolean>(false);

  return(
    <div className="p-5 flex flex-col gap-5">
      <div className="flex justify-between">
        <h2 className="font-bold text-base">신청 품목 정보 {data?.clothingItems.length}</h2>
        <button
          type="button"
          onClick={() => setCollapse(!collapse)}
        >
          {collapse ? <ChevronDown /> : <ChevronUp />}
        </button>
      </div>
      <div className={`flex flex-col gap-4 w-full custom-scroll ${collapse ? "hidden" : "block"}`}>
        {data?.clothingItems?.map((item) =>
          <ClothInfo
            name={item.subCategory}
            code={item.clothingNumber ?? ""}
            imageUrl={item.imageUrls?.[0]}
            description={item.description}
            compact={true}
          />,
        )}
      </div>
    </div>
  )
}