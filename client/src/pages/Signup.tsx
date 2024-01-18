import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSignUp } from "@/hooks/useSignUp";
import { useFormik } from "formik";
import { AlertCircleIcon, Loader } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/states/useAuth";
import { Navigate } from "react-router-dom";
import * as yup from "yup";

const signupSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(2, "Username must be atleast 2 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Please create a stronger password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Please confirm your password"),
});

interface SignUpForm extends yup.InferType<typeof signupSchema> {}

const SignUp: React.FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { mutate, isPending } = useSignUp();
  const { toast } = useToast();
  const { user, setCredentials } = useAuth();
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    useFormik<SignUpForm>({
      initialValues: { username: "", password: "", confirmPassword: "" },
      validationSchema: signupSchema,
      onSubmit: ({ confirmPassword, ...rest }) => {
        mutate(rest, {
          onSuccess: (data) => {
            toast({
              title: "Welcome to Taskify",
              description: `Glad that you're here ${data.username}!`,
            });
            setCredentials(data);
          },
          onError: (err) => {
            toast({
              title: "Oops! Something's wrong",
              description: err.response?.data.message,
            });
          },
        });
      },
    });
  const { username, password, confirmPassword } = values;

  useEffect(() => {
    document.title = "Sign up - Taskify";
    inputRef.current?.focus();
  }, []);

  if (user) return <Navigate to={"/dashboard"} />;

  return (
    <div className="bg-background h-screen flex items-center justify-center p-4">
      <div className="flex gap-y-3 flex-col flex-1 max-w-[450px]">
        <h1 className="font-bold text-center">Sign up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-1">
            <Input
              id="username"
              type="text"
              placeholder="Username"
              ref={inputRef}
              value={username}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isPending}
            />
            {errors.username && touched.username && (
              <p className="text-sm text-red-500">{errors.username}</p>
            )}
          </div>
          <div className="flex flex-col gap-y-2">
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isPending}
            />
            <div className="flex flex-col gap-y-1 mt-1">
              <div className="flex text-muted-foreground items-center gap-x-1 text-sm">
                <AlertCircleIcon size={16} />
                <p>Use atleast 8 characters</p>
              </div>
              {errors.password && touched.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isPending}
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <p className="text-sm text-red-500">{errors.confirmPassword}</p>
            )}
          </div>
          <Button type="submit" className="mt-2 flex items-center gap-x-2">
            {isPending && <Loader size={20} className="animate-spin" />}
            <span>{isPending ? "Signing Up..." : "Sign Up"}</span>
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
