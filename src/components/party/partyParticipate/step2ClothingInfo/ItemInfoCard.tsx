import { Camera, X } from "lucide-react";

interface ItemInfo {
  images: string[];
  description: string;
}

interface ItemInfoProps {
  item: {
    itemId: string;
    itemName: string;
    code: string;
    clothingNumber: string | null;
  };
  itemInfo: ItemInfo;
  onDelete: (itemId: string) => void;
  onUpdateInfo: (itemId: string, info: Partial<ItemInfo>) => void;
}

// 이미지 압축
const compressImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const MAX_WIDTH = 1024;
        let width = image.width;
        let height = image.height;

        if (width > MAX_WIDTH) {
          height = height * (MAX_WIDTH / width);
          width = MAX_WIDTH;
        }

        canvas.width = width;
        canvas.height = height;

        ctx?.drawImage(image, 0, 0, width, height);

        const base64Url = canvas.toDataURL("image/jpeg", 0.8);
        resolve(base64Url);
      };
      image.src = e.target?.result as string;
    };

    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

export default function ItemInfoCard({ item, itemInfo, onDelete, onUpdateInfo }: ItemInfoProps) {
  const renderStatusText = () => {
    if (item.clothingNumber) {
      return (
        <span className='flex items-center gap-1'>
          교환 이력 있음
          <span className='w-0.5 h-0.5 rounded-full bg-[#D9D9D9]' />
          {item.clothingNumber}
        </span>
      );
    }
    return "교환 이력 없음";
  };

  // TODO: 사진 업로드 방식 추후 수정
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const uploadPromises = Array.from(files).map((file) => compressImage(file));

    Promise.all(uploadPromises).then((newImages) => {
      const updatedImages = [...itemInfo.images, ...newImages].slice(0, 5);
      onUpdateInfo(item.itemId, { images: updatedImages });
      e.target.value = "";
    });
  };

  const handleRemoveImage = (idxToRemove: number) => {
    const updatedImages = itemInfo.images.filter((_, index) => index != idxToRemove);

    onUpdateInfo(item.itemId, { images: updatedImages });
  };

  return (
    <div className='flex-1 overflow-y-auto px-5 py-5 border border-[#E0E2E4] rounded-2xl mb-5'>
      <div className='mb-6'>
        <div className='flex items-center justify-between mb-2'>
          <h3 className='font-bold text-lg'>{item.itemName}</h3>
          <button onClick={() => onDelete(item.itemId)} className='text-[#222222]'>
            <X className='w-5 h-5' />
          </button>
        </div>
        <p className='text-sm text-[#555558]'>{renderStatusText()}</p>
      </div>

      <div className='grid grid-cols-4 gap-3'>
        {itemInfo.images.map((image, index) => (
          <div key={index} className='aspect-square relative'>
            <img
              src={image}
              alt={`${index + 1}`}
              className='w-full h-full object-cover rounded-lg overflow-hidden'
            />
            <button
              onClick={() => handleRemoveImage(index)}
              className='absolute -top-1 -right-1 w-4 h-4 bg-[#222222] rounded-full flex items-center justify-center hover:bg-[#222222]'
            >
              <X className='w-4 h-4 text-white' />
            </button>
          </div>
        ))}

        {itemInfo.images.length < 5 && (
          <label className='aspect-square bg-[#F4F5F6] rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-[#E0E2E4]'>
            <input
              type='file'
              accept='image/*'
              multiple
              onChange={handleImageUpload}
              className='hidden'
            />
            <Camera className='w-6 h-6 text-[#222222] mb-1' />
          </label>
        )}
      </div>
    </div>
  );
}
