import { IRequestError } from "@/types/t.requestError";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { UserCredentials } from "@/types/t.user";
import { SignUpData } from "@/types/t.auth";
import axios from "axios";

const signUp = async (formData: SignUpData): Promise<UserCredentials> => {
  const response = await axios.post<UserCredentials>(
    import.meta.env.VITE_API_DOMAIN + "/api/auth/sign-up",
    formData,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const useSignUp = (): UseMutationResult<
  UserCredentials,
  IRequestError,
  SignUpData
> => {
  return useMutation<UserCredentials, IRequestError, SignUpData>({
    mutationFn: signUp,
  });
};
