import { Outlet, useLocation } from "react-router-dom";
import { getHeaderByPath } from "@/config/headerConfig";
import { HeaderBack } from "@/layouts/components/header";

export default function RootLayout() {
  const { pathname } = useLocation();
  const config = getHeaderByPath(pathname);
  const HeaderComponent = config?.component || HeaderBack;
  const headerProps = config?.props ?? {};

  return (
    <div className='flex flex-col min-h-screen max-w-[430px] mx-auto'>
      <HeaderComponent {...headerProps} />
      <main className='flex-1 p-2'>
        <Outlet />
      </main>
    </div>
  );
}
