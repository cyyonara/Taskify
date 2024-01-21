import LogoutModal from "@/components/LogoutModal";
import { NavLink } from "react-router-dom";
import { Shell, CheckCircle, Settings, LogOut, TableProperties } from "lucide-react";
import { useAuth } from "@/state/useAuth";
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
    label: "All Tasks",
    path: "/dashboard",
    end: true,
    icon: <TableProperties size={18} />,
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
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
  const { user, clearCredentials } = useAuth();
  const { mutate, isPending } = useLogout();
  const { toast } = useToast();

  const closeLogoutModal = (): void => {
    setShowLogoutModal(false);
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
    <div className="border-border border hidden rounded-lg md:flex flex-col min-w-[340px] overflow-hidden">
      <div className="flex items-center p-6 gap-x-4">
        <img
          src={user?.avatar}
          className="w-[50px] h-[50px] rounded-full object-cover object-center"
        />
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
        onClick={() => setShowLogoutModal(true)}
        className="bg-background gap-x-1 duration-150 hover:bg-secondary hover:text-primary flex items-center text-muted-foreground mt-auto px-4 py-3 dark:hover:text-foreground"
      >
        <LogOut size={16} />
        <span>Logout</span>
      </button>
      <AnimatePresence>
        {showLogoutModal && (
          <LogoutModal handleLogout={handleLogout} closeLogoutModal={closeLogoutModal} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Sidebar;
