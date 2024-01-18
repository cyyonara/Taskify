import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { IRequestError } from "@/types/t.requestError";
import axios from "axios";

const logout = async (): Promise<void> => {
  return await axios.delete("/api/auth/logout", { withCredentials: true });
};

export const useLogout = (): UseMutationResult<void, IRequestError, null> => {
  return useMutation<void, IRequestError, null>({ mutationFn: logout });
};
