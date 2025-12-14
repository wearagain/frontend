import { useState, useMemo } from "react";

interface DataPoint {
  label: string;
  value: number;
}
import { FilterHeader } from "@/components/common/FilterHeader";
import SectionTitle from "@/components/community/exchange/requestApply/SectionTitle";
import { SummaryCard } from "@/components/impact/SummaryCard";
import { EnvironmentalMetrics } from "@/components/impact/EnvironmentalMetrics";
import { StatisticsChart } from "@/components/impact/StatisticsChart";
import { PeriodSelector } from "@/components/impact/PeriodSelector";
import { ChevronDownIcon, SearchIcon } from "@/assets/icons";
import { Download, Calendar } from "lucide-react";
import { useMe } from "@/hooks/auth/useMe";
import { exportToCSV } from "@/utils/csvExport";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import type { DateRange } from "react-day-picker";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-long";
import { useGetEnvironmentalImpacts } from "@/hooks/impact/useGetEnvironmentalImpacts";
import StatusHandler from "@/components/common/StatusHandler";

type TabType = "period" | "party";
type PartyFilterType = "all" | "hosted" | "participated";

const ImpactReceiptPage = () => {
  const [activeTab, setActiveTab] = useState<TabType>("period");
  const [selectedParty, setSelectedParty] = useState<string>("전체");
  const [partyFilter, setPartyFilter] = useState<PartyFilterType>("all");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [showPeriodSelector, setShowPeriodSelector] = useState(false);
  const { data: meData } = useMe();

  // API 쿼리 파라미터 준비
  const queryParams = useMemo(() => {
    const params: {
      startDate?: string;
      endDate?: string;
      filterType?: "ALL" | "HOSTED" | "PARTICIPATED";
    } = {};

    // 날짜 범위 설정
    if (dateRange?.from) {
      params.startDate = dateRange.from.toISOString();
    }
    if (dateRange?.to) {
      params.endDate = dateRange.to.toISOString();
    }

    // 필터 타입 설정 (파티별 탭일 때만)
    if (activeTab === "party") {
      const filterMap: Record<PartyFilterType, "ALL" | "HOSTED" | "PARTICIPATED"> = {
        all: "ALL",
        hosted: "HOSTED",
        participated: "PARTICIPATED",
      };
      params.filterType = filterMap[partyFilter];
    }

    return params;
  }, [dateRange, activeTab, partyFilter]);

  // API 호출
  const { data, isLoading, isError, error } = useGetEnvironmentalImpacts(queryParams);

  // API 데이터 매핑
  const summaryData = useMemo(() => {
    if (!data) return null;

    // 기간별 탭: 전체 데이터 사용
    if (activeTab === "period") {
      // 주최 파티와 참여 파티 구분
      const hostedCount = data.partyImpacts.filter((p) => p.partyType === "HOSTED").length;
      const participatedCount = data.partyImpacts.filter(
        (p) => p.partyType === "PARTICIPATED"
      ).length;

      return {
        hostedParties: hostedCount,
        participatedParties: participatedCount,
        clothesCount: data.totalItemCount,
        exchangedClothesCount: data.totalItemCount, // API 응답에 교환수 필드가 없어서 itemCount 사용
      };
    } else {
      // 파티별 탭: 선택된 필터에 따라 필터링된 파티들의 집계
      let filteredParties = data.partyImpacts;

      // 필터 적용
      if (partyFilter === "hosted") {
        filteredParties = data.partyImpacts.filter((p) => p.partyType === "HOSTED");
      } else if (partyFilter === "participated") {
        filteredParties = data.partyImpacts.filter((p) => p.partyType === "PARTICIPATED");
      }

      if (filteredParties.length > 0) {
        // 필터링된 파티들의 합계
        const totalParticipants = filteredParties.reduce((sum, p) => sum + p.userCount, 0);
        const totalClothes = filteredParties.reduce((sum, p) => sum + p.itemCount, 0);

        return {
          parties: filteredParties.length,
          participants: totalParticipants,
          clothesCount: totalClothes,
          exchangedClothesCount: totalClothes, // API 응답에 교환수 필드가 없어서 itemCount 사용
        };
      }
      return {
        parties: 0,
        participants: 0,
        clothesCount: 0,
        exchangedClothesCount: 0,
      };
    }
  }, [data, activeTab, partyFilter]);

  const environmentalData = useMemo(() => {
    if (!data) return null;

    // MJ를 kWh로 변환 (1 MJ = 0.277778 kWh)
    const energyKWh = data.totalMetrics.energyMj * 0.277778;
    // m3를 L로 변환 (1 m3 = 1000 L)
    const waterL = data.totalMetrics.waterM3 * 1000;

    return {
      carbonReduced: data.totalMetrics.co2Kg,
      energySaved: Number(energyKWh.toFixed(2)),
      waterSaved: Math.round(waterL),
    };
  }, [data]);

  // 통계 데이터 (partyImpacts를 사용)
  const statisticsData = useMemo(() => {
    if (!data || data.partyImpacts.length === 0) {
      return {
        period: 0,
        dataPoints: [],
        metricDataMap: {},
      };
    }

    // 파티별 탭일 때 필터 적용
    let filteredParties = data.partyImpacts;
    if (activeTab === "party") {
      if (partyFilter === "hosted") {
        filteredParties = data.partyImpacts.filter((p) => p.partyType === "HOSTED");
      } else if (partyFilter === "participated") {
        filteredParties = data.partyImpacts.filter((p) => p.partyType === "PARTICIPATED");
      }
    }

    if (filteredParties.length === 0) {
      return {
        period: 0,
        dataPoints: [],
        metricDataMap: {},
      };
    }

    // 파티별 데이터를 날짜순으로 정렬
    const sortedParties = [...filteredParties].sort(
      (a, b) => new Date(a.partyStartDate).getTime() - new Date(b.partyStartDate).getTime()
    );

    // 진행기간 계산 (첫 파티 시작일부터 마지막 파티 종료일까지)
    const firstParty = sortedParties[0];
    const lastParty = sortedParties[sortedParties.length - 1];
    const startDate = new Date(firstParty.partyStartDate);
    const endDate = new Date(lastParty.partyEndDate);
    const period = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

    // 기간별 탭: 날짜 형식 라벨 (MM.dd)
    // 파티별 탭: 참여파티1, 참여파티2 형식
    const baseLabels =
      activeTab === "period"
        ? sortedParties.map((party) => {
            const partyDate = new Date(party.partyStartDate);
            return format(partyDate, "MM.dd", { locale: ko });
          })
        : sortedParties.map((_, index) => `참여파티${index + 1}`);

    // 메트릭별 데이터 포인트 생성 (누적값)
    let hostedCount = 0;
    let participatedCount = 0;
    let clothesCount = 0;
    let exchangedClothesCount = 0;
    let participantsCount = 0;

    const metricDataMap: Record<string, DataPoint[]> = {
      hostedParties: sortedParties.map((party, index) => {
        if (party.partyType === "HOSTED") hostedCount++;
        return {
          label: baseLabels[index],
          value: hostedCount,
        };
      }),
      participatedParties: sortedParties.map((party, index) => {
        if (party.partyType === "PARTICIPATED") participatedCount++;
        return {
          label: baseLabels[index],
          value: participatedCount,
        };
      }),
      clothes: sortedParties.map((party, index) => {
        clothesCount += party.itemCount;
        return {
          label: baseLabels[index],
          value: clothesCount,
        };
      }),
      exchangedClothes: sortedParties.map((party, index) => {
        exchangedClothesCount += party.itemCount; // API에 교환수 필드가 없어서 itemCount 사용
        return {
          label: baseLabels[index],
          value: exchangedClothesCount,
        };
      }),
      participants: sortedParties.map((party, index) => {
        participantsCount += party.userCount;
        return {
          label: baseLabels[index],
          value: participantsCount,
        };
      }),
    };

    // 기본 데이터 포인트 (기간별: 주최 파티수, 파티별: 의류교환수)
    const defaultDataPoints =
      activeTab === "period"
        ? metricDataMap.hostedParties || []
        : metricDataMap.exchangedClothes || [];

    return {
      period: period || 0,
      dataPoints: defaultDataPoints,
      metricDataMap,
    };
  }, [data, activeTab, partyFilter]);

  const formatDateRange = (range: DateRange | undefined): string => {
    if (!range?.from) return "전체";
    if (range.from && range.to) {
      return `${format(range.from, "yyyy.MM.dd", { locale: ko })} - ${format(range.to, "yyyy.MM.dd", { locale: ko })}`;
    }
    return format(range.from, "yyyy.MM.dd", { locale: ko });
  };

  const handleDownload = () => {
    if (!data || !summaryData || !environmentalData) return;

    // CSV 데이터 준비
    const csvData = [];

    // 요약 데이터
    if (activeTab === "period") {
      csvData.push(
        {
          구분: "주최 파티수",
          값: summaryData.hostedParties,
        },
        {
          구분: "참여 파티수",
          값: summaryData.participatedParties,
        },
        {
          구분: "의류수",
          값: summaryData.clothesCount,
        },
        {
          구분: "의류교환수",
          값: summaryData.exchangedClothesCount,
        }
      );
    } else {
      csvData.push(
        {
          구분: "파티수",
          값: summaryData.parties || 0,
        },
        {
          구분: "파티 참가자수",
          값: summaryData.participants || 0,
        },
        {
          구분: "의류수",
          값: summaryData.clothesCount || 0,
        },
        {
          구분: "의류교환수",
          값: summaryData.exchangedClothesCount || 0,
        }
      );
    }

    // 환경영수증 데이터
    csvData.push(
      { 구분: "감소 탄소량", 값: `${environmentalData.carbonReduced}kg` },
      { 구분: "아낀 에너지", 값: `${environmentalData.energySaved}kWh` },
      { 구분: "아낀 물", 값: `${environmentalData.waterSaved}L` }
    );

    // 통계 데이터
    statisticsData.dataPoints.forEach((point) => {
      csvData.push({
        구분: `통계 - ${point.label}`,
        값: point.value,
      });
    });

    // 파일명 생성
    const dateStr = format(new Date(), "yyyyMMdd", { locale: ko });
    const filename = `환경영수증_${dateStr}.csv`;

    // CSV 다운로드
    exportToCSV(csvData, filename, ["구분", "값"]);
  };

  const handlePartyFilterSelect = (filter: PartyFilterType) => {
    setPartyFilter(filter);
    const filterLabels = {
      all: "전체",
      hosted: "주최 파티",
      participated: "참여 파티",
    };
    setSelectedParty(filterLabels[filter]);
  };

  return (
    <StatusHandler isLoading={isLoading} isError={isError} error={error}>
      <div className='flex flex-col h-full bottombar-p'>
        {/* 사용자 인사말 */}
        <div className='main-inner py-4'>
          <p className='text-lg font-semibold'>{meData?.nickname || "사용자"} 님은 지금까지</p>
          <p className='text-lg font-semibold'>환경 UX라이팅</p>
        </div>

        {/* 탭 네비게이션 */}
        <div className='flex border-b border-[#E0E2E4]'>
          <button
            className={`flex-1 py-3 text-center font-medium transition-colors ${
              activeTab === "period"
                ? "text-[var(--color-mint-dark)] border-b-2 border-[var(--color-mint-dark)]"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("period")}
          >
            기간별
          </button>
          <button
            className={`flex-1 py-3 text-center font-medium transition-colors ${
              activeTab === "party"
                ? "text-[var(--color-mint-dark)] border-b-2 border-[var(--color-mint-dark)]"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("party")}
          >
            파티별
          </button>
        </div>

        {/* 필터 및 다운로드 영역 */}
        <div className='main-inner py-3 flex items-center justify-between'>
          {activeTab === "period" ? (
            <>
              <button
                onClick={() => setShowPeriodSelector(true)}
                className='flex items-center gap-2 text-base font-medium'
              >
                <span>{formatDateRange(dateRange)}</span>
                <Calendar size={18} className='text-gray-600' />
              </button>
              <button onClick={handleDownload} className='p-2' disabled={!data}>
                <Download size={20} className='text-gray-600' />
              </button>
            </>
          ) : (
            <>
              <div className='flex items-center gap-2'>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className='flex items-center gap-1 text-base font-medium'>
                      {selectedParty}
                      <ChevronDownIcon size={18} className='text-gray-600' />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handlePartyFilterSelect("all")}>
                      전체
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handlePartyFilterSelect("hosted")}>
                      주최 파티
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handlePartyFilterSelect("participated")}>
                      참여 파티
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <button className='p-2'>
                  <SearchIcon size={18} className='text-gray-600' />
                </button>
              </div>
              <button onClick={handleDownload} className='p-2' disabled={!data}>
                <Download size={20} className='text-gray-600' />
              </button>
            </>
          )}
        </div>

        {/* 요약 카드 */}
        {summaryData && (
          <div className='main-inner pb-4'>
            <SummaryCard
              title='요약'
              data={
                activeTab === "period"
                  ? {
                      hostedParties: summaryData.hostedParties,
                      participatedParties: summaryData.participatedParties,
                      clothesCount: summaryData.clothesCount,
                      exchangedClothesCount: summaryData.exchangedClothesCount,
                    }
                  : {
                      parties: summaryData.parties || 0,
                      participants: summaryData.participants || 0,
                      clothesCount: summaryData.clothesCount || 0,
                      exchangedClothesCount: summaryData.exchangedClothesCount || 0,
                    }
              }
              showUpdateAt
            />
          </div>
        )}

        <div className='divider' />

        {/* 환경영수증 섹션 */}
        {environmentalData && (
          <div className='main-inner py-4'>
            <SectionTitle title='환경영수증' />
            <div className='mt-4'>
              <EnvironmentalMetrics
                carbonReduced={environmentalData.carbonReduced}
                energySaved={environmentalData.energySaved}
                waterSaved={environmentalData.waterSaved}
              />
            </div>
          </div>
        )}

        <div className='divider' />

        {/* 통계 섹션 */}
        <div className='main-inner py-4'>
          <div className='flex items-center justify-between mb-4'>
            <SectionTitle title='통계' />
            <span className='text-sm text-gray-500'>updateAt 기준</span>
          </div>
          {statisticsData.dataPoints.length > 0 ? (
            <StatisticsChart
              period={statisticsData.period}
              dataPoints={statisticsData.dataPoints}
              activeMetric={activeTab === "period" ? "hostedParties" : "exchangedClothes"}
              metrics={
                activeTab === "period"
                  ? ["hostedParties", "participatedParties", "clothes", "exchangedClothes"]
                  : ["participants", "clothes", "exchangedClothes"]
              }
              metricDataMap={statisticsData.metricDataMap}
              showPeriod={activeTab === "period"}
            />
          ) : (
            <div className='flex items-center justify-center py-12 text-gray-500'>
              <p>표시할 통계 데이터가 없습니다.</p>
            </div>
          )}
        </div>

        {/* 기간 선택 모달 */}
        {showPeriodSelector && (
          <PeriodSelector
            selectedRange={dateRange}
            onSelect={setDateRange}
            onClose={() => setShowPeriodSelector(false)}
          />
        )}
      </div>
    </StatusHandler>
  );
};

export default ImpactReceiptPage;
