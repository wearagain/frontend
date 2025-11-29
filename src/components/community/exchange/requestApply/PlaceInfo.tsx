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

interface AddressInfo {
  name: string;
  address: string;
}

const addressInfos: AddressInfo[] = [
  {
    name: "서울숲 언더스탠드에비뉴 공유주방",
    address: "서울 성동구 왕십리 63",
  },
  {
    name: "광명시 청춘곳간 3층",
    address: "경기 광명시 광명로 928번길 42-16",
  },

  {
    name: "광명시 청춘곳간 3층ㅇㄹㅁㄹㅁㄴㄹㅇㄴㄹㅁㄴㅇㄹㅁㄴㄹㅁㄴㄹ",
    address: "경기 광명시 광명로 928번길 42-16",
  },
];
export default function PlaceInfo() {
  const { register, setValue } = useFormContext();
  const place = useWatch({ name: "place" });
  const handleSelect = (label: string) => {
    setValue("place", label, { shouldValidate: true, shouldDirty: true });
  };

  return (
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
          {addressInfos.map((info: AddressInfo, index) => (
            <>
              <DropdownMenuItem
                key={`${info.address}_${index}`}
                onClick={() => handleSelect(info.name)}
              >
                <span
                  className={`flex flex-col gap-2 py-1.5 w-full ${place == info.name && "bg-accent rounded-[6px]"}`}
                >
                  <h4
                    className={`text-base ${place === info.name ? " font-bold" : "font-semibold"}`}
                  >
                    {info.name}
                  </h4>
                  <p>{info.address}</p>
                </span>
              </DropdownMenuItem>

              {index !== addressInfos.length - 1 && <DropdownMenuSeparator />}
            </>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <input type='hidden' {...register("place", { required: true })} />
    </div>
  );
}
