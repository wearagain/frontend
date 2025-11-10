import MagazineCard from "./MagazineCard";

function MagazineCardList() {
  return (
    <div className='p-5'>
      <div className='flex justify-between pb-5'>
        <h2 className='text-lg font-bold'>다시입다연구소 매거진</h2>
        {/*매거진으로 이동하나 현재는 없음 */}
        <p className='text-gray-500 cursor-pointer'>더보기</p>
      </div>
      {/* 여러개인 경우 map */}
      <MagazineCard
        category='21%클럽활동'
        title='어느 지역에나 #교환 #수선 가능한 공간이 있다면'
        date='2025.02.20'
        thumbnailSrc=''
      />
    </div>
  );
}

export default MagazineCardList;
