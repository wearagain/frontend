import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "react-router-dom";

export default function AddPartyButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/host");
  };

  return (
    <div className='absolute bottom-0 right-0 mb-[72px] mr-5'>
    <Button
      theme='purple'
      className='rounded-full py-[10px] gap-1 px-4'
      onClick={handleClick}
    >
      <Plus className='w-4' strokeWidth={3} />
      <h3>파티 등록하기</h3>
    </Button>
    </div>
  )
}
