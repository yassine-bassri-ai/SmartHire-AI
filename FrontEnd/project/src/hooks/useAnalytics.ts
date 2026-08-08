import { useQuery } from "@tanstack/react-query";
import { getAnalytics } from "@/api/analyticsApi";

export const analyticsKeys = {
  all: ["analytics"] as const,
};

export function useAnalytics() {

  return useQuery({
    queryKey: analyticsKeys.all,
    queryFn: getAnalytics,
    staleTime: 30_000,
  });

}