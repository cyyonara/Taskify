import { Request } from "express";
import { HydratedDocument, ObjectId } from "mongoose";

interface ExtractedUser {
  _id: ObjectId;
  username: string;
  avatar: string;
}

export interface IRequest extends Request {
  user?: HydratedDocument<ExtractedUser>;
}
