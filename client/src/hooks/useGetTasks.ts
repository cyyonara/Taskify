import { NewTask } from "@/lib/taskSchema";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { IRequestError } from "@/types/t.requestError";
import axios from "axios";

const getTasks = async (): Promise<NewTask[]> => {
  const response = await axios.get<NewTask[]>("/api/tasks", { withCredentials: true });
  return response.data;
};

export const useGetTasks = (): UseQueryResult<NewTask[], IRequestError> => {
  return useQuery<NewTask[], IRequestError>({
    queryKey: ["tasks"],
    queryFn: getTasks,
    staleTime: 5 * (1000 * 60),
    refetchOnWindowFocus: false,
  });
};
