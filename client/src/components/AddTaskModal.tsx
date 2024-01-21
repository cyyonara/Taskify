import Overlay from "@/components/Overlay";
import DatePicker from "./DatePicker";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { motion } from "framer-motion";
import { useForm, SubmitHandler } from "react-hook-form";
import { taskSchema, ITask } from "@/lib/taskSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useAddTask } from "@/hooks/useAddTask";
import { useToast } from "./ui/use-toast";
import { useAuth } from "@/state/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";

interface AddTaskModalProps {
  closeModal: () => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ closeModal }) => {
  const { mutateAsync } = useAddTask();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<ITask>({
    defaultValues: {
      isCompleted: false,
      isImportant: false,
      date: new Date(),
    },
    resolver: zodResolver(taskSchema),
  });
  const clearCredentials = useAuth((state) => state.clearCredentials);
  const queryClient = useQueryClient();

  useEffect(() => {
    setFocus("taskName");
  }, []);

  const handleAddTask: SubmitHandler<ITask> = async (data): Promise<void> => {
    try {
      const newTask = await mutateAsync(data);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });

      toast({
        title: "Success",
        description: `Your task "${newTask.taskName}" has been added to your list`,
      });
      closeModal();
    } catch (error: any) {
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
        onSubmit={handleSubmit(handleAddTask)}
        className="flex-1 max-w-[450px]"
      >
        <Card>
          <CardHeader>
            <CardTitle>Create Task</CardTitle>
            <CardDescription>
              Add new task to your <span className="text-primary">Taskify</span> list
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
              <span>{isSubmitting ? "Creating your task..." : "Create"}</span>
            </Button>
            <Button type="button" variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
          </CardFooter>
        </Card>
      </motion.form>
    </Overlay>
  );
};

export default AddTaskModal;
