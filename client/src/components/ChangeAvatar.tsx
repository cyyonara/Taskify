import { Camera } from "lucide-react";
import { useAuth } from "@/state/useAuth";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ChangeAvatarModal from "@/components/ChangeAvatarModal";

const ChangeAvatar: React.FC = () => {
  const [showChangeAvatarModal, setShowChangeAvatarModal] = useState<boolean>(false);
  const { user } = useAuth();

  return (
    <>
      <AnimatePresence>
        {showChangeAvatarModal && (
          <ChangeAvatarModal closeModal={() => setShowChangeAvatarModal(false)} />
        )}
      </AnimatePresence>
      <div
        onClick={() => setShowChangeAvatarModal(true)}
        className="h-[180px] flex w-[180px] cursor-pointer relative rounded-full border-2 border-primary"
      >
        <img
          src={user?.avatar}
          alt={user?.username}
          className="rounded-full object-cover object-center"
        />
        <span className="bg-white text-primary right-[8%] duration-150 hover:scale-105 bottom-[2%] p-2 rounded-full absolute">
          <Camera size={20} />
        </span>
      </div>
    </>
  );
};

export default ChangeAvatar;
