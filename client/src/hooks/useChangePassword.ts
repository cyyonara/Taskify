import { IRequestError } from "@/types/t.requestError";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";

interface IPasswords {
  newPassword: string;
  currentPassword: string;
}

interface ChangePasswordResponse {
  message: string;
  success: boolean;
}

const changePassword = async (passwords: IPasswords): Promise<ChangePasswordResponse> => {
  const response = await axios.put<ChangePasswordResponse>(
    "/api/user/password",
    passwords,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

export const useChangePassword = (): UseMutationResult<
  ChangePasswordResponse,
  IRequestError,
  IPasswords
> => {
  return useMutation({ mutationFn: changePassword });
};
