import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "rounded-sm border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        mint: "rounded-full border-transparent bg-(--color-mint-light) text-white [a&]:hover:bg-(--color-mint-dark)",
        purple:
          "rounded-full border-transparent bg-(--color-purple-light) text-white [a&]:hover:bg-(--color-purplr-dark)",
        destructive:
          "rounded-full border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "rounded-full border-[#E4E4E4] text-[#222222]",
        outlineMint: "rounded-full border-(--color-mint-light) text-(--color-mint-light) [a&]:hover:bg-(--color-mint-light) [a&]:hover:text-white",
        outlinePurple: "rounded-full border-(--color-purple-light) text-(--color-purple-light) [a&]:hover:bg-(--color-purple-light) [a&]:hover:text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp data-slot='badge' className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge };
