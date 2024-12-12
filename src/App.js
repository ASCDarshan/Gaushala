import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./contexts/AuthContext";
// import PrivateRoute from "./componenets/PrivateRoute";
import Login from "./componenets/Login/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddCowDetails from "./componenets/AddCow/AddCowDetails/AddCowDetails";
import CowDetail from "./componenets/AddCow/CowDetail";

function App() {
  return (
    <AuthProvider>
      <ToastContainer theme="colored" position="top-center" autoClose={3000} />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cowDetails/:cowId" element={<CowDetail />} />
          <Route path="/addCowDetails/:cowId" element={<AddCowDetails />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
