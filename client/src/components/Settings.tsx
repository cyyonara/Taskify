import Profile from "@/components/Profile";
import { useEffect } from "react";

const Settings: React.FC = () => {
  useEffect(() => {
    document.title = "Settings";
  }, []);

  return (
    <main className="mt-8 flex flex-col">
      <Profile />
    </main>
  );
};

export default Settings;
