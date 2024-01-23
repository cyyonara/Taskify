import { useEffect } from "react";
import { useGetTasks } from "@/hooks/useGetTasks";
import NoTasks from "@/components/NoTasks";
import TaskCard from "@/components/TaskCard";
import TaskSkeletons from "@/components/TaskSkeletons";
import ErrorTasks from "@/components/ErrorTasks";
import { useAuth } from "@/state/useAuth";

const AllTasks: React.FC = () => {
  const { data: tasks, isLoading, isError, refetch, error } = useGetTasks();
  const clearCredentials = useAuth((state) => state.clearCredentials);

  useEffect(() => {
    if ((isError && error?.response?.status) === 401) {
      clearCredentials();
    }
  }, [isError]);

  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  if (isLoading) {
    return <TaskSkeletons />;
  }
  if (isError) {
    return <ErrorTasks pageReload={() => refetch()} />;
  }

  if (!tasks?.length) {
    return <NoTasks message="You don't have any task at the moment" />;
  }

  return (
    <main className="mt-8 pb-10 md:pb-0 items-start flex flex-col md:flex-row md:flex-wrap gap-6 overflow-y-auto md:max-h-[calc(100vh-160px)] custom-scroll rounded-lg">
      {tasks?.map(({ date, taskName, ...rest }) => (
        <TaskCard key={taskName} taskName={taskName} date={new Date(date)} {...rest} />
      ))}
    </main>
  );
};

export default AllTasks;
