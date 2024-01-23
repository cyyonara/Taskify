import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash } from "lucide-react";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useDeleteTask } from "@/hooks/useDeleteTask";
import { useToast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/state/useAuth";
import DeleteTaskModal from "@/components/DeleteTaskModal";
import EditTaskModal from "@/components/EditTaskModal";

interface TaskCardProps {
  _id: string;
  taskName: string;
  description: string;
  date: Date;
  isCompleted: boolean;
  isImportant: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({
  _id,
  taskName,
  description,
  date,
  isCompleted,
  isImportant,
}) => {
  const [showEditTaskModal, setShowEditTaskModal] = useState<boolean>(false);
  const [showDeleteTaskModal, setShowDeleteTaskModal] = useState<boolean>(false);
  const { mutate, isPending } = useDeleteTask();
  const clearCredentials = useAuth((state) => state.clearCredentials);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleDeleteTask = () => {
    mutate(_id, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: `Task "${taskName}" successfully deleted`,
        });
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
        setShowDeleteTaskModal(false);
      },
      onError: (error) => {
        if (error.response?.status === 401) {
          clearCredentials();
        } else {
          toast({
            title: "Oops! Something went wrong!",
            description: error.response?.data.message,
          });
        }
      },
    });
  };

  return (
    <>
      <AnimatePresence>
        {showEditTaskModal && (
          <EditTaskModal
            _id={_id}
            taskName={taskName}
            description={description}
            date={date}
            isCompleted={isCompleted}
            isImportant={isImportant}
            closeEditTaskModal={() => setShowEditTaskModal(false)}
          />
        )}
        {showDeleteTaskModal && (
          <DeleteTaskModal
            isLoading={isPending}
            taskName={taskName}
            closeModal={() => setShowDeleteTaskModal(false)}
            handleDeleteTask={handleDeleteTask}
          />
        )}
      </AnimatePresence>
      <Card className="flex w-auto sm:h-[360px] md:w-[410px] flex-col bg-accent  overflow-hidden">
        <CardHeader>
          <CardTitle className="line-clamp-2 leading-snug">{taskName}</CardTitle>
          <CardDescription className="flex flex-col sm:flex-row gap-y-2 gap-x-4">
            <span> {format(date, "PPP")}</span>
          </CardDescription>
          <div className="text-sm flex gap-x-2">
            {isImportant && <Badge className="text-white">Important</Badge>}
            {isCompleted && (
              <Badge className="bg-green-600 hover:bg-green-600/80 text-white">
                Completed
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm line-clamp-[5]">{description}</p>
        </CardContent>
        <CardFooter className="mt-auto flex gap-x-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setShowEditTaskModal(true)}
                  className="duration-150 hover:bg-accent hover:scale-110"
                >
                  <Edit size={17} />
                </button>
              </TooltipTrigger>
              <TooltipContent>Edit</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setShowDeleteTaskModal(true)}
                  className="duration-150 hover:bg-accent hover:scale-110"
                >
                  <Trash size={17} />
                </button>
              </TooltipTrigger>
              <TooltipContent>Delete</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardFooter>
      </Card>
    </>
  );
};

export default TaskCard;
