export interface EnvironmentalMetrics {
  co2Kg: number;
  waterM3: number;
  energyMj: number;
}

export interface PartyImpact {
  partyId: string;
  partyName: string;
  partyType: string;
  partyStartDate: string;
  partyEndDate: string;
  itemCount: number;
  userCount: number;
  metrics: EnvironmentalMetrics;
}

export interface EnvironmentalImpactsResponse {
  userId: string;
  startDate?: string;
  endDate?: string;
  filterType: "ALL" | "HOSTED" | "PARTICIPATED";
  totalItemCount: number;
  totalMetrics: EnvironmentalMetrics;
  partyImpacts: PartyImpact[];
}

export interface EnvironmentalImpactsQuery {
  startDate?: string;
  endDate?: string;
  filterType?: "ALL" | "HOSTED" | "PARTICIPATED";
}
