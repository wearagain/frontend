import { useParams } from "react-router-dom";
import { Close } from "@/components/common/header";
import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useMutateApplicationStatus } from "@/hooks/admin/party/useMutateApplicationStatus.ts";

interface FormData {
  reason: string;
}

export default function RejectModal() {
  const navigate = useNavigate();
  const { partyId } = useParams<{ partyId: string }>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      reason: "",
    },
  });

  const onSubmit = (values: FormData) => {
    mutateApplicationStatus({
      id: partyId!,
      action: "reject",
      params: {
        reason: values.reason,
      },
    });
  };

  const { mutate: mutateApplicationStatus } = useMutateApplicationStatus();

  return (
    <div className='fixed left-0 right-0 inset-0 z-[1001] flex min-h-max flex-col justify-between bg-white max-w-[430px] mx-auto top-0 h-full'>
      <div className='sticky top-0 flex items-end justify-between w-full h-[var(--header-height)] px-4 pb-3 bg-white'>
        <Close onClose={() => navigate(-1)} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-start flex-1 gap-4'>
        <div className='p-5 w-full border-b border-[#E0E2E4]'>
          <h2>파티 주최를 반려합니다</h2>
          <h2>사유를 입력해 주세요</h2>
        </div>
        <div className='px-5 flex flex-col w-full gap-[6px]'>
          <h3 className='text-gray-500'>사유</h3>
          <Controller
            name='reason'
            control={control}
            rules={{ required: "반려 사유를 입력해주세요" }}
            render={({ field }) => (
              <>
                <textarea
                  {...field}
                  placeholder='반려 사유'
                  className='border border-gray-200 rounded-lg p-4 w-full min-h-[120px] resize-none overflow-y-auto text-start'
                  style={{ whiteSpace: "pre-wrap" }}
                />
                {errors.reason && (
                  <p className='text-red-500 text-sm mt-1'>{errors.reason.message}</p>
                )}
              </>
            )}
          />
        </div>
      </form>
      <div className='bg-white sticky bottom-0 flex items-center justify-center pt-5 w-full'>
        <Button
          type='button'
          onClick={handleSubmit(onSubmit)}
          theme='purple'
          variant='primary'
          className='h-[52px] mb-14 mx-5 w-full'
        >
          반려하기
        </Button>
      </div>
    </div>
  );
}
