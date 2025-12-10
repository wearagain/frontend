import { Button } from "@/components/ui/button.tsx";
import type { ManageBarStatus } from "@/types/admin/party.ts";

interface ControlBottomBarProps {
  setBottombarStatus: React.Dispatch<React.SetStateAction<ManageBarStatus>>;
}

export default function ControlBottomBar({ setBottombarStatus }: ControlBottomBarProps) {
  return (
    <div className="bottombar-wrapper">
      <div className="bottombar">
        <Button
          type="button"
          onClick={() => setBottombarStatus("confirm")}
          theme="purple"
          variant="primary"
          className="flex-1 h-full min-h-[52px]"
        >
          변경
        </Button>

        <Button
          type="button"
          onClick={() => setBottombarStatus("delete")}
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
