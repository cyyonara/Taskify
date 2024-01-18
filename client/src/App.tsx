import { Routes, Route } from "react-router-dom";
import Login from "@/pages/Login";
import SignUp from "@/pages/Signup";
import Dashboard from "@/pages/Dashboard";
import Home from "@/pages/Home";
import Protected from "./shared/Protected";

const App: React.FC = () => {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path={"/signup"} element={<SignUp />} />
      <Route element={<Protected />}>
        <Route path={"/dashboard/*"} element={<Dashboard />}>
          <Route index element={<Home />} />
          <Route path={"important"} element={<h1>Important</h1>} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
