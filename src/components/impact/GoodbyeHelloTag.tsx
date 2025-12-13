interface GoodbyeHelloTagProps {
  message: string;
  footer?: string;
  className?: string;
}

const GoodbyeHelloTag = ({ message, footer, className }: GoodbyeHelloTagProps) => {
  return (
    <div className={`relative ${className || ""}`}>
      {/* 태그 카드 */}
      <div className='relative bg-[#FAF9F6] rounded-[10px] p-6 shadow-lg max-w-[280px] min-h-[400px] flex flex-col'>
        {/* 그로밋 (태그 구멍) */}
        <div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[var(--color-mint-dark)] border-4 border-white z-10' />

        {/* 메시지 */}
        <div className='mt-6 flex-1'>
          <p className='text-sm leading-relaxed text-gray-800 whitespace-pre-wrap'>{message}</p>
        </div>

        {/* 푸터 메시지 (있는 경우) */}
        {footer && (
          <div className='mt-4 pt-4 border-t border-gray-300'>
            <p className='text-xs leading-relaxed text-gray-600 whitespace-pre-wrap'>{footer}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoodbyeHelloTag;

