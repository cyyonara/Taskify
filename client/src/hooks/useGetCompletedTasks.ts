import { NewTask } from "@/lib/taskSchema";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { IRequestError } from "@/types/t.requestError";
import axios from "axios";

const getCompletedTasks = async (): Promise<NewTask[]> => {
  const response = await axios.get<NewTask[]>("/api/tasks/completed", {
    withCredentials: true,
  });
  return response.data;
};

export const useGetCompletedTasks = (): UseQueryResult<NewTask[], IRequestError> => {
  return useQuery<NewTask[], IRequestError>({
    queryKey: ["tasks", "completed"],
    staleTime: 5 * (1000 * 60),
    queryFn: getCompletedTasks,
    refetchOnWindowFocus: false,
  });
};
