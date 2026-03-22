import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useApi } from "../context/apiContext";

export function useRatingPage() {
  const { apiClient, token } = useApi();
  const queryClient = useQueryClient();

  const ratingQuery = useQuery({
    queryKey: ["rating"],
    queryFn: () => apiClient?.getRating(),
    enabled: !!token,
  });

  const detailsQuery = useQuery({
    queryKey: ["details"],
    queryFn: () => apiClient?.getDetails(),
    enabled: !!token,
  });

  const isLoading = ratingQuery.isLoading || detailsQuery.isLoading;

  const isError = ratingQuery.isError || detailsQuery.isError || !token;

  const refetchAll = () => {
    queryClient.invalidateQueries({
      queryKey: ["rating"],
    });
    queryClient.invalidateQueries({
      queryKey: ["details"],
    });
  };

  return {
    isLoading,
    isError,
    rating: ratingQuery.data?.data,
    details: detailsQuery.data?.data,
    refetchAll,
  };
}
