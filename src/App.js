import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./componenets/PrivateRoute";
import CowManagement from "./pages/CowManagement";
import Login from "./componenets/Login/Login";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/CowManagement" element={<CowManagement />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
