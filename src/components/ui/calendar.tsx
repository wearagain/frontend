import * as React from "react";
import { DayButton, DayPicker, getDefaultClassNames, useDayPicker } from "react-day-picker";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <div>
      <DayPicker
        showOutsideDays={showOutsideDays}
        className={cn(
          "w-full bg-background group/calendar [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
          String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
          String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
          className
        )}
        captionLayout={captionLayout}
        formatters={{
          formatMonthDropdown: (date) => date.toLocaleString("default", { month: "short" }),
          ...formatters,
        }}
        classNames={{
          root: cn("w-full", defaultClassNames.root),
          months: cn("flex gap-4 flex-col  w-full", defaultClassNames.months),
          month: cn("flex flex-col w-full gap-4", defaultClassNames.month),
          nav: cn(
            "flex items-center gap-1 w-full  top-0 inset-x-0 justify-between",
            defaultClassNames.nav
          ),
          button_previous: cn(
            "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
            defaultClassNames.button_previous
          ),
          button_next: cn(
            "hover:bg-gray-100 rounded-md",
            "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
            defaultClassNames.button_next
          ),
          month_caption: "hidden",
          dropdowns: cn(
            "w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5",
            defaultClassNames.dropdowns
          ),
          dropdown_root: cn(
            "relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md",
            defaultClassNames.dropdown_root
          ),
          dropdown: cn("absolute bg-popover inset-0 opacity-0", defaultClassNames.dropdown),
          caption_label: cn(
            "select-none font-medium",
            captionLayout === "label"
              ? "text-sm"
              : "rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5",
            defaultClassNames.caption_label
          ),
          table: "w-full border-collapse",
          weekdays: cn("flex", defaultClassNames.weekdays),
          weekday: cn(
            "text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none",
            defaultClassNames.weekday
          ),
          week: cn("flex w-full mt-2", defaultClassNames.week),
          week_number_header: cn(
            "select-none w-(--cell-size)",
            defaultClassNames.week_number_header
          ),
          week_number: cn(
            "text-[0.8rem] select-none text-muted-foreground",
            defaultClassNames.week_number
          ),
          day: cn(
            "relative w-full h-full p-0 text-center [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none",
            props.showWeekNumber
              ? "[&:nth-child(2)[data-selected=true]_button]:rounded-l-md"
              : "[&:first-child[data-selected=true]_button]:rounded-l-md",
            defaultClassNames.day
          ),
          range_start: cn("rounded-l-md bg-accent", defaultClassNames.range_start),
          range_middle: cn("rounded-none", defaultClassNames.range_middle),
          range_end: cn("rounded-r-md bg-accent", defaultClassNames.range_end),
          today: cn("data-[selected=true]:rounded-none", defaultClassNames.today),
          outside: cn(
            "text-muted-foreground aria-selected:text-muted-foreground",
            defaultClassNames.outside
          ),
          disabled: cn("", defaultClassNames.disabled),
          hidden: cn("invisible", defaultClassNames.hidden),
          ...classNames,
        }}
        components={{
          Root: ({ className, rootRef, ...props }) => {
            return <div data-slot='calendar' ref={rootRef} className={cn(className)} {...props} />;
          },
          Nav: CustomNav,
          DayButton: CalendarDayButton,
          ...components,
        }}
        {...props}
      />
    </div>
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <button
      ref={ref}
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      // disabled={modifiers.disabled}
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "flex items-center  justify-center rounded-[10px] px-4 py-4 font-medium transition-all text-16",
        "bg-transparent text-base text-[#222222]",
        modifiers.today && !modifiers.selected && "!text-[#3DC0C5]",
        modifiers.selected && "bg-[#08B0B7] text-white rounded-[8px]",
        "data-[selected-single=true]:bg-[#08B0B7] data-[selected-single=true]:text-white data-[selected-single=true]:font-medium",
        "data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground dark:hover:text-accent-foreground flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md [&>span]:text-xs [&>span]:opacity-70",
        modifiers.selected && "rounded-[8px]",
        defaultClassNames.day,
        modifiers.disabled && "text-[#939396] cursor-not-allowed",
        className
      )}
      {...props}
    />
  );
}

function CustomNav(props: {
  onPreviousClick?: React.MouseEventHandler<HTMLButtonElement>;
  onNextClick?: React.MouseEventHandler<HTMLButtonElement>;
  previousMonth?: Date | undefined;
  nextMonth?: Date | undefined;
}) {
  const { onPreviousClick, onNextClick, previousMonth, nextMonth, ...navProps } = props;

  const { classNames, labels, months } = useDayPicker();

  const date = format(months[0].date, "yyyy.MM");

  return (
    <nav
      {...navProps}
      className={`${classNames.nav} flex items-center justify-center gap-2 px-4 py-2`}
    >
      <button
        type='button'
        onClick={onPreviousClick}
        disabled={!previousMonth}
        aria-label={labels.labelPrevious(previousMonth)}
        className='h-[20px] w-[24px] bg-transparent hover:opacity-80 disabled:text-[#939396]'
      >
        <ChevronLeft className='w-full' strokeWidth={1} />
      </button>

      <div className='w-[70px] h-5 text-[#222222] text-center font-bold text-base'>{date}</div>

      <button
        type='button'
        onClick={onNextClick}
        disabled={!nextMonth}
        aria-label={labels.labelNext(nextMonth)}
        className='h-[20px] w-[24px] bg-transparent hover:opacity-80 disabled:text-[#939396]'
      >
        <ChevronRight className='w-full' strokeWidth={1} />
      </button>
    </nav>
  );
}

export { Calendar, CalendarDayButton };
