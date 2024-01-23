import TaskCard from "@/components/TaskCard";
import NoTasks from "@/components/NoTasks";
import TaskSkeletons from "@/components/TaskSkeletons";
import ErrorTasks from "@/components/ErrorTasks";
import { useEffect } from "react";
import { useGetCompletedTasks } from "@/hooks/useGetCompletedTasks";
import { useAuth } from "@/state/useAuth";

const CompletedTasks: React.FC = () => {
  const { data: tasks, isLoading, isError, refetch, error } = useGetCompletedTasks();
  const clearCredentials = useAuth((state) => state.clearCredentials);

  useEffect(() => {
    if (isError && error.response?.status === 401) {
      clearCredentials();
    }
  }, []);

  useEffect(() => {
    document.title = "Completed Tasks";
  }, []);

  if (isLoading) {
    return <TaskSkeletons />;
  }

  if (isError) {
    return <ErrorTasks pageReload={() => refetch()} />;
  }

  if (!tasks?.length) {
    return <NoTasks message="You don't have any completed task at the moment" />;
  }

  return (
    <main className="mt-8 pb-10 md:pb-0 items-start flex flex-col md:flex-row md:flex-wrap gap-6 overflow-y-auto md:max-h-[calc(100vh-160px)] custom-scroll rounded-lg">
      {tasks?.map(({ date, taskName, ...rest }) => (
        <TaskCard key={taskName} taskName={taskName} date={new Date(date)} {...rest} />
      ))}
    </main>
  );
};

export default CompletedTasks;
