import mongoose, { InferSchemaType } from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default:
      "https://firebasestorage.googleapis.com/v0/b/school-9c7f7.appspot.com/o/taskify%2Fd2caafb1-70da-47e2-ba48-efd66565cde1_w1024_r0.9975262832405689_fpx44.98_fpy48.86.jpg?alt=media&token=18eb0774-b91a-416d-be8d-d6a49753cd0e",
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET as string, {
    expiresIn: "60d",
  });
};

interface M_User extends InferSchemaType<typeof userSchema> {
  generateToken: () => string;
}

export default mongoose.model<M_User>("User", userSchema);
