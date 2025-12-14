import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MessageCircleMore } from "lucide-react"

export const GoToChatBtn = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/party-chat");
  };

  return (
      <div className='absolute bottom-0 right-0 mb-[72px] mr-5'>
        <Button
            theme="purple"
            className='rounded-full p-4'
            onClick={handleClick}
        >
          <MessageCircleMore className='w-5 h-5' strokeWidth={3}/>
        </Button>
      </div>
  );
};
