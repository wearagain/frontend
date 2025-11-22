import { useEffect, useState } from "react";
import HeaderContainer from "./HeaderContainer";
import { Menu } from "@/assets/icons";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Link, useLocation } from "react-router-dom";
import { mainMenu } from "@/config/navMenu";
import { useMe } from "@/hooks/auth/useMe";
import { useSignout } from "@/hooks/auth/useAuth";
import { ChevronLeft } from "@/assets/icons";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  label?: string;
  showBack?: boolean;
  showLabel?: boolean
}

export default function HeaderBase({ label = "가치입다", showBack = false, showLabel = true }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { data } = useMe();
  const { mutate: signout, isPending } = useSignout();

  const navigate = useNavigate();

  const handleSignout = () => {
    if (isPending) return;
    signout(undefined, {
      onSettled: () => setOpen(false),
    });
  };

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const nickname = data?.nickname ?? null;

  return (
    <HeaderContainer>
        <div className='flex justiby-between gap-2'>
          {showBack && (
            <button onClick={() => navigate(-1)}>
              <ChevronLeft className='w-6 h-6' />
            </button>
          )}

          {showLabel && label && <h2 className='text-start'>{label}</h2>}
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button aria-label='메뉴 열기' className='border-0 bg-transparent'>
              <Menu className='w-6 h-6' />
            </button>
          </SheetTrigger>

          <SheetContent side='right' className='w-64 overflow-y-auto'>
            <SheetHeader>
              <SheetTitle className='text-lg font-semibold'>
                {nickname ? (
                  <span className='text-gray-900'>{nickname}님</span>
                ) : (
                  <Link to='/auth/signin' onClick={() => setOpen(false)}>
                    로그인 하러가기
                  </Link>
                )}
              </SheetTitle>
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
              <div
                className='mt-4 cursor-pointer text-sm text-gray-500 hover:text-gray-800 transition'
                onClick={handleSignout}
              >
                {isPending ? "로그아웃 중..." : "로그아웃"}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
    </HeaderContainer>
  );
}
