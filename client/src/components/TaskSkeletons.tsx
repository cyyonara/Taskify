import { Skeleton } from "@/components/ui/skeleton";

const TaskSkeletons: React.FC = () => {
  return (
    <main className="mt-8 pb-10 md:pb-0 items-start flex flex-col md:flex-row md:flex-wrap gap-6 overflow-y-auto md:max-h-[calc(100vh-160px)] custom-scroll rounded-lg">
      {Array(9)
        .fill(null)
        .map((_, i) => (
          <Skeleton key={i} className="w-full h-[330px] md:w-[400px]" />
        ))}
    </main>
  );
};

export default TaskSkeletons;
