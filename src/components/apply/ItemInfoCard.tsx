import { Camera, X } from "lucide-react";

interface ItemInfo {
  images: string[];
  description: string;
}

interface Props {
  item: {
    itemId: string;
    itemName: string;
    code: string;
  };
  itemInfo: ItemInfo;
  onDelete: (itemId: string) => void;
  onUpdateInfo: (itemId: string, info: Partial<ItemInfo>) => void;
}

export default function ItemInfoCard({ item, itemInfo, onDelete, onUpdateInfo }: Props) {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages = Array.from(files).map((file) => URL.createObjectURL(file));

    const updatedImages = [...itemInfo.images, ...newImages].slice(0, 5);
    onUpdateInfo(item.itemId, { images: updatedImages });

    e.target.value = "";
  };

  const handleRemoveImage = (idxToRemove: number) => {
    const updatedImages = itemInfo.images.filter((_, index) => index != idxToRemove);

    onUpdateInfo(item.itemId, { images: updatedImages });
  };

  return (
    <div className='flex-1 overflow-y-auto px-5 py-5 border border-gray-100 rounded-2xl mb-5'>
      <div className='mb-6'>
        <div className='flex items-center justify-between mb-2'>
          <h3 className='font-bold text-lg'>{item.itemName}</h3>
          <button onClick={() => onDelete(item.itemId)} className='text-gray-500'>
            <X className='w-5 h-5' />
          </button>
        </div>
        <p className='text-sm text-gray-500'>교환 이력 없음</p>
      </div>

      <div className='grid grid-cols-4 gap-3'>
        {itemInfo.images.length < 5 && (
          <label className='aspect-square bg-gray-100 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200'>
            <input
              type='file'
              accept='image/*'
              multiple
              onChange={handleImageUpload}
              className='hidden'
            />
            <Camera className='w-6 h-6 text-gray-500 mb-1' />
          </label>
        )}

        {itemInfo.images.map((image, index) => (
          <div key={index} className='aspect-square relative rounded-lg overflow-hidden'>
            <img src={image} alt={`${index + 1}`} className='w-full h-full object-cover' />
            <button
              onClick={() => handleRemoveImage(index)}
              className='absolute top-1 right-1 w-6 h-6 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70'
            >
              <X className='w-4 h-4 text-white' />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
