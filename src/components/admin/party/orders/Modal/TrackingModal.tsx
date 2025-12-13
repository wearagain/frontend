import type { FieldValues } from "react-hook-form";
import { Close } from "@/components/common/header";
import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "react-router-dom";
import { useOrderSelectionStore } from "@/store/useOrderSelectionStore.ts";
import InfoRow from "@/components/admin/party/orders/Modal/ModalContents/InfoRow.tsx";
import { FormProvider, useForm } from "react-hook-form";
import { usePatchDeliveryStatus } from "@/hooks/admin/party/applications/usePatchDeliveryStatus.ts";
import type { PatchDeliveryStatusParams } from "@/types/admin/party.ts";
import { DeliveryStatusDescription } from "@/constants/adminConstants.ts";

export default function TrackingModal() {
  const navigate = useNavigate();

  const {
    selected,
    reset
  } = useOrderSelectionStore();

  const { mutateAsync: mutateDeliveryStatus } = usePatchDeliveryStatus();

  const methods = useForm();

  const { handleSubmit } = methods;

  const onSubmit = async (values: FieldValues) => {
    const results = await Promise.allSettled(
      Object.entries(values).map(([id, value]) => {
        const queryBody: PatchDeliveryStatusParams = {
          applicationId: id,
          params: {
            deliveryStatus: selected.nextStatus,
            trackingNumber: value,
          },
        };
        return mutateDeliveryStatus(queryBody);
      }),
    );
    const fulfilled = results.filter(r => r.status === "fulfilled");
    const rejected = results.filter(r => r.status === "rejected");

    if (rejected.length > 0) {
      alert(`${rejected.length}건의 요청이 실패했습니다. 다시 시도해주세요.`);
    }

    if (fulfilled.length > 0) {
      alert(`${DeliveryStatusDescription[selected.nextStatus]} 처리가 완료되었습니다.`);
    }
    reset();
    navigate(-1);
  };

  return (
    <div className="fixed left-0 right-0 inset-0 z-[1001] bg-white w-full top-0 h-full">
      <div className="flex min-h-max flex-col max-w-[430px] mx-auto top-0 h-full">
        <div className="sticky top-0 flex items-end justify-between w-full h-[var(--header-height)] px-4 pb-3">
          <Close onClose={() => navigate(-1)} />
        </div>

        <div className="flex flex-col items-start gap-4">
          <div className="p-5 w-full border-b border-[#E0E2E4]">
            <h2>배송 정보 확인을 위해</h2>
            <h2>송장번호를 입력해 주세요</h2>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 items-start overflow-y-auto custom-scroll">
          <FormProvider {...methods}>
            <div className="divider-between">
              {selected?.items?.map((order) => (
                <InfoRow key={order.id} {...order} />
              ))}
            </div>
          </FormProvider>
        </form>
        <div className="bg-white sticky bottom-0 flex items-center justify-center pt-5 w-full">
          <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            theme="purple"
            variant="primary"
            className="h-[52px] mb-14 mx-5 w-full"
          >
            승인하기
          </Button>
        </div>
      </div>
    </div>
  );
}
