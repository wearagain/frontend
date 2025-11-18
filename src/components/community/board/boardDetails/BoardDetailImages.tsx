import defaultImg from "@/assets/images/default.png";

interface Props {
  images: string[];
}

export const BoardDetailImages = ({ images }: Props) => {
  if (!images || images.length === 0)
    return (
      <div className='w-full h-60 bg-gray-200 flex items-center justify-center rounded-lg'>img</div>
    );

  return (
    <div className='w-full h-60 rounded-lg overflow-hidden'>
      <img
        src={images[0]}
        alt='board'
        className='w-full h-full object-cover'
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = defaultImg;
        }}
      />
    </div>
  );
};
