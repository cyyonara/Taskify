import { IRequestError } from "@/types/t.requestError";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { UserCredentials } from "@/types/t.user";
import { SignUpData } from "@/types/t.auth";
import axios from "axios";

const signUp = async (formData: SignUpData): Promise<UserCredentials> => {
  const response = await axios.post<UserCredentials>(
    "/api/auth/sign-up",
    formData
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
