import { useState, useEffect } from "react";
import type {
  AdminPartyModalProps,
  PartyApplicationResponse,
  PartyManageResponse,
  SelectedItemStatus,
} from "@/types/admin/party.ts";
import PartyCardHeader from "@/components/admin/party/common/List/PartyCardHeader.tsx";
import SectionController from "@/components/admin/party/common/List/SectionController.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";

export interface PartySectionProps<
  TStatus extends string,
  TAction extends string | null,
  TItem extends PartyManageResponse |  PartyApplicationResponse
> {
  items:  (TItem)[];
  header: TStatus;
  canSelect: boolean;

  activeSection: TStatus | null;
  setActiveSection: (v: TStatus | null) => void;

  setSelected: React.Dispatch<React.SetStateAction<SelectedItemStatus<TStatus>>>;
  setBottombarStatus: React.Dispatch<React.SetStateAction<TAction | null>>;
  checkedAction: TAction;

  modalInstance?: AdminPartyModalProps;

  getNextStatus: (status: TStatus | null) => TStatus | undefined;
  descriptionMap: Partial<Record<TStatus, string>>;

  children: (item: TItem) => React.ReactNode;

  isOrder?: boolean;
}

export const PartySection = <
  TStatus extends string,
  TAction extends string | null,
  TItem extends PartyManageResponse |  PartyApplicationResponse
>(
  {
    items,
    header,
    canSelect,
    activeSection,
    setActiveSection,
    setSelected,
    setBottombarStatus,
    checkedAction,
    modalInstance,
    getNextStatus,
    descriptionMap,
    children,
    isOrder
  }: PartySectionProps<TStatus, TAction, TItem>) => {

  /** 아코디언 */
  const [accordian, setAccordian] = useState<boolean>(false);

  /** 체크박스 관리 */
  const [checkedStates, setCheckedStates] = useState<boolean[]>(() => new Array(items.length).fill(false));
  const checkedCount = checkedStates.filter(Boolean).length;
  const parentChecked: boolean | "indeterminate" =
    checkedCount === 0
      ? false
      : checkedCount === items.length
        ? true
        : "indeterminate";

  const clickCheckbox = (index: number) => {
    setActiveSection(header);
    setCheckedStates(prev =>
      prev.map((v, i) => (i === index ? !v : v)),
    );
  };

  const clickParentCheckbox = () => {
    const next = parentChecked !== true;
    setActiveSection(next ? header : null);
    setCheckedStates(new Array(items.length).fill(next));
  };

  useEffect(() => {
    setCheckedStates(new Array(items.length).fill(false));
  }, [items.length]);

  /** 다른 섹션 클릭 시, check 상태 초기화 */
  useEffect(() => {
    if (activeSection !== header) {
      setCheckedStates(new Array(items.length).fill(false));
    }
  }, [activeSection]);


  /** active 섹션 기준으로 bottombar 업데이트 */
  useEffect(() => {
    if (activeSection !== header) return;

    const hasChecked = checkedStates.some(Boolean);

    setBottombarStatus(hasChecked ? checkedAction : null);

    setSelected(prev => ({
      ...prev,
      nextStatus: getNextStatus(activeSection),
      ids: items
        .filter((_, idx) => checkedStates[idx])
        .map(i => i.id),
    }));
  }, [checkedStates, activeSection]);


  return (
    items.length != 0 &&
    <div className={`w-full max-w-full ${!accordian && "mb-2"}`}>
      <PartyCardHeader descriptionMap={descriptionMap} setAccordian={setAccordian} title={header} total={items.length}
                       className="py-5" />

      <span className={accordian ? "hidden" : "block"}>
        {canSelect &&
          <SectionController
            checked={parentChecked}
            onCheckedChange={clickParentCheckbox}
            isActive={header == activeSection}
            isOrder={isOrder}
            {...modalInstance} />}

        {items.map((item, index) =>
          <div
            key={item.id}
            className="flex items-center w-full min-w-0 pl-5 gap-[6px]"
          >
            {canSelect &&
              <Checkbox
                id={item.id}
                checked={checkedStates[index]}
                onCheckedChange={() => clickCheckbox(index)}
              />
            }
            {children(item)}
          </div>,
        )}
        </span>
    </div>
  );


};