import ScrollHeader from "@/components/community/ScrollLayout/ScrollHeader.tsx";
import ClothItem from "@/components/community/ScrollLayout/ClothItem.tsx";

export default function ClothBoard() {
  return (
    <div>
      <ScrollHeader></ScrollHeader>
      <ClothItem label="수선의류명" like={2}></ClothItem>
    </div>
  )
}