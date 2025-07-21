import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "./useApiClient";

export const useApiQuery = (key, endpoint, options = {}) => {
  const apiClient = useApiClient();

  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const response = await apiClient.get(endpoint);
      return response.data;
    },
    ...options,
  });
};

export const useApiMutation = (endpoint, method = "POST", options = {}) => {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      // Handle dynamic URLs
      const url = typeof endpoint === "function" ? endpoint(data) : endpoint;
      const response = await apiClient[method.toLowerCase()](url, data);
      return response.data;
    },
    onSuccess: (data, variables, context) => {
      if (options.invalidateQueries) {
        queryClient.invalidateQueries({ queryKey: options.invalidateQueries });
      }
      options.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};
