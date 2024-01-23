import { IRequestError } from "@/types/t.requestError";
import { UserCredentials } from "@/types/t.user";
import { LoginData } from "@/types/t.auth";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";

const login = async (formData: LoginData): Promise<UserCredentials> => {
  const res = await axios.post(
    import.meta.env.VITE_API_DOMAIN + "/api/auth/login",
    formData
  );
  return res.data;
};

export const useLogin = (): UseMutationResult<
  UserCredentials,
  IRequestError,
  LoginData
> => {
  return useMutation<UserCredentials, IRequestError, LoginData>({ mutationFn: login });
};
