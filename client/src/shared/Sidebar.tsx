import LogoutDialog from "@/components/custom/LogoutDialog";
import { NavLink } from "react-router-dom";
import { Home, Shell, CheckCircle, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/states/useAuth";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useLogout } from "@/hooks/useLogout";
import { useToast } from "@/components/ui/use-toast";

interface NavigationLink {
  label: string;
  path: string;
  end: boolean;
  icon: React.JSX.Element;
}

export const navLinks: Array<NavigationLink> = [
  {
    label: "Home",
    path: "/dashboard",
    end: true,
    icon: <Home size={18} />,
  },
  {
    label: "Completed",
    path: "/dashboard/completed",
    end: false,
    icon: <CheckCircle size={18} />,
  },
  {
    label: "Important",
    path: "/dashboard/important",
    end: false,
    icon: <Shell size={18} />,
  },
  {
    label: "Settings",
    path: "/dashboard/settings",
    end: false,
    icon: <Settings size={18} />,
  },
];

const Sidebar: React.FC = () => {
  const [showLogoutDialog, setShowLogoutDialog] = useState<boolean>(false);
  const { user, clearCredentials } = useAuth();
  const { mutate, isPending } = useLogout();
  const { toast } = useToast();

  const closeLogoutDialog = (): void => {
    setShowLogoutDialog(false);
  };

  const handleLogout = (): void => {
    mutate(null, {
      onSuccess: () => {
        clearCredentials();
      },
      onError: (err) => {
        toast({
          title: "Oops!",
          description: err.response?.data.message || "Internal Server Error",
        });
      },
    });
  };

  return (
    <div className="border-border border hidden rounded md:flex flex-col min-w-[350px]">
      <div className="flex items-center p-6 gap-x-4">
        <img src={user?.avatar} className="w-[90px] h-[90px] rounded-full" />
        <h3 className="max-w-[220px] text-ellipsis overflow-hidden whitespace-nowrap">
          {user?.username}
        </h3>
      </div>
      <nav className="sidebar mt-8">
        <ul className="flex flex-col">
          {navLinks.map(({ label, path, end, icon }) => (
            <li key={label}>
              <NavLink
                to={path}
                end={end}
                className="relative px-4 py-3 text-muted-foreground flex items-center gap-x-1 after:content-[''] after:absolute after:inset-y-0 after:right-0 after:w-1 after:bg-primary after:border-border after:duration-150 after:origin-right after:scale-0 duration-150"
              >
                {icon}
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <button
        disabled={isPending}
        onClick={() => setShowLogoutDialog(true)}
        className="bg-background gap-x-1 duration-150 hover:bg-secondary hover:text-primary flex items-center text-muted-foreground mt-auto px-4 py-3 dark:hover:text-foreground"
      >
        <LogOut size={16} />
        <span>Logout</span>
      </button>
      <AnimatePresence>
        {showLogoutDialog && (
          <LogoutDialog
            handleLogout={handleLogout}
            closeLogoutDialog={closeLogoutDialog}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Sidebar;
