import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ratingApi } from "../api/rating";

export function useRatingPage() {
  const queryClient = useQueryClient();

  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: ratingApi.getUser,
  });

  const ratingQuery = useQuery({
    queryKey: ["rating"],
    queryFn: ratingApi.getRating,
  });

  const detailsQuery = useQuery({
    queryKey: ["details"],
    queryFn: ratingApi.getDetails,
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
