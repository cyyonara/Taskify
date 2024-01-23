import { uploadImage } from "@/services/firebaseService";
import { IRequestError } from "@/types/t.requestError";
import { UserCredentials } from "@/types/t.user";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";

const changeAvatar = async (imageFile: File): Promise<UserCredentials> => {
  const { isSuccess, url } = await uploadImage(imageFile);
  if (!isSuccess) throw new Error();

  const response = await axios.put<UserCredentials>(
    import.meta.env.VITE_API_DOMAIN + "/api/user/avatar",
    { avatar: url },
    { withCredentials: true }
  );

  return response.data;
};

export const useChangeAvatar = (): UseMutationResult<
  UserCredentials,
  IRequestError,
  File
> => {
  return useMutation<UserCredentials, IRequestError, File>({ mutationFn: changeAvatar });
};
