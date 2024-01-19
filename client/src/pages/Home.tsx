import { useEffect } from "react";
import { useGetTasks } from "@/hooks/useGetTasks";
import NoTasks from "@/components/custom/NoTasks";
import TaskCard from "@/components/custom/TaskCard";

const Home: React.FC = () => {
  const { data: tasks, isLoading, isError } = useGetTasks();

  useEffect(() => {
    document.title = "Home - Taskify";
  }, []);

  if (isLoading) return <h1>Loading</h1>;

  if (tasks?.length === 0) return <NoTasks />;

  return (
    <main className="mt-8 pb-10 md:pb-0 items-start flex flex-col md:flex-row md:flex-wrap gap-6 overflow-y-auto md:max-h-[calc(100vh-160px)] custom-scroll rounded-lg">
      {tasks?.map(({ date, taskName, ...rest }) => (
        <TaskCard key={taskName} taskName={taskName} date={new Date(date)} {...rest} />
      ))}
    </main>
  );
};

export default Home;
