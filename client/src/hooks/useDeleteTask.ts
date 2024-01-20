import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { IRequestError } from "@/types/t.requestError";
import axios from "axios";

interface DeleteTaskResponse {
  success: boolean;
  message: "Task deleted successfully";
}

const deleteTask = async (id: string): Promise<DeleteTaskResponse> => {
  const response = await axios.delete<DeleteTaskResponse>(`/api/tasks/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

export const useDeleteTask = (): UseMutationResult<
  DeleteTaskResponse,
  IRequestError,
  string
> => {
  return useMutation<DeleteTaskResponse, IRequestError, string>({
    mutationFn: deleteTask,
  });
};
