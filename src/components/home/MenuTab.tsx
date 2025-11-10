import { CalendarCheck, MessagesSquare, ReceiptText, ScanQrCode, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { label: "파티 신청", icon: CalendarCheck, route: "/party", role: "USER" },
  { label: "파티 주최", icon: Users, route: "/host", role: "USER" },
  { label: "QR", icon: ScanQrCode, route: "/qr", role: "USER" },
  { label: "커뮤니티", icon: MessagesSquare, route: "/community", role: "USER" },
  { label: "환경영수증", icon: ReceiptText, route: "/impact/receipt", role: "USER" },
  // 관리자 전용 추가
];

interface Props {
  userRole: string;
}

function MenuTab({ userRole }: Props) {
  const navigate = useNavigate();

  const displayedMenuItems = menuItems.filter(
    (item) => item.role === "USER" || (item.role === "ADMIN" && userRole === "ADMIN")
  );

  return (
    <div className='p-5 flex justify-between'>
      {displayedMenuItems.map((item, index) => (
        <div
          key={index}
          className='flex flex-col items-center space-y-2 cursor-pointer w-1/5 text-center'
          onClick={() => navigate(item.route)}
        >
          <div className='w-11 h-11 bg-gray-100 rounded-xl flex items-center justify-center'>
            <item.icon className='text-(--color-mint-light) w-6 h-6' />
          </div>
          <p className='text-xs font-medium'>{item.label}</p>
        </div>
      ))}
    </div>
  );
}

export default MenuTab;
