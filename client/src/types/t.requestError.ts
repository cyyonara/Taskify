import { AxiosError } from "axios";

export interface IRequestError extends AxiosError<{ message: string }> {}
