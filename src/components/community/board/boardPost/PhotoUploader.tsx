import { Camera, X } from "lucide-react";

interface Props {
  images: string[];
  onAdd: (file: File) => void;
  onRemove: (index: number) => void;
}

export const PhotoUploader = ({ images, onAdd, onRemove }: Props) => {
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onAdd(file);
  };

  return (
    <div className='flex gap-3 mt-4'>
      <label className='w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center cursor-pointer'>
        <Camera className='w-7 h-7 text-gray-500' />
        <input type='file' accept='image/*' className='hidden' onChange={handleUpload} />
      </label>

      {images.map((img, idx) => (
        <div key={idx} className='relative w-16 h-16 rounded-xl overflow-hidden'>
          <img src={img} className='w-full h-full object-cover' />

          <button
            onClick={() => onRemove(idx)}
            className='absolute top-1 right-1 bg-black/50 rounded-full p-1'
          >
            <X className='w-3 h-3 text-white' />
          </button>
        </div>
      ))}
    </div>
  );
};
