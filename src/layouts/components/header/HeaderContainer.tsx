import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface HeaderContainerProps {
  children: ReactNode;
  className?: string;
}

export default function HeaderContainer({ children, className }: HeaderContainerProps) {
  return (
    <header
      className={cn(
        "flex items-end justify-between w-full h-[var(--header-height)] px-4 pb-3 bg-white min-w-max",
        className
      )}
    >
      {children}
    </header>
  );
}
