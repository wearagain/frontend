import { homeNewsLetters } from "@/utils/home/dummy";
import ListItem from "./ListItem.tsx";

const MAGAZINE_URL = "https://page.stibee.com/archives/69943";

function NewLetterList() {
  return (
    <div className='p-5'>
      <div className='flex justify-between items-center pb-5'>
        <h2>뉴스레터</h2>
        <a href={MAGAZINE_URL} target='_blank' rel='noopener noreferrer'>
          <p className='text-[#939396] cursor-pointer hover:underline'>더보기</p>
        </a>
      </div>
      <div className='border border-[#E0E2E4] rounded-2xl overflow-hidden'>
        {homeNewsLetters.map((magazine, idx) => (
          <ListItem
            key={magazine.title}
            title={magazine.title}
            date={magazine.date}
            isFirst={idx === 0}
            onClick={() =>
              window.open(magazine.link ?? MAGAZINE_URL, "_blank", "noopener,noreferrer")
            }
          />
        ))}
      </div>
    </div>
  );
}

export default NewLetterList;
