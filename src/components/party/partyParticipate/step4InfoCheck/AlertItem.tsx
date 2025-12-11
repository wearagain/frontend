import { TriangleAlert, QrCode } from "lucide-react";

interface AlertItemProps {
  icon?: "alert" | "qr";
  message: string;
  className?: string;
}

export default function AlertItem({ icon, message, className }: AlertItemProps) {
  const isQr = icon === "qr";
  const textColor = isQr ? "text-white" : "text-[#939396]";

  return (
    <div className={`flex items-center gap-2 rounded-lg py-2 px-3 w-full ${className || "my-5 bg-[#F4F5F6]"}`}>
      {isQr ? (
        <QrCode size={16} className='text-white' />
      ) : (
        <TriangleAlert size={16} className='text-[#F23F3F]' />
      )}
      <span className={`text-xs font-medium ${textColor}`}>{message}</span>
    </div>
  );
}
