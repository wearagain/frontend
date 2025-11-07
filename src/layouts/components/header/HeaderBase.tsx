import { useEffect, useState } from "react";
import HeaderContainer from "./HeaderContainer";
import { Menu } from "@/assets/icons";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
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

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button aria-label='메뉴 열기' className='border-0 bg-transparent'>
              <Menu className='w-6 h-6' />
            </button>
          </SheetTrigger>

          <SheetContent side='right' className='w-64 overflow-y-auto'>
            <SheetHeader>
              <SheetTitle className='text-lg font-semibold'>
                <Link to='/auth/signin' onClick={() => setOpen(false)}>
                  로그인 하러가기
                </Link>
              </SheetTitle>
              <SheetDescription className='text-sm text-muted-foreground'>
                메뉴를 선택하면 이동합니다.
              </SheetDescription>
            </SheetHeader>

            <nav className='flex flex-col gap-6 mt-6 ml-4 text-base font-medium pb-4'>
              {mainMenu.map((category) => (
                <div key={category.label} className='pb-4 border-b border-b-gray-300'>
                  {/* 상위 카테고리 */}
                  {category.path ? (
                    <Link
                      to={category.path}
                      onClick={() => setOpen(false)}
                      className='font-semibold text-lg hover:text-primary'
                    >
                      {category.icon && <category.icon className='inline-block w-5 h-5 mr-2' />}
                      {category.label}
                    </Link>
                  ) : (
                    <div className='font-semibold text-lg'>
                      {category.icon && <category.icon className='inline-block w-5 h-5 mr-2' />}
                      {category.label}
                    </div>
                  )}

                  {/* 하위 메뉴 */}
                  {category.children && (
                    <ul className='ml-4 mt-2 flex flex-col gap-2 text-[15px]'>
                      {category.children.map((child) => (
                        <li key={child.path}>
                          <Link
                            to={child.path}
                            onClick={() => setOpen(false)}
                            className='hover:text-primary transition-colors'
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
              <div className='mt-4 cursor-pointer text-sm text-gray-500'>로그아웃</div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </HeaderContainer>
  );
}
