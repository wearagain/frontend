import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "@/assets/icons";
import type { CheckinParty } from "@/pages/qr-checkin/QrCheckinPage";

interface PartySelectionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  parties: CheckinParty[];
  selectedPartyId: string | null;
  onSelectParty: (party: CheckinParty) => void;
  onAddParty: () => void;
}

export const PartySelectionSheet = ({
  isOpen,
  onClose,
  parties,
  selectedPartyId,
  onSelectParty,
  onAddParty,
}: PartySelectionSheetProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="bottom"
        className="rounded-t-3xl px-4 pb-8 pt-4 max-h-[70vh] [&>button]:hidden"
      >
        {/* 핸들 바 */}
        <div className="flex justify-center mb-4">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        <SheetHeader className="mb-6 p-0">
          <SheetTitle className="text-center text-lg font-semibold">
            파티 선택
          </SheetTitle>
        </SheetHeader>

        {/* 파티 리스트 */}
        <div className="flex flex-col gap-3 mb-6 overflow-y-auto max-h-[40vh]">
          {parties.map((party) => {
            const isSelected = party.participantId === selectedPartyId;

            return (
              <button
                key={party.participantId}
                onClick={() => onSelectParty(party)}
                className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                  isSelected
                    ? "border-[var(--color-mint-dark)] bg-[var(--color-mint-dark)]/5"
                    : "border-gray-200 bg-white hover:bg-gray-50"
                }`}
              >
                <div className="flex flex-col items-start">
                  <span className="font-medium text-gray-900">
                    {party.title}
                  </span>
                  <span className="text-sm text-gray-500">
                    {party.date}{party.location && ` · ${party.location}`}
                  </span>
                </div>

                {/* 체크 아이콘 */}
                <div
                  className={`flex items-center justify-center w-6 h-6 rounded-full transition-colors ${
                    isSelected
                      ? "bg-[var(--color-mint-dark)] text-white"
                      : "border border-gray-300 text-transparent"
                  }`}
                >
                  <CheckCircle size={16} />
                </div>
              </button>
            );
          })}
        </div>

        {/* 파티 추가 버튼 */}
        <Button
          onClick={onAddParty}
          className="w-full bg-[var(--color-mint-dark)] hover:bg-[var(--color-mint-light)] text-white py-4 rounded-xl"
        >
          파티 추가
        </Button>
      </SheetContent>
    </Sheet>
  );
};
