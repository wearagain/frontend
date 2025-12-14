import { useMutation } from "@tanstack/react-query";
import { deletePartyApplication } from "@/apis/admin/party/applications/deletePartyApplication.ts";

export const useDeletePartyApplication = (id: string) => {
  return useMutation({
    mutationKey: ["admin", "party", "application", id],
    mutationFn: () => deletePartyApplication(id),
  });
};
