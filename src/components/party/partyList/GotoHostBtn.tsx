import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {Plus} from "lucide-react"

export const GoToHostBtn = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/host");
  };

  return (
    <div className='absolute bottom-8 right-0 mb-[72px] mr-5'>
      <Button
      className='rounded-full py-[10px] gap-1 px-4'
      onClick={handleClick}
    >
      <Plus className='w-4' strokeWidth={3}/>
        <h3>파티 주최하기</h3>
    </Button>
    </div>
  );
};
