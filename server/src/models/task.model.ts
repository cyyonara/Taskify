import mongoose, { InferSchemaType } from "mongoose";

const taskSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  taskName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    required: true,
  },
  isImportant: {
    type: Boolean,
    required: true,
  },
});

interface M_Task extends InferSchemaType<typeof taskSchema> {}

export default mongoose.model<M_Task>("Task", taskSchema);
