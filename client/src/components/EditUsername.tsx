import EditUsernameModal from "@/components/EditUsernameModal";
import { PenSquare } from "lucide-react";
import { useAuth } from "@/state/useAuth";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const EditUsername: React.FC = () => {
  const [showEditUsernameModal, setShowEditUsernameModal] = useState<boolean>(false);
  const { user } = useAuth();

  return (
    <>
      <AnimatePresence>
        {showEditUsernameModal && (
          <EditUsernameModal
            username={user?.username as string}
            closeModal={() => setShowEditUsernameModal(false)}
          />
        )}
      </AnimatePresence>
      <div className="flex items-center text-muted-foreground gap-x-2">
        <span>{user?.username}</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => setShowEditUsernameModal(true)}
                className="text-primary duration-150 hover:scale-110"
              >
                <PenSquare size={16} />
              </button>
            </TooltipTrigger>
            <TooltipContent>Edit username</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  );
};

export default EditUsername;
