interface ClothProps {
  label: string;
  like: number;
}

export default function ClothItem({label = "수선의류명", like = 0}: ClothProps) {
  return (
    <div>
      <div className='w-[100px] h-[120px] bg-[#D9D9D9]'></div>
      <p className=''>{label}</p>
      <h3>찜 {like}</h3>
    </div>
  );
}