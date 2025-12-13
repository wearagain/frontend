import { CalendarCheck, MessagesSquare, ReceiptText, ScanQrCode, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { label: "파티 신청", icon: CalendarCheck, route: "/party", role: "USER" },
  { label: "파티 주최", icon: Users, route: "/host", role: "USER" },
  { label: "QR", icon: ScanQrCode, route: "/qr?type=checkin", role: "USER" },
  { label: "커뮤니티", icon: MessagesSquare, route: "/community/board", role: "USER" },
  { label: "환경영수증", icon: ReceiptText, route: "/impact/receipt", role: "USER" },
  // 관리자 전용 추가
];

interface MenuTabProps {
  userRole: string;
}

function MenuTab({ userRole }: MenuTabProps) {
  const navigate = useNavigate();

  const displayedMenuItems = menuItems.filter(
    (item) => item.role === "USER" || (item.role === "ADMIN" && userRole === "ADMIN")
  );

  return (
    <div className='p-5 flex justify-between'>
      {displayedMenuItems.map((item, index) => (
        <div
          key={index}
          className='flex flex-col items-center space-y-2 cursor-pointer w-full text-center'
          onClick={() => navigate(item.route)}
        >
          <div className='w-11 h-11 flex items-center justify-center hover:bg-(--color-mint-light) hover:rounded-full hover:text-white'>
            <item.icon className='w-7 h-7' />
          </div>
          <p className='text-xs font-semibold text-[#555558]'>{item.label}</p>
        </div>
      ))}
    </div>
  );
}

export default MenuTab;
