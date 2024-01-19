import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSignUp } from "@/hooks/useSignUp";
import { AlertCircleIcon, Loader } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/states/useAuth";
import { Navigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";

const signUpSchema = z
  .object({
    username: z.string().min(2, "Username must have atleast 2 characters"),
    password: z.string().min(8, "Please create a stronger password"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

interface SignUpFields extends z.infer<typeof signUpSchema> {}

const SignUp: React.FC = () => {
  const { mutateAsync } = useSignUp();
  const { toast } = useToast();
  const { user, setCredentials } = useAuth();
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFields>({
    mode: "onTouched",
    resolver: zodResolver(signUpSchema),
  });

  const handleSignUp: SubmitHandler<SignUpFields> = async ({
    username,
    password,
  }): Promise<void> => {
    try {
      const credentials = await mutateAsync({ username, password });
      toast({
        title: "Account successfully created!",
        description: `Welcom to Taskify ${credentials.username}!`,
      });
      setCredentials(credentials);
    } catch (error: any) {
      if (error instanceof AxiosError) {
        toast({
          title: "Oops! Something's wrong",
          description: error.response?.data.message || "Internal Server Error",
        });
      }
    }
  };

  useEffect(() => {
    setFocus("username");
    document.title = "Sign up - Taskify";
  }, []);

  if (user) return <Navigate to={"/dashboard"} replace />;

  return (
    <div className="bg-background h-screen flex items-center justify-center p-4">
      <div className="flex gap-y-3 flex-col flex-1 max-w-[450px]">
        <h1 className="font-bold text-center">Sign up</h1>
        <form onSubmit={handleSubmit(handleSignUp)} className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-1">
            <Input
              type="text"
              placeholder="Username"
              disabled={isSubmitting}
              {...register("username")}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-y-2">
            <Input
              type="password"
              placeholder="Password"
              disabled={isSubmitting}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
            <div className="flex flex-col gap-y-1 mt-1">
              <div className="flex text-muted-foreground items-center gap-x-1 text-sm">
                <AlertCircleIcon size={16} />
                <p>Use atleast 8 characters</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <Input
              type="password"
              placeholder="Confirm password"
              disabled={isSubmitting}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>
          <Button
            disabled={isSubmitting}
            type="submit"
            className="mt-2 flex items-center gap-x-2"
          >
            {isSubmitting && <Loader size={20} className="animate-spin" />}
            <span>{isSubmitting ? "Signing Up..." : "Sign Up"}</span>
          </Button>
          <span className="text-center">
            Already have an account?{" "}
            <Link to={"/"} className="font-semibold hover:underline text-primary">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
