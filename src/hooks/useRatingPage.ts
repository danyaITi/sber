import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ratingApi } from "../api/rating";
import { useTokenFromUrl } from "../utils/token";

export function useRatingPage() {
  const token = useTokenFromUrl();
  const queryClient = useQueryClient();

  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: () => ratingApi.getUser(token!),
    enabled: !!token,
  });

  const ratingQuery = useQuery({
    queryKey: ["rating"],
    queryFn: () => ratingApi.getRating(token!),
    enabled: !!token,
  });

  const detailsQuery = useQuery({
    queryKey: ["details"],
    queryFn: () => ratingApi.getDetails(token!),
    enabled: !!token,
  });

  const isLoading =
    userQuery.isLoading || ratingQuery.isLoading || detailsQuery.isLoading;

  const isError =
    userQuery.isError || ratingQuery.isError || detailsQuery.isError;

  const refetchAll = () => {
    queryClient.invalidateQueries({
      queryKey: ["user"],
    });
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
    user: userQuery.data,
    rating: ratingQuery.data,
    details: detailsQuery.data,
    refetchAll,
  };
}
