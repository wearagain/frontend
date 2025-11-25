import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const GoToHostBtn = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/host");
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
      '
      onClick={handleClick}
    >
      + 파티 주최하기
    </Button>
  );
};
