import { UserCogIcon } from "lucide-react";
import UpdateUsername from "@/components/EditUsername";
import ChangeAvatar from "@/components/ChangeAvatar";
import PasswordSetup from "./PasswordSetup";

const Profile: React.FC = () => {
  return (
    <section className="flex flex-col">
      <header className="flex items-center gap-x-2 mt-10 border-b pb-3">
        <UserCogIcon />
        <h4 className="text-lg">Account</h4>
      </header>
      <div className="flex flex-col items-center gap-y-8 mt-16">
        <ChangeAvatar />
        <div className="flex flex-col items-center gap-4">
          <UpdateUsername />
          <PasswordSetup />
        </div>
      </div>
    </section>
  );
};

export default Profile;
