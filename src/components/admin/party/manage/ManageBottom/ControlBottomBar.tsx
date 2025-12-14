import { Button } from "@/components/ui/button.tsx";
import type { ManageAction } from "@/types/admin/party.ts";

interface ControlBottomBarProps {
  setAction: React.Dispatch<React.SetStateAction<ManageAction | null>>;
}

export default function ControlBottomBar({ setAction }: ControlBottomBarProps) {
  return (
    <div className="bottombar-wrapper">
      <div className="bottombar">
        <Button
          type="button"
          onClick={() => setAction("confirm")}
          theme="purple"
          variant="primary"
          className="flex-1 h-full min-h-[52px]"
        >
          변경
        </Button>

        <Button
          type="button"
          onClick={() => setAction("delete")}
          theme="purple"
          variant="primary"
          className="flex-1 h-full min-h-[52px]"
        >
          삭제
        </Button>
      </div>
    </div>
  );
}
