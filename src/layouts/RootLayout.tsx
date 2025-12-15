import { Outlet } from "react-router-dom";
import { useHeader } from "@/hooks/common/useHeaderRenderer.ts";
import { useMe } from "@/hooks/auth/useMe.ts";
import { useGetHome } from "@/hooks/pages/useGetHome.ts";
import { useEffect} from "react";
import { queryClient } from "@/lib/queryClient";

export default function RootLayout() {
  const header = useHeader();
  const HeaderComponent = header?.component;


  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["me"] });
    queryClient.invalidateQueries({ queryKey: ["home"] });
  }, []);

  useMe();
  useGetHome();


  return (
    <div className='flex flex-col h-screen max-w-[430px] mx-auto'>
      {HeaderComponent && <HeaderComponent {...header.props} />}
      <main className='flex-1 overflow-y-auto custom-scroll'>
        <Outlet />
      </main>
    </div>
  );
}
