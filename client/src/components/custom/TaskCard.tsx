import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash } from "lucide-react";

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
  return (
    <Card className="flex w-auto h-[330px] md:w-[400px] flex-col bg-accent">
      <CardHeader>
        <CardTitle className="line-clamp-2">
          <h3>{taskName}</h3>
        </CardTitle>
        <CardDescription className="flex flex-col sm:flex-row gap-y-2 gap-x-4">
          <span> {format(date, "PPP")}</span>
          <div className="text-sm flex gap-x-2">
            {isImportant && <Badge className="text-xs">Important</Badge>}
            {isCompleted && <Badge className="text-xs bg-green-700">Completed</Badge>}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm line-clamp-[6]">{description}</p>
        <div className="flex gap-x-2"></div>
      </CardContent>
      <CardFooter className="mt-auto flex gap-x-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="duration-150 hover:bg-accent hover:scale-110">
                <Edit size={17} />
              </button>
            </TooltipTrigger>
            <TooltipContent>Edit</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="duration-150 hover:bg-accent hover:scale-110">
                <Trash size={17} />
              </button>
            </TooltipTrigger>
            <TooltipContent>Delete</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
