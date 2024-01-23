import TaskCard from "@/components/TaskCard";
import TaskSkeletons from "@/components/TaskSkeletons";
import NoTasks from "@/components/NoTasks";
import ErrorTasks from "@/components/ErrorTasks";
import { useGetImportantTasks } from "@/hooks/useGetImportantTasks";
import { useEffect } from "react";
import { useAuth } from "@/state/useAuth";

const ImportantTasks: React.FC = () => {
  const { data: tasks, isLoading, isError, error, refetch } = useGetImportantTasks();
  const clearCredentials = useAuth((state) => state.clearCredentials);

  useEffect(() => {
    if (isError && error?.response?.status === 401) {
      clearCredentials();
    }
  }, [isError]);

  useEffect(() => {
    document.title = "Completed Tasks";
  }, []);

  if (isLoading) {
    return <TaskSkeletons />;
  }

  if (isError) {
    return <ErrorTasks pageReload={() => refetch} />;
  }

  if (!tasks?.length) {
    return <NoTasks message="You don't have any important task at the moment" />;
  }

  return (
    <main className="mt-8 pb-10 md:pb-0 items-start flex flex-col md:flex-row md:flex-wrap gap-6 overflow-y-auto md:max-h-[calc(100vh-160px)] custom-scroll rounded-lg">
      {tasks?.map(({ date, taskName, ...rest }) => (
        <TaskCard key={taskName} taskName={taskName} date={new Date(date)} {...rest} />
      ))}
    </main>
  );
};

export default ImportantTasks;
