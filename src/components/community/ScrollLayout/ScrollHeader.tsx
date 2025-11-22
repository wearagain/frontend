interface HeaderProps {
    label: String;
}

export default function ScrollHeader({label}:HeaderProps) {
  return (
    <div className='flex justify-between w-full items-center pr-5'>
      <h3>{label}</h3>
      <button
          /* TODO: route page */
          onClick={() => console.log("clicked!")}
          className='text-[#939396] text-base'>더보기</button>
    </div>
  )
}