import { useGetPartyList } from "@/hooks/party/useGetParty";
import { PartyCard } from "./PartyCard";
import { useEffect, useRef, useState } from "react";
import type { PartyDTO, PartyListResponse, PartyRegion, PartyStatus } from "@/types/party";
import { PartyHeader } from "./PartyHeader";

export const PartyList = () => {
  const [sort, setSort] = useState<"popular" | "latest" | undefined>(undefined);
  const [region, setRegion] = useState<PartyRegion | undefined>(undefined);
  const [status, setStatus] = useState<PartyStatus | undefined>(undefined);

  const queryParams = {
    size: 6,
    availableOnly: true,
    region,
    status,
    sort,
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status: apiStatus,
    error,
  } = useGetPartyList(queryParams);

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  const parties = data?.pages.flatMap((page: PartyListResponse) => page.parties) ?? [];

  if (apiStatus === "error") {
    return <div className='text-red-500'>에러 발생: {error.message}</div>;
  }

  return (
    <div>
      <PartyHeader
        sort={sort}
        region={region}
        status={status}
        onChangeSort={setSort}
        onChangeRegion={setRegion}
        onChangeStatus={setStatus}
      />
      <div className='flex flex-col gap-3'>
        {parties.length > 0 ? (
          parties.map((party: PartyDTO) => <PartyCard key={party.id} party={party} />)
        ) : (
          <div className='text-gray-500 text-center py-6'>파티가 없습니다.</div>
        )}

        <div
          ref={observerRef}
          className='h-8 flex justify-center items-center text-gray-500 text-sm'
        >
          {isFetchingNextPage ? "..." : hasNextPage ? "..." : ""}
        </div>
      </div>
    </div>
  );
};
