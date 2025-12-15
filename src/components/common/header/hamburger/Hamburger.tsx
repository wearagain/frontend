import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet.tsx";
import { Menu } from "@/assets/icons";
import { Link } from "react-router-dom";
import { userMenu, adminMenu } from "@/config/navMenu.ts";
import { useSignout } from "@/hooks/auth/useAuth.ts";
import HeaderActions from "@/components/common/header/hamburger/HeaderActions.tsx";
import UserProfile from "@/components/common/header/hamburger/UserProfile.tsx";
import MenuItem from "@/components/common/header/hamburger/MenuItem.tsx";
import MenuTab from "@/components/home/MenuTab.tsx";
import DailyClothingGraph from "@/components/common/header/hamburger/DailyClothingGraph.tsx";
import { useUserStore } from "@/store/useUserStore.ts";

interface HamburgerProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function Hamburger({ open, setOpen }: HamburgerProps) {
  const { mutate: signout, isPending } = useSignout();
  const {
    isAdmin,
    isLoggedIn,
    user
  } = useUserStore();
  console.log(isLoggedIn, user)

  const handleClose = () => setOpen(false);
  const handleSignout = () => {
    if (isPending) return;
    signout();
    setOpen(false);
  };


  const currentMenu = isAdmin ? adminMenu : userMenu;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button aria-label="메뉴 열기" className="border-0 bg-transparent">
          <Menu className="w-6 h-6 text-[#222222]" />
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="overflow-y-auto custom-scroll bottombar-p">
        <SheetHeader className="sticky top-0 bg-white z-10 px-5 pt-3 pb-4">
          <HeaderActions onClose={handleClose} isAdmin={isAdmin} isLoggedIn={isLoggedIn} />
          <SheetTitle>
            {/* 헤더 */}
            {isLoggedIn
              ? (<UserProfile />)
              : (
              <Link to="/auth/signin" onClick={() => setOpen(false)}>
                로그인 하러가기
              </Link>
            )}
          </SheetTitle>
          <SheetDescription />
        </SheetHeader>
        {isAdmin && (
          <>
            <div className="divider-compact" />
            <MenuTab />
            <div className="divider-compact" />
            <DailyClothingGraph />
            <div className="divider-compact" />
          </>
        )}
        {/* 메뉴 */}
        <nav className="flex flex-col gap-4 mt-5 px-5 text-[#222222] font-medium">
          {currentMenu.map((item, index) => (
            <div key={`${item.label}-${index}`}>
              <MenuItem item={item} onClose={handleClose} />
              {item.divider && (
                <div className="border-b border-gray-200 mt-5 mb-1" />
              )}
            </div>
          ))}

          {/* 로그아웃 */}
          {isLoggedIn && (
            <div className="mt-11 underline cursor-pointer text-sm text-[#939396] hover:text-gray-800 transition"
                 onClick={handleSignout}
            >
              {isPending ? "로그아웃 중..." : "로그아웃"}
            </div>)}
        </nav>
      </SheetContent>
    </Sheet>
  );
}