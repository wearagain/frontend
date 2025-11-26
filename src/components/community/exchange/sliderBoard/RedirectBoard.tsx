import { redirectBanner } from "@/constants/communityConstants.ts";
import { useNavigate } from "react-router-dom";

export default function RedirectBoard() {
  const navigate = useNavigate();

  const handleClick = (url: string) => {
    if (url.startsWith("/")) {
      // 내부 경로 → SPA 내 라우트 이동
      navigate(url);
    } else {
      // 외부 링크 → 새 창
      window.open(url, "_blank");
    }
  };

  return (
    <div className='flex gap-3 min-h-[100px] snap-x pr-4 snap-mandatory overflow-x-auto w-full custom-scroll'>
      {redirectBanner.map((banner, index) => (
        <button
          key={index}
          className='flex-shrink-0 w-[90%] h-fit snap-center'
          onClick={() => handleClick(banner.url)}
        >
          <img
            key={index}
            src={banner.image}
            alt={`Banner ${index + 1}`}
            className='w-full h-full'
          />
        </button>
      ))}
    </div>
  );
}
