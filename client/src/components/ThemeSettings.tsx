import { LucideSettings2 } from "lucide-react";
import { useTheme } from "@/state/useTheme";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const ThemeSettings = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <section>
      <header className="flex items-center gap-x-2 mt-10 border-b pb-3">
        <LucideSettings2 />
        <h4 className="text-lg">Theming</h4>
      </header>
      <div className="flex items-center justify-center my-16 cursor-pointer gap-x-2">
        <span className="capitalize">{theme} Mode</span>
        <div
          onClick={toggleTheme}
          className={cn("flex h-[20px] w-[40px] border justify-start rounded-full", {
            "justify-end": theme === "dark",
          })}
        >
          <motion.span
            layout
            className={cn("h-full w-[50%] bg-green-600 rounded-full", {
              "bg-primary justify-self-start": theme === "dark",
            })}
          ></motion.span>
        </div>
      </div>
    </section>
  );
};

export default ThemeSettings;
