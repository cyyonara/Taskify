import { Routes, Route } from 'react-router-dom';
import Login from '@/pages/Login';
import SignUp from '@/pages/Signup';
import RootLayout from '@/providers/RootLayout';
import AllTasks from '@/pages/AllTasks';
import Protected from '@/providers/Protected';
import CompletedTasks from '@/pages/CompletedTasks';
import ImportantTasks from '@/pages/ImportantTasks';
import Settings from '@/pages/Settings';

const App: React.FC = () => {
   return (
      <Routes>
         <Route index element={<Login />} />
         <Route path='/signup' element={<SignUp />} />
         <Route element={<Protected />}>
            <Route path='/dashboard' element={<RootLayout />}>
               <Route index element={<AllTasks />} />
               <Route path='completed' element={<CompletedTasks />} />
               <Route path='important' element={<ImportantTasks />} />
               <Route path='settings' element={<Settings />} />
            </Route>
         </Route>
      </Routes>
   );
};

export default App;
