import Sidebar from "@/components/Sidebar";
import AddTaskDialog from "@/components/AddTaskModal";
import LogoutDialog from "@/components/LogoutModal";
import { NavLink, Outlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import {
  Plus,
  TableProperties,
  Shell,
  CheckCircle,
  Settings,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/state/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { navLinks } from "@/components/Sidebar";
import { useState } from "react";
import { useLogout } from "@/hooks/useLogout";
import { useToast } from "@/components/ui/use-toast";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
} from "@/components/ui/tooltip";

interface PageIcon {
  pageName: string;
  icon: React.JSX.Element;
}

const pageIcons: PageIcon[] = [
  { pageName: "all tasks", icon: <TableProperties /> },
  { pageName: "completed", icon: <CheckCircle /> },
  { pageName: "important", icon: <Shell /> },
  { pageName: "settings", icon: <Settings /> },
];

const RootLayout: React.FC = () => {
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState<boolean>(false);
  const { mutate } = useLogout();
  const { user, clearCredentials } = useAuth();
  const { toast } = useToast();
  const location = useLocation();
  const paths = location.pathname.split("/");
  const currentPage = paths.length === 2 ? "all Tasks" : paths[paths.length - 1];
  const avatarFallbackLabel = user?.username.substring(0, 2).toUpperCase();

  const getPageIcon = (currentPage: string): React.JSX.Element => {
    const pageIcon: PageIcon | undefined = pageIcons.find(
      ({ pageName }) => pageName === currentPage.toLowerCase()
    );

    return pageIcon ? <>{pageIcon.icon}</> : <></>;
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
    <div className="h-screen flex p-1 sm:p-4 gap-x-4">
      <Sidebar />
      <AnimatePresence>
        {showAddTaskModal && (
          <AddTaskDialog closeModal={() => setShowAddTaskModal(false)} />
        )}
      </AnimatePresence>
      <div className="flex-1 flex-col p-4 sm:p-6 md:border rounded-lg">
        {showLogoutModal && (
          <LogoutDialog
            handleLogout={handleLogout}
            closeLogoutModal={() => setShowLogoutModal(false)}
          />
        )}
        <header className="flex items-center justify-between">
          <div className="flex gap-3 items-center">
            {getPageIcon(currentPage)}
            <h2 className="capitalize text-2xl md:text-3xl font-bold">{currentPage}</h2>
          </div>
          <div className="flex items-center gap-x-2">
            {!location.pathname.includes("settings") && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setShowAddTaskModal(true)}
                      className="text-primary p-2 rounded-md bg-accent duration-150"
                    >
                      <Plus size={20} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Add task</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage
                      src={user?.avatar}
                      className="object-center object-cover"
                    />
                    <AvatarFallback>{avatarFallbackLabel}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mr-5 sm:mr-9 mt-1 dropdown md:hidden">
                  <DropdownMenuLabel>Menu</DropdownMenuLabel>
                  {navLinks.map(({ label, path, end, icon }) => (
                    <DropdownMenuItem key={label}>
                      <NavLink end={end} to={path} className="flex items-center gap-x-2">
                        {icon}
                        <span>{label}</span>
                      </NavLink>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <button
                      onClick={() => setShowLogoutModal(true)}
                      className="flex items-center gap-x-2"
                    >
                      <LogOut size={18} />
                      <span>Logout</span>
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
