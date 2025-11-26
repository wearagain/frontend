import { Outlet } from "react-router-dom";
import { useHeader } from "@/hooks/common/useHeaderRenderer.ts";

export default function RootLayout() {
  const header = useHeader();
  const HeaderComponent = header?.component;

  return (
    <div className='flex flex-col h-screen max-w-[430px] mx-auto'>
      {HeaderComponent && <HeaderComponent {...header.props} />}
      <main className='flex-1 overflow-y-auto pl-5 py-5'>
        <Outlet />
      </main>
    </div>
  );
}
