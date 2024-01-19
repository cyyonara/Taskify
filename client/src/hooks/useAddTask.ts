import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { IRequestError } from "@/types/t.requestError";
import { ITask, NewTask } from "@/lib/taskSchema";
import axios from "axios";

const addTask = async (newTask: ITask): Promise<NewTask> => {
  const response = await axios.post<NewTask>("/api/tasks", newTask, {
    withCredentials: true,
  });
  return response.data;
};

export const useAddTask = (): UseMutationResult<NewTask, IRequestError, ITask> => {
  return useMutation<NewTask, IRequestError, ITask>({ mutationFn: addTask });
};
