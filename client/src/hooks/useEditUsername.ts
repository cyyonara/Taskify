import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { UserCredentials } from "@/types/t.user";
import { IRequestError } from "@/types/t.requestError";
import axios from "axios";

const editUsername = async (username: string): Promise<UserCredentials> => {
  const response = await axios.put(
    import.meta.env.VITE_API_DOMAIN + "/api/user/username",
    { username },
    { withCredentials: true }
  );

  return response.data;
};

export const useEditUsername = (): UseMutationResult<
  UserCredentials,
  IRequestError,
  string
> => {
  return useMutation<UserCredentials, IRequestError, string>({
    mutationFn: editUsername,
  });
};
