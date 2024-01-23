import { motion } from "framer-motion";
import { useEffect } from "react";

interface OverlayProps {
  children: React.ReactNode;
}

const Overlay: React.FC<OverlayProps> = ({ children }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-black/70 z-50 fixed inset-0 flex items-center justify-center p-4"
    >
      {children}
    </motion.div>
  );
};

export default Overlay;
