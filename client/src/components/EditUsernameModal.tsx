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
import { Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEditUsername } from "@/hooks/useEditUsername";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/state/useAuth";
import { useEffect } from "react";

interface EditUsernameModalProps {
  username: string;
  closeModal: () => void;
}

const usernameSchema = z.object({
  username: z
    .string()
    .min(2, "Username must have atleast 2 characters")
    .max(20, "Username is too long"),
});

type UsernameField = z.infer<typeof usernameSchema>;

const EditUsernameModal: React.FC<EditUsernameModalProps> = ({
  username,
  closeModal,
}) => {
  const { mutateAsync } = useEditUsername();
  const { toast } = useToast();
  const { clearCredentials, setCredentials } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    formState: { isDirty, errors, isSubmitting },
  } = useForm<UsernameField>({
    defaultValues: {
      username,
    },
    resolver: zodResolver(usernameSchema),
  });

  useEffect(() => {
    setFocus("username");
  }, []);

  const handleEditUsername: SubmitHandler<UsernameField> = async ({
    username,
  }): Promise<void> => {
    try {
      const credentials = await mutateAsync(username);
      setCredentials(credentials);
      toast({
        title: "Success",
        description: "Username successfully changed!",
      });
      closeModal();
    } catch (error: any) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          clearCredentials();
        } else if (error.response?.status === 400) {
          setError("username", { message: error.response.data.message });
        } else {
          toast({
            title: "Something went wrong!",
            description: error.response?.data.message,
          });
        }
      }
    }
  };

  return (
    <Overlay>
      <motion.form
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onSubmit={handleSubmit(handleEditUsername)}
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
            <Button
              disabled={!isDirty || isSubmitting}
              type="submit"
              className="flex items-center gap-x-2"
            >
              {isSubmitting && <Loader size={20} className="animate-spin" />}
              <span>{isSubmitting ? "Saving changes..." : " Save changes"}</span>
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
