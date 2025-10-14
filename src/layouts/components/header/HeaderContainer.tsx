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
        "flex items-end justify-between w-full h-16 px-4 pb-2 border-b bg-white",
        className
      )}
    >
      {children}
    </header>
  );
}
