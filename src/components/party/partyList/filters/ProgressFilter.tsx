import { Button } from "@/components/ui/button";

interface Props {
  active: boolean;
  onToggle: () => void;
}

export function ProgressFilter({ active, onToggle }: Props) {
  return (
    <Button
      onClick={onToggle}
      className={`h-10 rounded-full border border-gray-300 ${
        active ? "bg-gray-700 text-white" : "bg-white text-gray-700"
      }`}
    >
      진행중
    </Button>
  );
}
