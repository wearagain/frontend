import { useState, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQueries } from "@tanstack/react-query";
import { QrCodeDisplay } from "@/components/qr-checkin/QrCodeDisplay";
import { PartySelectionSheet } from "@/components/qr-checkin/PartySelectionSheet";
import { HostedPartyCard, type HostedParty } from "@/components/qr-checkin/HostedPartyCard";
import { QrScannerView } from "@/components/qr-checkin/QrScannerView";
import { InspectionView } from "@/components/qr-checkin/InspectionView";
import { Button } from "@/components/ui/button";
import { useGetMyParticipants } from "@/hooks/party/useGetMyParticipants";
import { useGetMyHostedParties } from "@/hooks/party/useGetParty";
import { getPartyDetails } from "@/apis/party/getParty";
import { scanInspection } from "@/apis/inspection/inspection";
import type { MyParticipant } from "@/types/participant";
import type { PartyDetailResponse, PartyDTO } from "@/types/party";
import type { InspectionScanResponse } from "@/types/inspection";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

type TabType = "checkin" | "scan";

// 파티 선택 시트용 데이터 타입
export interface CheckinParty {
  id: string;
  participantId: string;
  title: string;
  date: string;
  location: string;
  qrCode: string;
}

// MyParticipant와 PartyDetail을 결합하여 CheckinParty로 변환
const transformToCheckinParty = (
  participant: MyParticipant,
  partyDetail?: PartyDetailResponse
): CheckinParty => {
  const formattedDate = participant.attendanceDate
    ? format(new Date(participant.attendanceDate), "yyyy년 M월 d일", { locale: ko })
    : "";

  return {
    id: participant.partyId,
    participantId: participant.id,
    title: partyDetail?.title || participant.partyTitle || "파티",
    date: formattedDate,
    location: partyDetail?.address || participant.partyAddress || "",
    qrCode: participant.qrCode,
  };
};

// PartyDTO를 HostedParty로 변환
const transformToHostedParty = (party: PartyDTO): HostedParty => {
  const formattedDate = party.openAt
    ? format(new Date(party.openAt), "yyyy년 M월 d일", { locale: ko })
    : "";

  // 주소에서 구/시 부분만 추출
  const locationParts = party.address?.split(" ") || [];
  const shortLocation = locationParts.slice(0, 2).join(" ");

  return {
    id: party.id,
    title: party.title,
    date: formattedDate,
    location: shortLocation,
  };
};

const QrCheckinPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL 쿼리 파라미터에서 탭 타입 읽기
  const typeParam = searchParams.get("type");
  const activeTab: TabType =
    typeParam === "checkin" ? "checkin" : "scan";

  const [selectedParty, setSelectedParty] = useState<CheckinParty | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // QR 스캔 관련 상태
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [selectedHostedParty, setSelectedHostedParty] = useState<HostedParty | null>(null);

  // 탭 변경 핸들러
  const handleTabChange = (tab: TabType) => {
    setSearchParams({ type: tab });
  };

  // 검수 관련 상태
  const [inspectionData, setInspectionData] = useState<InspectionScanResponse | null>(null);
  const [isInspectionLoading, setIsInspectionLoading] = useState(false);

  // 내가 주최한 파티 목록 가져오기
  const {
    data: hostedPartiesData,
    isLoading: isLoadingHosted,
    isError: isErrorHosted,
    fetchNextPage: fetchNextHostedPage,
    hasNextPage: hasNextHostedPage,
  } = useGetMyHostedParties({ size: 20 });

  // 호스트 파티 데이터 변환
  const hostedParties: HostedParty[] = useMemo(() => {
    if (!hostedPartiesData?.pages) return [];
    return hostedPartiesData.pages.flatMap((page) => page.parties.map(transformToHostedParty));
  }, [hostedPartiesData]);

  const hasHostedParties = hostedParties.length > 0;

  // APPROVED 상태인 참가 정보 가져오기
  const {
    data: participants,
    isLoading: isLoadingParticipants,
    isError: isErrorParticipants,
  } = useGetMyParticipants({
    participantStatus: "APPROVED",
  });

  // 각 파티의 상세 정보 가져오기
  const uniquePartyIds = participants ? [...new Set(participants.map((p) => p.partyId))] : [];

  const partyQueries = useQueries({
    queries: uniquePartyIds.map((partyId) => ({
      queryKey: ["party", partyId],
      queryFn: () => getPartyDetails(partyId),
      enabled: !!partyId,
    })),
  });

  const isLoadingParties = partyQueries.some((q) => q.isLoading);
  const isLoading =
    activeTab === "checkin"
      ? isLoadingParticipants || isLoadingParties
      : activeTab === "scan"
        ? isLoadingHosted
        : false; // ticket 탭은 TicketView에서 자체 로딩 처리
  const isError =
    activeTab === "checkin" ? isErrorParticipants : activeTab === "scan" ? isErrorHosted : false;

  // 파티 상세 정보를 Map으로 변환
  const partyDetailsMap = new Map<string, PartyDetailResponse>();
  partyQueries.forEach((query, index) => {
    if (query.data) {
      partyDetailsMap.set(uniquePartyIds[index], query.data);
    }
  });

  // 참가 데이터를 CheckinParty 형태로 변환 (파티 상세 정보 포함)
  const parties: CheckinParty[] = participants
    ? participants.map((p) => transformToCheckinParty(p, partyDetailsMap.get(p.partyId)))
    : [];

  // 첫 번째 파티를 기본 선택으로 설정
  useEffect(() => {
    if (parties.length > 0 && !selectedParty) {
      setSelectedParty(parties[0]);
    }
  }, [parties, selectedParty]);

  // parties가 업데이트되면 selectedParty도 업데이트 (파티 이름 등 정보 갱신)
  useEffect(() => {
    if (selectedParty && parties.length > 0) {
      const updatedParty = parties.find((p) => p.participantId === selectedParty.participantId);
      if (updatedParty && updatedParty.title !== selectedParty.title) {
        setSelectedParty(updatedParty);
      }
    }
  }, [parties, selectedParty]);

  const hasParties = parties.length > 0;

  const handleSelectParty = (party: CheckinParty) => {
    setSelectedParty(party);
    setIsSheetOpen(false);
  };

  const handleGoToPartyList = () => {
    navigate("/party");
  };

  const handleGoToHost = () => {
    navigate("/host");
  };

  // QR 스캔 관련 핸들러
  const handleOpenScanner = (party: HostedParty) => {
    setSelectedHostedParty(party);
    setIsScannerOpen(true);
  };

  const handleCloseScanner = () => {
    setIsScannerOpen(false);
    setSelectedHostedParty(null);
  };

  const handleSelectHostedParty = (party: HostedParty) => {
    setSelectedHostedParty(party);
  };

  // QR 스캔 성공 핸들러 - 검수 API 호출
  const handleScanSuccess = async (qrCode: string, partyId: string) => {
    console.log("QR 스캔 성공:", { qrCode, partyId });

    setIsInspectionLoading(true);
    try {
      // 검수 API 호출
      const data = await scanInspection(qrCode);
      console.log("검수 데이터:", data);

      // 스캐너 닫고 검수 화면 표시
      setIsScannerOpen(false);
      setInspectionData(data);
    } catch (error) {
      console.error("검수 데이터 조회 실패:", error);
      alert("QR 코드를 인식할 수 없습니다. 다시 시도해주세요.");
    } finally {
      setIsInspectionLoading(false);
    }
  };

  // 검수 완료 핸들러 - QR 스캔 페이지로 이동
  const handleInspectionComplete = () => {
    alert("검수가 완료되었습니다.");
    setInspectionData(null);
    // QR 스캐너 다시 열기
    if (selectedHostedParty) {
      setIsScannerOpen(true);
    }
  };

  // 검수 화면 닫기
  const handleCloseInspection = () => {
    setInspectionData(null);
  };

  // 더보기 로드
  const handleLoadMoreHosted = () => {
    if (hasNextHostedPage) {
      fetchNextHostedPage();
    }
  };

  // 로딩 상태
  if (isLoading || isInspectionLoading) {
    return (
        <div className='fixed inset-y-[64px] h-full right-0 left-0 bg-white flex flex-col max-w-[430px] top-[64px] mx-auto'>
        <div className='flex-1 flex items-center justify-center'>
          <p className='text-gray-400'>
            {isInspectionLoading ? "검수 정보를 불러오는 중..." : "로딩 중..."}
          </p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (isError) {
    return (
        <div className='fixed inset-y-[64px] h-full right-0 left-0 bg-white flex flex-col max-w-[430px] top-[64px] mx-auto'>
        <div className='flex-1 flex flex-col items-center justify-center px-4'>
          <p className='text-gray-400 mb-4'>데이터를 불러오는데 실패했습니다.</p>
          <Button
            theme = 'mint'
            onClick={() => window.location.reload()}
            className='w-full'
          >
            다시 시도
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className='fixed inset-y-[64px] h-full right-0 left-0 bg-white flex flex-col max-w-[430px] top-[64px] mx-auto'>
        {/* 탭 */}
        <div className='sticky top-0 flex justify-between bg-white z-10'>
          <button
            className={`w-1/2 text-center cursor-pointer pb-2 border-b transition-colors ${
              activeTab === "checkin"
                ? "text-[var(--color-mint-dark)] border-b-2 border-[var(--color-mint-dark)]"
                : "border-[#E0E2E4]"
            }`}
            onClick={() => handleTabChange("checkin")}
          >
            QR 체크인
          </button>
          <button
            className={`w-1/2 text-center cursor-pointer pb-2 transition-colors border-b ${
              activeTab === "scan"
                ? "text-[var(--color-purple-dark)] border-b-2 border-[var(--color-purple-dark)]"
                : "border-[#E0E2E4]"
            }`}
            onClick={() => handleTabChange("scan")}
          >
            QR 스캔
          </button>
        </div>

        {/* 컨텐츠 영역 */}
        <div className='flex-1 flex flex-col overflow-y-auto'>
          {activeTab === "checkin" && (
            <>
              {hasParties && selectedParty ? (
                // 파티가 있을 때 - QR 코드 표시
                <div className='flex-col items-center justify-center my-8 px-4'>
                  <QrCodeDisplay
                    qrCode={selectedParty.qrCode}
                    partyTitle={selectedParty.title}
                    onPartySelect={() => setIsSheetOpen(true)}
                  />
                </div>
              ) : (
                // 파티가 없을 때 - 빈 상태
                <div className='flex-1 flex flex-col items-center justify-center px-4'>
                  <p className='text-gray-400 mb-8'>참여 예정 파티가 없습니다.</p>
                  <Button
                    onClick={handleGoToPartyList}
                    className='w-full max-w-sm bg-[var(--color-mint-dark)] hover:bg-[var(--color-mint-light)] text-white py-4 rounded-xl'
                  >
                    파티 참여하기
                  </Button>
                </div>
              )}
            </>
          )}

          {activeTab === "scan" && (
            <>
              {hasHostedParties ? (
                // 주최한 파티가 있을 때 - 파티 카드 리스트
                <div className='flex flex-col gap-4 p-4'>
                  {hostedParties.map((party) => (
                    <HostedPartyCard key={party.id} party={party} onScanClick={handleOpenScanner} />
                  ))}
                  {/* 더보기 버튼 */}
                  {hasNextHostedPage && (
                    <button
                      onClick={handleLoadMoreHosted}
                      className='py-3 text-center text-gray-500 hover:text-gray-700'
                    >
                      더보기
                    </button>
                  )}
                </div>
              ) : (
                // 주최한 파티가 없을 때 - 빈 상태
                <div className='flex-1 flex flex-col items-center justify-center px-4'>
                  <p className='text-gray-400 mb-8'>주최한 파티가 없습니다.</p>
                  <Button
                    onClick={handleGoToHost}
                    className='w-full max-w-sm bg-[var(--color-purple-dark)] hover:bg-[var(--color-purple-light)] text-white py-4 rounded-xl'
                  >
                    파티 주최하기
                  </Button>
                </div>
              )}
            </>
          )}
        </div>

        {/* 파티 선택 바텀시트 (체크인 탭용) */}
        <PartySelectionSheet
          isOpen={isSheetOpen}
          onClose={() => setIsSheetOpen(false)}
          parties={parties}
          selectedPartyId={selectedParty?.participantId || null}
          onSelectParty={handleSelectParty}
          onAddParty={handleGoToPartyList}
        />
      </div>

      {/* QR 스캐너 뷰 (풀스크린) */}
      {isScannerOpen && selectedHostedParty && (
        <QrScannerView
          party={selectedHostedParty}
          parties={hostedParties}
          onClose={handleCloseScanner}
          onSelectParty={handleSelectHostedParty}
          onScanSuccess={handleScanSuccess}
        />
      )}

      {/* 검수 화면 (풀스크린) */}
      {inspectionData && (
        <InspectionView
          data={inspectionData}
          onClose={handleCloseInspection}
          onComplete={handleInspectionComplete}
        />
      )}
    </>
  );
};

export default QrCheckinPage;
