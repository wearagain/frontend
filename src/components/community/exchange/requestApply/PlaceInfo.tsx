import { useFormContext, useWatch } from "react-hook-form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-long.tsx";
import { Button } from "@/components/ui/button.tsx";
import { ChevronDownIcon } from "@/assets/icons";
import SectionTitle from "./SectionTitle";
import { useGetBaseAreas } from "@/hooks/exchange/useGetBaseAreas";
import StatusHandler from "@/components/common/StatusHandler.tsx";

export default function PlaceInfo() {
  const { register, setValue } = useFormContext();
  const place = useWatch({ name: "place" });
  const placeId = useWatch({ name: "placeId" });
  const { data: baseAreas, isLoading, isError, error } = useGetBaseAreas();

  const handleSelect = (id: string, name: string) => {
    setValue("place", name, { shouldValidate: true, shouldDirty: true });
    setValue("placeId", id, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <StatusHandler isLoading={isLoading} isError={isError} error={error}>
      <div className='main-inner pr-5 pb-5 flex flex-col gap-4'>
        <SectionTitle title='수령장소 선택' />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className='h-[54px] px-2 flex rounded-[6px] bg-white border border-[#E0E2E4] hover:bg-gray-100'>
              <h4
                className={`pl-1 text-start font-medium truncate text-base ${place ? "text-gray-700" : "text-[#939396]"} flex-1`}
              >
                {place ? place : "수령할 장소를 선택해 주세요."}
              </h4>
              <ChevronDownIcon className='size-4 w-7 h-7' stroke='#424242' strokeWidth={1.5} />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            {baseAreas?.map((info, index) => (
              <div key={info.id}>
                <DropdownMenuItem onClick={() => handleSelect(info.id, info.name)}>
                  <span
                    className={`flex flex-col gap-2 py-1.5 w-full ${placeId === info.id && "bg-accent rounded-[6px]"}`}
                  >
                    <h4
                      className={`text-base ${placeId === info.id ? " font-bold" : "font-semibold"}`}
                    >
                      {info.name}
                    </h4>
                    <p>{info.address}</p>
                  </span>
                </DropdownMenuItem>

                {index !== (baseAreas?.length ?? 0) - 1 && <DropdownMenuSeparator />}
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <input type='hidden' {...register("place", { required: true })} />
        <input type='hidden' {...register("placeId", { required: true })} />
      </div>
    </StatusHandler>
  );
}
