import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ChevronDown, CircleX } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-long";
import { HelpDropdownItem } from "@/components/party/partyHelp/HelpDropdownItem.tsx";
import type { CreateInquiryRequest, inquiryType } from "@/types/help.ts";
import { INQUIRY_TYPE_MAP } from "@/constants/helpConstants.ts";

interface HelpFormProps {
  defaultPartyId?: string;
  defaultPartyTitle?: string;
  onSubmit?: (payload: CreateInquiryRequest) => void;
  isLoading?: boolean;
}

export function HelpForm({ defaultPartyTitle = "", onSubmit, isLoading = false }: HelpFormProps) {
  const [partyTitle, setPartyTitle] = useState(defaultPartyTitle);
  const [category, setCategory] = useState<inquiryType | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setPartyTitle(defaultPartyTitle);
  }, [defaultPartyTitle]);

  const isFilled = useMemo(
    () => Boolean(partyTitle && category && title.trim() && content.trim()),
    [partyTitle, category, title, content]
  );

  const handleSubmit = () => {
    if (!isFilled || !category) return;

    const payload = {
      inquiryType: category,
      title: title.trim(),
      content: content.trim(),
    };

    if (onSubmit) {
      onSubmit(payload);
    } else {
      console.log("문의 제출", payload);
    }
  };

  const handleCategorySelect = (selectedCategory: inquiryType) => {
    setCategory(selectedCategory);
    setIsDropdownOpen(false);
  };

  const categoryOptions = Object.entries(INQUIRY_TYPE_MAP) as [inquiryType, string][];

  return (
    <>
      <main className='flex-1 overflow-y-auto custom-scroll mb-5'>
        <div className='h-full shrink-0 px-5 pt-5 pb-16 space-y-5'>
          {/* 파티 */}
          <div className='flex flex-col gap-2'>
            <Label htmlFor='partyName'>파티</Label>
            <Input
              id='partyName'
              placeholder='파티'
              value={partyTitle}
              onChange={(e) => setPartyTitle(e.target.value)}
              disabled={Boolean(defaultPartyTitle)}
              allowClear={false}
            />
          </div>

          {/* 카테고리 */}
          <div className='flex flex-col gap-2'>
            <Label htmlFor='category'>카테고리</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  theme='normalOutlined'
                  id='category'
                  className='w-full justify-between rounded-lg border border-[#E4E4E4] bg-white px-4 py-4 text-base font-medium'
                  onClick={() => {
                    setIsDropdownOpen(true);
                  }}
                >
                  <span className={category ? "text-[#222222]" : "text-[#939396]"}>
                    {category ? INQUIRY_TYPE_MAP[category] : "카테고리"}
                  </span>
                  <ChevronDown size={20} className='text-[#939396]' />
                </Button>
              </DropdownMenuTrigger>
              {isDropdownOpen && (
                <DropdownMenuContent className='dropdown-menu'>
                  {categoryOptions.map(([key, label], idx) => (
                    <HelpDropdownItem
                      key={key}
                      category={key}
                      label={label}
                      onSelect={handleCategorySelect}
                      isSelected={category === key}
                      isLast={idx == categoryOptions.length - 1}
                    />
                  ))}
                </DropdownMenuContent>
              )}
            </DropdownMenu>
          </div>

          {/* 제목 */}
          <div className='flex flex-col gap-2'>
            <Label htmlFor='title'>제목</Label>
            <Input
              id='title'
              placeholder='제목'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* 문의 내용 */}
          <div className='flex flex-col gap-2'>
            <Label htmlFor='content'>문의 내용</Label>
            <div className='relative w-full mb-14'>
              <textarea
                id='content'
                className='w-full rounded-lg border border-[#E4E4E4] focus-visible:border-[#222222] bg-white px-4 py-4 pr-10 text-base font-medium outline-none resize-none h-32'
                placeholder='문의 내용'
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              {content && (
                <button
                  type='button'
                  aria-label='문의 내용 삭제'
                  onClick={() => setContent("")}
                  className='absolute right-4 top-4 text-white'
                >
                  <CircleX size={18} fill='#939396' />
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      <div className='shrink-0 sticky bottom-0 bg-white px-5 pt-4 pb-8'>
        <Button
          theme='purple'
          disabled={!isFilled || isLoading}
          onClick={handleSubmit}
          className='w-full'
        >
          {isLoading ? "전송 중..." : "문의하기"}
        </Button>
      </div>
    </>
  );
}
