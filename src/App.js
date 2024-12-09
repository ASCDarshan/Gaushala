import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './componenets/PrivateRoute';
import CowManagement from './pages/CowManagement';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/dashboard/*" 
            element={<PrivateRoute><Dashboard /></PrivateRoute>} 
          />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/CowManagement" element={<CowManagement />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;