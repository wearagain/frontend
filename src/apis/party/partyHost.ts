import type { PartyHostRequest } from "@/types/party";
import { axiosInstance } from "../axios-instance";

export const postPartyHost = async (data: PartyHostRequest) => {
  return await axiosInstance.post("/api/party/applications", data);
};
