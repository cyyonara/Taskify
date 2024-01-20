import Overlay from "@/components/Overlay";
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface EditUsernameModalProps {
  username: string;
  closeModal: () => void;
}

const usernameSchema = z.object({
  username: z
    .string()
    .min(2, "Username must have atleast 2 characters")
    .max(20, "Username too long"),
});

type UsernameField = z.infer<typeof usernameSchema>;

const EditUsernameModal: React.FC<EditUsernameModalProps> = ({
  username,
  closeModal,
}) => {
  const {
    register,
    setError,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<UsernameField>({
    defaultValues: {
      username,
    },
    resolver: zodResolver(usernameSchema),
  });

  return (
    <Overlay>
      <motion.form
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onSubmit={handleSubmit((data) => console.log(data))}
        className="flex-1 max-w-[400px]"
      >
        <Card>
          <CardHeader>
            <CardTitle>Edit username</CardTitle>
            <CardDescription>
              Change username in your <span className="text-primary">Taskify</span>{" "}
              account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-y-2">
              <Input placeholder="Enter new username" {...register("username")} />
              {errors.username && (
                <p className="text-red-500 text-sm">{errors.username.message}</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex gap-x-2">
            <Button disabled={!isDirty} type="submit">
              Done
            </Button>
            <Button type="button" variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
          </CardFooter>
        </Card>
      </motion.form>
    </Overlay>
  );
};

export default EditUsernameModal;
