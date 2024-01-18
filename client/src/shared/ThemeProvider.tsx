import { useEffect } from "react";
import { useTheme } from "@/states/useTheme";

interface ThemeProviderProps {
  children: React.JSX.Element;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
}: ThemeProviderProps) => {
  const { theme } = useTheme();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      //document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return <>{children}</>;
};

export default ThemeProvider;
