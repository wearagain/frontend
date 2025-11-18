import { useState } from "react";
import { BoardHeader } from "@/components/\bcommunity/board/boardList/BoardHeader";
import { BoardList } from "@/components/\bcommunity/board/boardList/BoardList";
import type { BoardType } from "@/types/board";
import { GotoPostBtn } from "@/components/\bcommunity/board/boardList/GotoPostBtn";

const CommunityBoardPage = () => {
  const [sort, setSort] = useState<"popular" | "latest">("latest");
  const [boardType, setBoardType] = useState<BoardType | undefined>(undefined);
  const [keyword, setKeyword] = useState("");

  return (
    <div className='relative'>
      <BoardHeader
        sort={sort}
        boardType={boardType}
        onChangeSort={setSort}
        onChangeBoardType={setBoardType}
        onSearch={setKeyword}
      />
      <div className='px-3 py-2'>
        <BoardList boardType={boardType} sort={sort} keyword={keyword} />
        <GotoPostBtn />
      </div>
    </div>
  );
};

export default CommunityBoardPage;
