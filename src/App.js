import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./componenets/PrivateRoute";
import CowManagement from "./pages/CowManagement";
import Login from "./componenets/Login/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthProvider>
      <ToastContainer theme="colored" position="top-center" autoClose={3000} />
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
