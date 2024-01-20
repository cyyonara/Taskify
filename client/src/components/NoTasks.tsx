interface NoTasksProps {
  message: string;
}

const NoTasks: React.FC<NoTasksProps> = ({ message }) => {
  return (
    <main className="flex-1 flex h-[99%]">
      <h3 className="m-auto text-base md:text-lg text-center">{message}</h3>
    </main>
  );
};

export default NoTasks;
