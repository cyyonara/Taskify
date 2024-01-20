import { Camera, UserCogIcon } from "lucide-react";
import { useAuth } from "@/state/useAuth";
import UpdateUsername from "@/components/UpdateUsername";
import { Button } from "./ui/button";

const Profile: React.FC = () => {
  const { user } = useAuth();

  return (
    <section className="flex flex-col">
      <header className="flex items-center gap-x-2 mt-10 border-b pb-3">
        <UserCogIcon />
        <h4 className="text-lg">Account</h4>
      </header>
      <div className="flex flex-col items-center gap-y-8 mt-16">
        <div className="h-[180px] flex w-[180px] cursor-pointer relative rounded-full border-2 border-primary">
          <img
            src={user?.avatar}
            alt={user?.username}
            className="rounded-full bg-center"
          />
          <span className="bg-white text-primary right-[8%] duration-150 hover:scale-105 bottom-[2%] p-2 rounded-full absolute">
            <Camera size={20} />
          </span>
        </div>
        <div className="flex flex-col items-center gap-4">
          <UpdateUsername />
          <Button variant="secondary">Change Password</Button>
        </div>
      </div>
    </section>
  );
};

export default Profile;
