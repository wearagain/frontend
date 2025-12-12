import ClothColList from "@/components/community/exchange/scrollList/ClothColList.tsx";
import type { ClothFilterCategory } from "@/types/community.ts";
import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { FilterHeader } from "@/components/common/FilterHeader.tsx";
import { useGetExchangeList } from "@/hooks/exchange/useGetExchangeList";
import StatusHandler from "@/components/common/StatusHandler.tsx";

const ExchangeListPage = () => {
  const [searchParams] = useSearchParams();
  const isPublicParam = searchParams.get("isPublic");
  const isPublic = isPublicParam === "true" ? true : isPublicParam === "false" ? false : true; // 기본값 true

  const tabs: { label: string; value: ClothFilterCategory }[] = [
    { label: "전체", value: "ALL" },
    { label: "상의", value: "TOP" },
    { label: "하의", value: "BOTTOM" },
    { label: "드레스", value: "DRESS" },
    { label: "기타", value: "ETC" },
  ];

  const [filterType, setFilterType] = useState<ClothFilterCategory | undefined>("ALL");

  // API 쿼리 파라미터 생성
  const apiParams = useMemo(() => {
    const params: { isPublic: boolean; category?: "TOP" | "BOTTOM" | "DRESS" | "ETC" } = {
      isPublic,
    };
    if (filterType && filterType !== "ALL") {
      params.category = filterType;
    }
    return params;
  }, [isPublic, filterType]);

  const { data, isLoading, isError, error } = useGetExchangeList(apiParams);

  return (
    <StatusHandler isLoading={isLoading} isError={isError} error={error}>
      <div className='flex flex-col h-full'>
        <FilterHeader onChange={setFilterType} tabs={tabs} theme='mint' value={filterType} />
        <ClothColList items={data ?? []} />
      </div>
    </StatusHandler>
  );
};

export default ExchangeListPage;
