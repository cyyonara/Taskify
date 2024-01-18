import Overlay from "@/components/custom/Overlay";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { motion } from "framer-motion";
import { useAddTaskDialog } from "@/states/useAddTaskDialog";
import { useFormik } from "formik";
import { useEffect, useRef } from "react";
import * as yup from "yup";
import DatePicker from "./DatePicker";

const addTaskSchema = yup.object().shape({
  taskName: yup.string().required("This field is required"),
  description: yup.string().required("This field is required"),
  date: yup.date().nullable(),
  isCompleted: yup.boolean(),
  isImportant: yup.boolean(),
});

type AddTaskForm = yup.InferType<typeof addTaskSchema>;

const AddTaskDialog: React.FC = () => {
  const closeAddTaskDialog = useAddTaskDialog((state) => state.closeAddTaskDialog);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { values, errors, handleChange, setFieldValue, handleSubmit, submitForm } =
    useFormik<AddTaskForm>({
      initialValues: {
        taskName: "",
        description: "",
        date: undefined,
        isCompleted: false,
        isImportant: false,
      },
      validationSchema: addTaskSchema,
      onSubmit: (formData) => {
        console.log(formData);
      },
    });
  const { taskName, description, isCompleted, isImportant, date } = values;

  const handleCheckedChange = (id: string, checkValue: boolean) => {
    setFieldValue(id, checkValue);
  };

  const isFormNotComplete = (): boolean => {
    return (
      taskName === "" ||
      description === "" ||
      date === null ||
      "taskName" in errors ||
      "description" in errors
    );
  };

  const setTaskDate = (date: Date | undefined) => {
    setFieldValue("date", date);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Overlay>
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="flex-1 max-w-[450px]"
      >
        <Card className="">
          <CardHeader>
            <CardTitle>Create Task</CardTitle>
            <CardDescription>
              Add new task to your <span className="text-primary">Taskify</span> list
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex gap-y-4 flex-col">
              <Input
                id="taskName"
                placeholder="Enter your new task name"
                value={taskName}
                onChange={handleChange}
                ref={inputRef}
              />
              <Textarea
                id="description"
                rows={6}
                placeholder="Task description..."
                value={description}
                onChange={handleChange}
                className="resize-none"
              />
              <DatePicker date={date as undefined | Date} setTaskDate={setTaskDate} />
              <div className="flex gap-x-2 text-muted-foreground">
                <div className="flex items-center gap-x-1">
                  <Checkbox
                    id="isCompleted"
                    checked={isCompleted}
                    onCheckedChange={(checkValue: boolean) =>
                      handleCheckedChange("isCompleted", checkValue)
                    }
                  />
                  <label htmlFor="isCompleted" className="text-sm">
                    Completed
                  </label>
                </div>
                <div className="flex items-center gap-x-1">
                  <Checkbox
                    id="isImportant"
                    checked={isImportant}
                    onCheckedChange={(checkValue: boolean) =>
                      handleCheckedChange("isImportant", checkValue)
                    }
                  />
                  <label htmlFor="isImportant" className="text-sm">
                    Important
                  </label>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex gap-x-2">
            <Button
              disabled={isFormNotComplete()}
              onClick={submitForm}
              className="flex-1"
            >
              Add
            </Button>
            <Button variant="secondary" onClick={closeAddTaskDialog}>
              Cancel
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </Overlay>
  );
};

export default AddTaskDialog;
