import { redirectBanner } from "@/constants/homeConstants.ts";

export default function RedirectHome() {
  const handleClick = (url: string) => {
      window.open(url, "_blank");
  };

  return (
      <div className='px-5 flex gap-3 min-h-[100px] snap-x pr-4 snap-mandatory overflow-x-auto w-full custom-scroll'>
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
