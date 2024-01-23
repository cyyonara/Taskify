import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { IRequestError } from "@/types/t.requestError";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const logout = async (): Promise<void> => {
  return await axios.delete(import.meta.env.VITE_API_DOMAIN + "/api/auth/logout", {
    withCredentials: true,
  });
};

export const useLogout = (): UseMutationResult<void, IRequestError, null> => {
  const queryClient = useQueryClient();
  return useMutation<void, IRequestError, null>({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
    },
  });
};
