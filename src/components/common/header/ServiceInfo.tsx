import { Info } from "@/assets/icons";

interface ServiceInfo {
  label?: string;
}

export default function ServiceInfo({ label }: ServiceInfo) {
  return (
    <button className='flex items-center gap-1 px-2 py-1 text-sm border rounded-full text-gray-600 border-gray-300'>
      <Info className='w-4 h-4' />
      {label ? label : "서비스 안내"}
    </button>
  );
}
