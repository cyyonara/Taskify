import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/states/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import { useLogin } from "@/hooks/useLogin";
import { Loader } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { LoginData } from "@/types/t.auth";

const Login: React.FC = () => {
  const [loginForm, setLoginForm] = useState<LoginData>({ username: "", password: "" });
  const { user, setCredentials } = useAuth();
  const { mutate, isPending } = useLogin();
  const { toast } = useToast();

  const inputRef = useRef<HTMLInputElement | null>(null);

  console.log(useLocation());

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLoginForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = (e: React.FormEvent): void => {
    e.preventDefault();
    mutate(loginForm, {
      onSuccess: (data) => {
        toast({
          title: "Hello!",
          description: `Welcome back ${data.username}`,
        });
        setCredentials(data);
      },
      onError: (err) => {
        toast({
          title: "Oops!",
          description: err.response?.data.message,
        });
      },
    });
  };

  useEffect(() => {
    document.title = "Login - Taskify";
    inputRef.current?.focus();
  }, []);

  if (user) return <Navigate to={"/dashboard"} replace />;

  return (
    <div className="bg-background h-screen flex items-center justify-center p-4">
      <div className="flex gap-y-3 flex-col flex-1 max-w-[450px]">
        <h1 className="font-bold text-center">Taskify</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-y-4">
          <Input
            name="username"
            type="text"
            placeholder="Username"
            value={loginForm.username}
            onChange={handleFormChange}
            ref={inputRef}
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={loginForm.password}
            onChange={handleFormChange}
          />
          <Button
            type="submit"
            disabled={isPending}
            className="mt-2 gap-x-2 flex items-center"
          >
            {isPending && <Loader size={20} className="animate-spin" />}
            <span>{isPending ? "Logging in...." : "Login"}</span>
          </Button>
          <span className="text-center">
            Don't have an account?{" "}
            <Link to={"/signup"} className="font-semibold hover:underline text-primary">
              Sign Up
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
