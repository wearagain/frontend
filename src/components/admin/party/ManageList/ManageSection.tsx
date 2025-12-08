import { useState } from "react";
import type { PartyManageResponse } from "@/types/admin/party.ts";
import { PartyCard } from "@/components/admin/party/ManageList/PartyCard.tsx";
import PartyCardHeader from "@/components/admin/party/ManageList/PartyCardHeader.tsx";
import type { PartyStatus } from "@/types/party.ts";
import SectionController from "@/components/admin/party/ManageList/SectionController.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";

interface ManageSectionProps {
  items: PartyManageResponse[];
  header: PartyStatus;
}

export const ManageSection = ({ items, header }: ManageSectionProps) => {

  const [checkedStates, setCheckedStates] = useState<boolean[]>(
    () => new Array(items.length).fill(false),
  );

  const checkedCount = checkedStates.filter(Boolean).length;

  const parentChecked: boolean | "indeterminate" =
    checkedCount === 0
      ? false
      : checkedCount === items.length
        ? true
        : "indeterminate";

  const clickCheckbox = (index: number) => {
    setCheckedStates(prev =>
      prev.map((v, i) => (i === index ? !v : v)),
    );
  };

  const clickParentCheckbox = () => {
    const next = parentChecked !== true;
    setCheckedStates(new Array(items.length).fill(next));
  };


  return (
    items.length != 0 &&
    <div className="w-full max-w-full mb-2">
      <PartyCardHeader title={header} total={items.length} className="py-5" />

      <SectionController checked={parentChecked} onCheckedChange={clickParentCheckbox} />

      {items.map((item, index) =>

          <div
            key={item.id}
            className="flex items-center w-full min-w-0 pl-5 gap-[6px]"
          >
            <Checkbox
              id={item.id}
              checked={checkedStates[index]}
              onCheckedChange={() => clickCheckbox(index)}
            />
            <PartyCard {...item} />
          </div>

      )}
    </div>
  );


};