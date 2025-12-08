import * as C from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils.ts";

export function Checkbox({ checked, className, ...props }: React.ComponentProps<typeof C.Root>) {
  return (
    <C.Root
      className={cn(`
        w-4 h-4 min-w-4 min-h-4
        border border-[#939396] rounded-[3px]
        bg-white
        flex items-center justify-center
        cursor-pointer
        data-[state=checked]:border-[#424242]
        data-[state=checked]:bg-[#424242]
        data-[state=indeterminate]:border-[#424242]
        data-[state=indeterminate]:bg-[#424242]
        `, className)}
      checked={checked}
      {...props}
    >
      <C.Indicator>
        {checked === "indeterminate" ? (
          <Minus className="w-3 h-3" stroke="#ffffff" strokeWidth={4} />
        ) : (
          <Check className="w-3 h-3" stroke="#ffffff" strokeWidth={4} />
        )}
      </C.Indicator>
    </C.Root>
  );
}