import { Button } from "@/components/ui/button";
import { LucideRepeat2 } from "lucide-react";

interface ErrorTasksProps {
  pageReload: () => void;
}

const ErrorTasks: React.FC<ErrorTasksProps> = ({ pageReload }) => {
  return (
    <main className="mt-8 pb-10 md:pb-0 items-center justify-center flex h-[calc(100vh-160px)] custom-scroll">
      <div className="flex flex-col items-center gap-y-4">
        <h4 className="text-xl">Something went wrong. Please reload the page</h4>
        <Button
          variant="secondary"
          onClick={pageReload}
          className="flex items-center gap-1"
        >
          <LucideRepeat2 />
          <span>Reload</span>
        </Button>
      </div>
    </main>
  );
};

export default ErrorTasks;
