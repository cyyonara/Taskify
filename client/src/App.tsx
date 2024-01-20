import { Routes, Route } from "react-router-dom";
import Login from "@/pages/Login";
import SignUp from "@/pages/Signup";
import Dashboard from "@/pages/Dashboard";
import AllTasks from "@/pages/AllTasks";
import Protected from "@/providers/Protected";
import Completed from "@/pages/Completed";
import Important from "@/pages/Important";
import Settings from "@/components/Settings";

const App: React.FC = () => {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route element={<Protected />}>
        <Route path="/dashboard/*" element={<Dashboard />}>
          <Route index element={<AllTasks />} />
          <Route path="completed" element={<Completed />} />
          <Route path="important" element={<Important />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
