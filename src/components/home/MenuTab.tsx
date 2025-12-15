import { CalendarCheck, MessagesSquare, ReceiptText, ScanQrCode, Users, MessageSquareText, ChartLine } from "lucide-react";
import { useNavigate } from "react-router-dom";

const menuItems = [
    // 사용자
  { label: "파티 신청", icon: CalendarCheck, route: "/party", role: "USER" },
  { label: "파티 주최", icon: Users, route: "/host", role: "USER" },
  { label: "QR", icon: ScanQrCode, route: "/qr?type=checkin", role: "USER" },
  { label: "커뮤니티", icon: MessagesSquare, route: "/community/board", role: "USER" },
  { label: "환경영수증", icon: ReceiptText, route: "/impact/receipt", role: "USER" },
  // 관리자
  {label: "문의", icon: MessageSquareText, route: "/admin", role: "ADMIN"},
  {label: "파티", icon: Users, route: "/admin/party/manage", role: "ADMIN"},
  {label: "QR", icon: ScanQrCode, route: "/qr?type=scan", role: "ADMIN"},
  {label: "통계", icon: ChartLine, route: "/admin", role: "ADMIN"},
];

interface MenuTabProps {
  userRole: string;
}

function MenuTab({ userRole }: MenuTabProps) {
  const isAdmin = userRole === "ADMIN";
  const navigate = useNavigate();

  const displayedMenuItems = menuItems.filter(
      (item) => item.role === userRole
  );

  return (
    <div className={`p-5 grid gap-2 ${isAdmin ? "grid-cols-4" : "grid-cols-5"}`}>
      {displayedMenuItems.map((item, index) => (
        <div
          key={index}
          className='flex flex-col items-center space-y-2 cursor-pointer w-full text-center'
          onClick={() => navigate(item.route)}
        >
          <div className={`w-11 h-11 flex items-center justify-center hover:rounded-full hover:text-white ${ isAdmin ? "hover:bg-(--color-purple-light)" : "hover:bg-(--color-mint-light)"}`}>
            <item.icon className='w-7 h-7' />
          </div>
          <p className='text-xs font-semibold text-[#555558]'>{item.label}</p>
        </div>
      ))}
    </div>
  );
}

export default MenuTab;
