import { IRequestError } from "@/types/t.requestError";
import { ITask, NewTask as UpdatedTask } from "@/lib/taskSchema";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";

interface EditedTask extends ITask {
  _id: string;
}

const editTask = async ({ _id, ...rest }: EditedTask): Promise<UpdatedTask> => {
  const response = await axios.put<UpdatedTask>(
    import.meta.env.VITE_API_DOMAIN + `/api/tasks/${_id}`,
    { ...rest },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const useEditTask = (): UseMutationResult<
  UpdatedTask,
  IRequestError,
  EditedTask
> => {
  return useMutation<UpdatedTask, IRequestError, EditedTask>({ mutationFn: editTask });
};
