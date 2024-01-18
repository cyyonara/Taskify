import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Overlay from "./Overlay";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface LogoutDialogProps {
  closeLogoutDialog: () => void;
  handleLogout: () => void;
}

const LogoutDialog: React.FC<LogoutDialogProps> = ({
  closeLogoutDialog,
  handleLogout,
}) => {
  return (
    <Overlay>
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="flex-1 max-w-[300px]"
      >
        <Card>
          <CardHeader>
            <CardTitle>Ya sure?</CardTitle>
            <CardDescription>Are you sure you want to logout?</CardDescription>
          </CardHeader>
          <CardFooter className="flex items-center gap-x-2">
            <Button onClick={handleLogout}>Logout</Button>
            <Button variant="secondary" onClick={closeLogoutDialog}>
              Cancel
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </Overlay>
  );
};

export default LogoutDialog;
