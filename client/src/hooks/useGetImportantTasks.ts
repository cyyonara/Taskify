import { NewTask } from "@/lib/taskSchema";
import { IRequestError } from "@/types/t.requestError";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";

const getImportantTasks = async (): Promise<NewTask[]> => {
  const response = await axios.get<NewTask[]>(
    import.meta.env.VITE_API_DOMAIN + "/api/tasks/important",
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const useGetImportantTasks = (): UseQueryResult<NewTask[], IRequestError> => {
  return useQuery<NewTask[], IRequestError>({
    queryKey: ["tasks", "important"],
    queryFn: getImportantTasks,
    staleTime: 5 * (1000 * 60),
    refetchOnWindowFocus: false,
  });
};
