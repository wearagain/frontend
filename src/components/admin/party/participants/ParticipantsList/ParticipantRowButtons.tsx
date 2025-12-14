import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "react-router-dom";
import type { ApplicationStatus } from "@/types/admin/party.ts";

interface PartyRowButtonsProps {
  status: ApplicationStatus;
  id: string;
  openApproveModal: (open: boolean) => void;
}



export default function ParticipantRowButtons({ status, id, openApproveModal }: PartyRowButtonsProps) {

  const getStatusCSS = (status: ApplicationStatus, type: ApplicationStatus) => {
    if (status == type)
      return `bg-[var(--color-purple-lighter)]
              text-[var(--color-purple-light)]
              border-[var(--color-purple-light)]`;
    return `bg-gray-200 border-gray-200 text-gray-500 `;
  };

  const buttonCSS = `
            h-[40px] w-fit
             flex items-center border justify-center rounded-[10px] px-4 py-4 font-medium transition-all text-16
            `;

  const navigate = useNavigate();
  return (
    <div className="min-w-max flex gap-2">
      {status == "PENDING" ?
        (<>
            <Button
              type="button"
              onClick={() => openApproveModal(true)}
              // onClick={() => navigate(`${id}/approve`)}
              theme="normalOutlined"
              variant="primary"
              className="h-[40px] w-fit"
            >
              승인
            </Button>

            <Button
              type="button"
              onClick={() => navigate(`${id}/reject`)}
              theme="normalOutlined"
              variant="primary"
              className="h-[40px] w-fit"
            >
              반려
            </Button>
          </>
        ) : (
          <>
            <div className={`${getStatusCSS(status, "APPROVED")} ${buttonCSS}`} >
              승인
            </div>

            <div  className={`${getStatusCSS(status, "REJECTED")} ${buttonCSS}`} >
              반려
            </div>
          </>)
      }

    </div>
  );
}