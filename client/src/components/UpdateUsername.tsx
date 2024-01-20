import { PenSquare } from "lucide-react";
import { useAuth } from "@/state/useAuth";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import EditUsernameModal from "@/components/EditUsernameModal";

const UpdateUsername: React.FC = () => {
  const { user } = useAuth();
  const [showEditUsernameModal, setShowEditUsernameModal] = useState<boolean>(false);

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
        <button onClick={() => setShowEditUsernameModal(true)} className="text-primary">
          <PenSquare size={16} />
        </button>
      </div>
    </>
  );
};

export default UpdateUsername;
