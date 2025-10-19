import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProfileIcon } from "@/assets/icons";

export default function SignupProfileForm() {
  const [nickName, setNickName] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/signup/complete");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setProfileImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const isNextDisabled = !nickName;

  return (
    <form onSubmit={handleSubmit} className='flex flex-col justify-between h-full'>
      <div className='flex flex-col items-center gap-8 mt-6 text-center'>
        {/* 프로필 이미지 업로드 */}
        <div className='relative'>
          <div className='w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden'>
            {profileImage ? (
              <img
                src={profileImage}
                alt='프로필 미리보기'
                className='w-full h-full object-cover'
              />
            ) : (
              <ProfileIcon className='w-20 h-20 text-gray-400' />
            )}
          </div>

          {/* 이미지 업로드 버튼 */}
          <label
            htmlFor='profile-upload'
            className='absolute bottom-0 right-0 bg-white border-gray-500 rounded-full w-7 h-7 flex items-center justify-center shadow cursor-pointer'
          >
            <Camera className='w-4 h-4 text-gray-500' />
            <input
              id='profile-upload'
              type='file'
              accept='image/*'
              className='hidden'
              onChange={handleImageChange}
            />
          </label>
        </div>

        {/* 닉네임 입력 */}
        <div className='flex flex-col gap-2 w-full text-left'>
          <Label htmlFor='nickName'>닉네임</Label>
          <Input
            id='nickName'
            placeholder='닉네임'
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
          />
        </div>
      </div>

      <div className='mt-auto pt-6'>
        <Button
          type='submit'
          disabled={isNextDisabled}
          className={cn("w-full h-12 text-base font-semibold")}
        >
          완료
        </Button>
      </div>
    </form>
  );
}
