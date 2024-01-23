import Overlay from "@/components/Overlay";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { useChangePassword } from "@/hooks/useChangePassword";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/state/useAuth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { IRequestError } from "@/types/t.requestError";
import { useEffect } from "react";

interface ChangePasswordModalProps {
  closeModal: () => void;
}

const changePasswordSchema = z
  .object({
    newPassword: z.string().min(8, "Please create a stronger password"),
    retypedPassword: z.string(),
    currentPassword: z.string().refine((data) => data.length > 0, {
      message: "Please enter your current password",
    }),
  })
  .refine((data) => data.newPassword === data.retypedPassword, {
    message: "Passwords must match",
    path: ["retypedPassword"],
  });

type ChangePasswordFields = z.infer<typeof changePasswordSchema>;

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ closeModal }) => {
  const { mutateAsync } = useChangePassword();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFields>({
    defaultValues: {
      newPassword: "",
      retypedPassword: "",
      currentPassword: "",
    },
    resolver: zodResolver(changePasswordSchema),
  });
  const clearCredentials = useAuth((state) => state.clearCredentials);

  useEffect(() => {
    setFocus("newPassword");
  }, []);

  const handleChangePassword: SubmitHandler<ChangePasswordFields> = async ({
    newPassword,
    currentPassword,
  }): Promise<void> => {
    try {
      await mutateAsync({ newPassword, currentPassword });
      toast({ title: "Password Changed", description: "Your password has been changed" });
      closeModal();
    } catch (error) {
      const err = error as IRequestError;

      switch (err.response?.status) {
        case 401:
          clearCredentials();
          break;
        case 400:
          setError("currentPassword", { message: err.response?.data.message });
          break;
        default:
          toast({
            title: "Something went wrong",
            description: err.response?.data.message,
          });
      }
    }
  };

  return (
    <Overlay>
      <form
        onSubmit={handleSubmit(handleChangePassword)}
        className="flex-1 max-w-[500px]"
      >
        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>
              Enter at least 8 characters for your new password then enter your current
              password to continue.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-y-4">
              <div className="flex flex-col gap-y-2">
                <Input
                  type="password"
                  placeholder="New password"
                  {...register("newPassword")}
                />
                {errors.newPassword && (
                  <p className="text-sm text-red-500">{errors.newPassword.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-y-2">
                <Input
                  type="password"
                  placeholder="Retype password"
                  {...register("retypedPassword")}
                />
                {errors.retypedPassword && (
                  <p className="text-sm text-red-500">{errors.retypedPassword.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-y-2">
                <Input
                  type="password"
                  placeholder="Current password"
                  {...register("currentPassword")}
                />
                {errors.currentPassword && (
                  <p className="text-sm text-red-500">{errors.currentPassword.message}</p>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex items-center gap-x-2">
            <Button
              type="submit"
              disabled={
                isSubmitting ||
                watch("newPassword").length === 0 ||
                watch("retypedPassword").length === 0 ||
                watch("currentPassword").length === 0
              }
              className="flex items-center gap-x-2"
            >
              {isSubmitting && <Loader size={20} className="animate-spin" />}
              <span>{isSubmitting ? "Applying changes..." : "Apply changes"}</span>
            </Button>
            <Button type="button" variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Overlay>
  );
};

export default ChangePasswordModal;
