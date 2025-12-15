import { axiosInstance } from "@/apis/axios-instance.ts";
import type { AdminTotalImpact } from "@/types/pages.ts";

export const getAdminImpactTotal = async (): Promise<AdminTotalImpact> => {
  const { data } = await axiosInstance.get<AdminTotalImpact>(
    `/api/environmental-impacts/admin/total`
  );
  return data;
};


