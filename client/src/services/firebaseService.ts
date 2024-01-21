import { storage as firebaseStorage } from "@/config/firebaseConfig";
import {
  uploadBytes,
  ref,
  getDownloadURL,
  StorageReference,
  UploadResult,
} from "firebase/storage";
import { v4 as uuid } from "uuid";

interface IUpload {
  isSuccess: boolean;
  url?: string;
}

export const uploadImage = async (imageFile: File): Promise<IUpload> => {
  try {
    const url = await new Promise<string>((resolve, reject) => {
      const fileName: string = uuid() + imageFile.name;
      const storageRef: StorageReference = ref(firebaseStorage, `taskify/${fileName}`);

      uploadBytes(storageRef, imageFile)
        .then((snapshot: UploadResult) => getDownloadURL(snapshot.ref))
        .then((url) => resolve(url))
        .catch((error) => reject(error));
    });
    return { isSuccess: true, url };
  } catch (error) {
    return { isSuccess: false };
  }
};
