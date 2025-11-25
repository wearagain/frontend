import { redirectBanner } from "@/constants/communityConstants.ts";

export default function RedirectBoard() {
  return (
    <div className='flex gap-3 min-h-[100px] snap-x pr-4 snap-mandatory overflow-x-auto w-full custom-scroll'>
      {redirectBanner.map((image, index) => (
        <div className='flex-shrink-0 w-[90%] snap-center'>
          <img key={index} src={image} alt={`Banner ${index + 1}`} className='w-full' />
        </div>
      ))}
    </div>
  );
}
