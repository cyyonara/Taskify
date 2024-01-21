import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getFileExtension = (file: File): string => {
  const fileExtension: string[] = file.name.split(".");
  return fileExtension[fileExtension.length - 1].toLowerCase();
};
