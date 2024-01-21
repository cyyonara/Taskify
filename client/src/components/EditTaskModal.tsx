import DatePicker from "@/components/DatePicker";
import Overlay from "@/components/Overlay";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { SubmitHandler, useForm } from "react-hook-form";
import { ITask } from "@/lib/taskSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "@/lib/taskSchema";
import { Loader } from "lucide-react";
import { useEditTask } from "@/hooks/useEditTask";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/state/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface EditTaskModalProps {
  _id: string;
  taskName: string;
  description: string;
  date: Date;
  isCompleted: boolean;
  isImportant: boolean;
  closeEditTaskModal: () => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  _id,
  taskName,
  description,
  date,
  isCompleted,
  isImportant,
  closeEditTaskModal,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ITask>({
    defaultValues: {
      taskName,
      description,
      date,
      isCompleted,
      isImportant,
    },
    resolver: zodResolver(taskSchema),
  });
  const { mutateAsync } = useEditTask();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const clearCredentials = useAuth((state) => state.clearCredentials);

  const handleEditTask: SubmitHandler<ITask> = async (data): Promise<void> => {
    try {
      await mutateAsync({ ...data, _id });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      closeEditTaskModal();
      toast({
        title: "Updated",
        description: `Changes applied to task "${taskName}"`,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          clearCredentials();
        } else {
          toast({
            title: "Something went wrong!",
            description: error.response?.data.message,
          });
        }
      }
    }
  };

  return (
    <Overlay>
      <motion.form
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onSubmit={handleSubmit(handleEditTask)}
        className="flex-1 max-w-[450px]"
      >
        <Card>
          <CardHeader>
            <CardTitle>Edit Task</CardTitle>
            <CardDescription>
              Task: <span className="text-primary">"{taskName}"</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-y-4 flex-col">
              <div className="flex flex-col gap-y-2">
                <Input
                  placeholder="Enter your new task name"
                  disabled={isSubmitting}
                  {...register("taskName")}
                />
                {errors.taskName && (
                  <p className="text-red-500 text-sm">{errors.taskName.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-y-2">
                <Textarea
                  rows={6}
                  placeholder="Task description..."
                  disabled={isSubmitting}
                  className="resize-none custom-scroll"
                  {...register("description")}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">{errors.description.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-y-2">
                <DatePicker
                  isSubmitting={isSubmitting}
                  setTaskDate={(dt) => setValue("date", dt as Date)}
                  date={watch("date")}
                />
                {errors.date && (
                  <p className="text-red-500 text-sm">
                    Please select a date for your task
                  </p>
                )}
              </div>
              <div className="flex gap-x-2 text-muted-foreground">
                <div className="flex items-center gap-x-1">
                  <Checkbox
                    id="isCompleted"
                    disabled={isSubmitting}
                    checked={watch("isCompleted")}
                    onCheckedChange={(checkState: boolean) =>
                      setValue("isCompleted", checkState)
                    }
                  />
                  <label htmlFor="isCompleted" className="text-sm">
                    Completed
                  </label>
                </div>
                <div className="flex items-center gap-x-1">
                  <Checkbox
                    id="isImportant"
                    disabled={isSubmitting}
                    checked={watch("isImportant")}
                    onCheckedChange={(checkState: boolean) =>
                      setValue("isImportant", checkState)
                    }
                  />
                  <label htmlFor="isImportant" className="text-sm">
                    Important
                  </label>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-x-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 flex items-center justify-center gap-2"
            >
              {isSubmitting && <Loader size={20} className="animate-spin" />}
              <span>{isSubmitting ? "Saving changes..." : "Save changes"}</span>
            </Button>
            <Button type="button" variant="secondary" onClick={closeEditTaskModal}>
              Cancel
            </Button>
          </CardFooter>
        </Card>
      </motion.form>
    </Overlay>
  );
};

export default EditTaskModal;
