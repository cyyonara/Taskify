import { Button } from "@/components/ui/button";
import { LockKeyholeIcon } from "lucide-react";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ChangePasswordModal from "@/components/ChangePasswordModal";

const PasswordSetup: React.FC = () => {
  const [showChangePasswordModal, setShowChangePasswordModal] = useState<boolean>(false);

  return (
    <>
      <AnimatePresence>
        {showChangePasswordModal && (
          <ChangePasswordModal closeModal={() => setShowChangePasswordModal(false)} />
        )}
      </AnimatePresence>
      <Button
        variant="secondary"
        onClick={() => setShowChangePasswordModal(true)}
        className="flex items-center gap-x-2"
      >
        <LockKeyholeIcon size={16} />
        <span>Change Password</span>
      </Button>
    </>
  );
};

export default PasswordSetup;
