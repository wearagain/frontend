"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "@/assets/icons";

import { cn } from "@/lib/utils";

function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot='checkbox'
      className={cn(
        "peer border-[1px] border-gray-700 bg-white dark:bg-input/30 data-[state=checked]:bg-black data-[state=checked]:text-white data-[state=checked]:border-black focus-visible:ring-ring/50 focus-visible:border-gray-700 rounded-[4px] size-4 shrink-0 shadow-xs transition-shadow outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot='checkbox-indicator'
        className='grid place-content-center text-current transition-none'
      >
        <CheckIcon className='size-3.5' />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
