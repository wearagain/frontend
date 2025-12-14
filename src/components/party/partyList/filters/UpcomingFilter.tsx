import { Button } from "@/components/ui/button";

interface Props {
  active: boolean;
  onToggle: () => void;
}

export function UpcomingFilter({ active, onToggle }: Props) {
  return (
    <Button
      onClick={onToggle}
      theme = {"mint"}
      className={`h-9 w-fit min-w-max rounded-full border transition-colors hover:border-(--color-mint-dark) ${
          active ? "bg-(--color-mint-lighter) text-(--color-mint-light)" : "bg-white border-gray-200 text-[#222222]"
      }`}
    >
      진행예정
    </Button>
  );
}
