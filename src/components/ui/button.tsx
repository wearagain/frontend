import * as React from "react";
import { cn } from "@/lib/utils";

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "flex items-center justify-center rounded-xl px-4 py-3 font-medium transition-all",
          disabled
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-gray-700 text-white hover:opacity-90",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
