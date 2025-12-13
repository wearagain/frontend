import { useParams } from "react-router-dom";
import { Close } from "@/components/common/header";
import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { useMutateApplicationStatus } from "@/hooks/admin/party/applications/useMutateApplicationStatus.ts";
import Textarea from "@/components/ui/textarea.tsx";

interface FormData {
  reason: string;
}

export default function RejectModal() {
  const navigate = useNavigate();
  const { applicationId } = useParams<{ applicationId: string }>();

  const methods = useForm<FormData>({
    defaultValues: {
      reason: "",
    },
  });

  const { control, handleSubmit } = methods;

  const onSubmit = (values: FormData) => {
    mutateApplicationStatus(
      {
        id: applicationId!,
        action: "reject",
        params: {
          reason: values.reason,
        },
      },
      {
        onSuccess: () => {
          navigate(-1);
        },
      },
    );
  };

  const { mutate: mutateApplicationStatus } = useMutateApplicationStatus();

  return (
    <div
      className="fixed left-0 right-0 inset-0 z-[1001] flex min-h-max flex-col justify-between bg-white max-w-[430px] mx-auto top-0 h-full">
      <div className="sticky top-0 flex items-end justify-between w-full h-[var(--header-height)] px-4 pb-3 bg-white">
        <Close onClose={() => navigate(-1)} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-start flex-1 gap-4">
        <div className="p-5 w-full border-b border-[#E0E2E4]">
          <h2>파티 주최를 반려합니다</h2>
          <h2>사유를 입력해 주세요</h2>
        </div>
        <div className="px-5 flex flex-col w-full gap-[6px]">
          <h3 className="text-gray-500">사유</h3>
          <FormProvider {...methods}>
            <Textarea
              inputName="reason"
              control={control}
              rules={{
                required: "반려 사유를 입력해주세요",
              }}
              placeholder="반려 사유"
              className='min-h-[120px]'
            />
          </FormProvider>
        </div>
      </form>
      <div className="bg-white sticky bottom-0 flex items-center justify-center pt-5 w-full">
        <Button
          type="button"
          onClick={handleSubmit(onSubmit)}
          theme="purple"
          variant="primary"
          className="h-[52px] mb-14 mx-5 w-full"
        >
          반려하기
        </Button>
      </div>
    </div>
  );
};
