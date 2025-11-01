import { useState } from "react";
import { Camera } from "@/assets/icons";
import { ProfileIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";

interface ProfileImageUploaderProps {
  value?: string | null;
  onChange?: (image: string | null) => void;
  size?: number; // 기본 96px (w-24 h-24)
}

export default function ProfileImageUploader({
  value,
  onChange,
  size = 96,
}: ProfileImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(value || null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = ev.target?.result as string;
        setPreview(result);
        onChange?.(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='relative flex items-center justify-center'>
      {/* 프로필 원형 영역 */}
      <div
        className={cn(
          "flex items-center justify-center rounded-full bg-gray-100 overflow-hidden border border-gray-200",
          "transition-all duration-200"
        )}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          minWidth: `${size}px`,
          minHeight: `${size}px`,
        }}
      >
        {preview ? (
          <img
            src={preview}
            alt='프로필 미리보기'
            className='object-cover w-full h-full rounded-full'
          />
        ) : (
          <ProfileIcon
            className='text-gray-400'
            style={{ width: `${size * 0.7}px`, height: `${size * 0.7}px` }}
          />
        )}
      </div>

      {/* 업로드 버튼 */}
      <label
        htmlFor='profile-upload'
        className='absolute bottom-0 right-0 bg-white border border-gray-300 rounded-full w-7 h-7 flex items-center justify-center shadow cursor-pointer hover:scale-105 transition'
      >
        <Camera className='w-4 h-4 text-gray-600' />
        <input
          id='profile-upload'
          type='file'
          accept='image/*'
          className='hidden'
          onChange={handleImageChange}
        />
      </label>
    </div>
  );
}
