import { useState, useEffect } from "react";
import HeaderContainer from "./HeaderContainer";
import { Menu } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Link, useLocation } from "react-router-dom";
import { mainMenu } from "@/config/navMenu";

export default function HeaderBase() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <HeaderContainer>
      <div className='flex justify-between items-center w-full'>
        <h2 className='font-semibold text-lg'>가치입다</h2>

        {/* 단일 Sheet 기반 메뉴 */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button aria-label='메뉴 열기' className='border-0 bg-transparent'>
              <Menu className='w-6 h-6' />
            </button>
          </SheetTrigger>

          <SheetContent side='right' className='w-64'>
            <SheetHeader>
              <SheetTitle className='text-lg font-semibold'>
                <Link to='/signin' onClick={() => setOpen(false)}>
                  로그인 하러가기
                </Link>
              </SheetTitle>
            </SheetHeader>

            <nav className='flex flex-col gap-4 mt-6 ml-4 text-base font-medium'>
              {mainMenu.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className='flex items-center gap-2 hover:text-primary transition-colors'
                >
                  {item.icon && <item.icon className='w-4 h-4' />}
                  {item.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </HeaderContainer>
  );
}
