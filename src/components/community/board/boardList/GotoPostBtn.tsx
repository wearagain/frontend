import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Edit } from "lucide-react";

export const GotoPostBtn = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("post");
  };

  return (
    <Button
      className='
        fixed bottom-15 right-6
        rounded-full px-6 py-3
        bg-[var(--color-mint-light)]
        text-white font-semibold
        hover:bg-[var(--color-mint-dark)]
        transition-all
        flex gap-2
      '
      onClick={handleClick}
    >
      <Edit className='w-4' />
      글쓰기
    </Button>
  );
};
