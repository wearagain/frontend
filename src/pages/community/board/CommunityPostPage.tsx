import { useState } from "react";
import { Input } from "@/components/ui/input";
import { fileToBase64 } from "@/utils/fileToBase64";
import type { BoardType, BoardPostRequest } from "@/types/board";
import { usePostBoard } from "@/hooks/board/usePostBoard";
import { BoardTypeSelect } from "@/components/\bcommunity/board/boardPost/BoardTypeSelect";
import { PhotoUploader } from "@/components/\bcommunity/board/boardPost/PhotoUploader";

const CommunityPostPage = () => {
  const [title, setTitle] = useState("");
  const [boardType, setBoardType] = useState<BoardType>("FREE");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const { mutate: postBoard, isPending } = usePostBoard();

  const handleAddImage = async (file: File) => {
    const base64 = await fileToBase64(file);
    setImages((prev) => [...prev, base64]);
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const payload: BoardPostRequest = {
      title,
      content,
      boardType,
      images,
    };

    postBoard(payload, {
      onSuccess: () => {
        alert("게시글이 등록되었습니다.");
        setTitle("");
        setContent("");
        setImages([]);
      },
      onError: () => {
        alert("등록 중 오류가 발생했습니다.");
      },
    });
  };

  const isDisabled = isPending || title.trim() === "" || content.trim() === "";

  return (
    <div className='p-4 max-w-[430px] mx-auto pb-24'>
      <div className='flex items-center justify-between'>
        <Input
          placeholder='제목을 입력해 주세요'
          className='border-none shadow-none text-lg px-0 py-0'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <BoardTypeSelect value={boardType} onChange={setBoardType} />
      </div>

      <div className='border-b my-3' />

      <textarea
        placeholder='내용을 입력해 주세요'
        className='border-none shadow-none resize-none px-0'
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <PhotoUploader images={images} onAdd={handleAddImage} onRemove={handleRemoveImage} />

      <button
        disabled={isDisabled}
        onClick={handleSubmit}
        className='mt-10 w-full py-3 bg-black text-white rounded-xl disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed'
      >
        {isPending ? "등록 중..." : "등록하기"}
      </button>
    </div>
  );
};

export default CommunityPostPage;
