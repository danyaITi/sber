import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useApi } from "../context/apiContext";

export function usePrivelegesPage() {
  const { apiClient, token } = useApi();
  const queryClient = useQueryClient();

  const benefitsQuery = useQuery({
    queryKey: ["benefits"],
    queryFn: () => apiClient?.getBenefits(),
    enabled: !!token,
  });

  const ratingQuery = useQuery({
    queryKey: ["rating"],
    queryFn: () => apiClient?.getRating(),
    enabled: !!token,
  });

  const isLoading = benefitsQuery.isLoading || ratingQuery.isLoading;

  const isError = benefitsQuery.isError || ratingQuery.isError || !token;

  const refetchAll = () => {
    queryClient.invalidateQueries({
      queryKey: ["benefits"],
    });
    queryClient.invalidateQueries({
      queryKey: ["rating"],
    });
  };

  return {
    isLoading,
    isError,
    benefits: benefitsQuery.data?.data,
    rating: ratingQuery.data?.data,
    refetchAll,
  };
}
