import * as React from "react";
import { cn } from "@/lib/utils";
import { buttonTheme, type ThemeKey, type VariantKey } from "@/constants/themeColor.ts";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: ThemeKey;
  variant?: VariantKey<ThemeKey>;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, disabled, theme = "mint", variant = "primary", ...props }, ref) => {
    const appliedTheme = disabled ? "disabled" : theme;
    const colorSet = buttonTheme[appliedTheme][variant];

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "flex items-center justify-center rounded-[10px] px-4 py-4 font-medium transition-all text-16",
          `${colorSet.base} ${colorSet.hover}`,
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
