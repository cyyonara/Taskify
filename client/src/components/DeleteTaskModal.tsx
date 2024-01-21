import Overlay from "./Overlay";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

interface DeleteTaskModalProps {
  isLoading: boolean;
  taskName: string;
  handleDeleteTask: () => void;
  closeModal: () => void;
}

const DeleteTaskModal: React.FC<DeleteTaskModalProps> = ({
  isLoading,
  handleDeleteTask,
  taskName,
  closeModal,
}) => {
  return (
    <Overlay>
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Delete Task</CardTitle>
            <CardDescription>
              Are you sure you want to delete your task "{taskName}"?
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex gap-x-2">
            <Button
              disabled={isLoading}
              onClick={handleDeleteTask}
              className="flex items-center gap-2"
            >
              {isLoading && <Loader size={20} className="animate-spin" />}
              <span>{isLoading ? "Processing..." : "Delete"}</span>
            </Button>
            <Button onClick={closeModal} variant="secondary">
              Cancel
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </Overlay>
  );
};

export default DeleteTaskModal;
