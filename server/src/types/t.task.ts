import { taskSchema } from "../utils/validation";
import { z } from "zod";

export interface Task extends Omit<z.infer<typeof taskSchema>, "author"> {}
