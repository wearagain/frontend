import {clickDeliveryButton} from "@/utils/admin/party/clickDeliveryButton.ts";
import { useNavigate } from "react-router-dom";
import { useOrderSelectionStore } from "@/store/useOrderSelectionStore.ts";

interface PayDeliveryButtonProps {
  data: Record<string, any>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>> | undefined;
}


export default function PayDeliveryButton({ data, setOpenModal }: PayDeliveryButtonProps) {
  const navigate = useNavigate();
  const store = useOrderSelectionStore();


  const handleDeliveryClick = () => {
    clickDeliveryButton({ data, setOpenModal, navigate, store });
  };

  return (
    <button
      type='button'
      onClick={handleDeliveryClick}
      className='text-base font-medium'
    >
      상태 변경
    </button>
  )
}