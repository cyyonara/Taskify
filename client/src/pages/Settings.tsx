import Profile from "@/components/Profile";
import ThemeSettings from "@/components/ThemeSettings";
import { useEffect } from "react";

const Settings: React.FC = () => {
  useEffect(() => {
    document.title = "Settings";
  }, []);

  return (
    <main className="mt-8 flex flex-col">
      <Profile />
      <ThemeSettings />
    </main>
  );
};

export default Settings;
