import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Signin from './components/SignIn';
import Signup from './components/SignUp';
import Dashboard from './components/Dashboard';
import RecordDetails from './components/RecordDetails';
import TopBar from './components/Topbar';
import { Navigate } from 'react-router-dom';

const App = () => {
  return (
    <RecoilRoot>
      <Router>
        <TopBar /> 
        <main className="p-4">
          <Routes>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/record/:id" element={<RecordDetails />} />
            <Route path="*" element={<Navigate to="/signin" />} />
          </Routes>
        </main>
      </Router>
    </RecoilRoot>
  );
};

export default App;
