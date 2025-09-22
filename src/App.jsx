import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


import LoginForm from './components/LoginForm'
import Dashboard from './components/Dashboard'
import { useAuth } from './contexts/authContext';
import AddAgent from './components/AddAgent'
import GetDistributedItems from './components/GetDistributedItems';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/" element={<LoginForm />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
        />

        <Route
          path="/createAgent"
          element={isAuthenticated ? <AddAgent /> : <Navigate to="/" />}
        />

        <Route
          path="/distributed-items"
          element={isAuthenticated ? <GetDistributedItems /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
