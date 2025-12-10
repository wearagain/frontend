import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { CircleX } from "lucide-react";
import { cn } from "@/lib/utils";

type InputProps = React.ComponentProps<"input"> & {
  allowClear?: boolean;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, allowClear, onChange, ...props }, forwardedRef) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [hasValue, setHasValue] = useState(Boolean(props.value ?? props.defaultValue ?? ""));

    useEffect(() => {
      if (props.value !== undefined) {
        setHasValue(Boolean(props.value));
      }
    }, [props.value]);

    const isTextLike = !type || type === "text";
    const clearable = allowClear ?? isTextLike;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (props.value === undefined) {
        setHasValue(Boolean(e.target.value));
      } else {
        setHasValue(Boolean(props.value));
      }
      onChange?.(e);
    };

    const handleClear = () => {
      const el = inputRef.current;
      if (!el) return;

      const nativeSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value"
      )?.set;
      nativeSetter?.call(el, "");
      const event = new Event("input", { bubbles: true });
      el.dispatchEvent(event);
      el.focus();
      setHasValue(false);
    };

    const showClear = clearable && hasValue && !props.disabled;

    return (
      <div className='relative w-full'>
        <input
          type={type}
          className={cn(
            "flex w-full rounded-lg border border-[#E4E4E4] bg-white px-4 py-4 text-base font-medium outline-none ring-offset-white placeholder:text-[#939396] placeholder:font-normal focus-visible:border-[#222222] disabled:cursor-not-allowed disabled:opacity-50",
            showClear && "pr-10",
            className
          )}
          ref={(node) => {
            inputRef.current = node;
            if (typeof forwardedRef === "function") {
              forwardedRef(node);
            } else if (forwardedRef) {
              forwardedRef.current = node;
            }
          }}
          onChange={handleChange}
          {...props}
        />
        {showClear && (
          <button
            type='button'
            aria-label='입력값 삭제'
            onClick={handleClear}
            className='absolute right-4 top-1/2 -translate-y-1/2 text-white'
          >
            <CircleX size={18} fill='#939396' />
          </button>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
