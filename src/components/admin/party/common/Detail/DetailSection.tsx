import { PartyDetailMap, SIDE_BUTTON_TEXT } from "@/constants/adminConstants.ts";
import HostInfoDropdown from "@/components/admin/party/common/HostInfoDropdown.tsx";
import PayDeliveryButton from "@/components/admin/party/common/PayDeliveryButton.tsx";
import { generateDetailValues, type PartyDetailKey } from "@/utils/admin/party/generateDetailValues.ts";
import { useSideButtonHandlers } from "@/hooks/admin/party/common/useSideButtonHandlers.ts";

interface DetailSectionProps {
  title: string;
  data: Record<string, any> | undefined;
  keys: readonly string[];
  labelWidth?: string;
  headerButtonType?: "host" | "payDelivery";
  headerButtonProps?: Record<string, any>;
  onOpen?: (v?: boolean) => void;
  isDetail?: boolean;

}

export default function DetailSection(
  {
    title,
    data = [],
    keys,
    labelWidth = "w-[45px]",
    headerButtonType,
    headerButtonProps,
    onOpen,
    isDetail,
  }: DetailSectionProps) {

  const buttonRender = () => {
    switch (headerButtonType) {
      case "host":
        return <HostInfoDropdown />;
      case "payDelivery":
        return <PayDeliveryButton onOpen={onOpen} />;
      default:
        return null;
    }
  };

  const getSideButton = useSideButtonHandlers();

  return (
    <div className="flex flex-col gap-5 px-5 pb-5">
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-base">{title}</h4>
        {buttonRender()}
      </div>
      <div className="flex flex-col gap-4">
        {keys.map((key) => {
          const rawValue = data?.[key];

          const value =
            generateDetailValues[key as PartyDetailKey]
              ? generateDetailValues[key as PartyDetailKey]!(data)
              : rawValue;

          return (
            <div className='flex justify-between items-start gap-5'>
              <div key={key} className="flex items-start gap-5">

                <h3 className={`font-semibold ${labelWidth} shrink-0`}>{PartyDetailMap[key]}</h3>
                <h4 className="font-medium text-base text-[#555558]">{value == null ? "-" : String(value)}</h4>
              </div>

              {isDetail && SIDE_BUTTON_TEXT[key] &&
                <button
                  onClick={() => {
                    if (key in getSideButton) {
                      (getSideButton as Record<string, Function>)[key]?.(headerButtonProps?.[key] ?? value);
                    }
                  }}
                  className="min-w-max font-regular text-sm underline text-[#939396]"
                >
                  {SIDE_BUTTON_TEXT[key]}
                </button>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
