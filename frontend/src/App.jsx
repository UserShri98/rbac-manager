import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import PublicRoute from "./components/PublicRoute";

export default function App(){
  const {token}=useContext(AuthContext);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
      
        <Route
          path="/"
          element={
            token ?<Navigate to="/dashboard" />:<Navigate to="/login"/>
          }
        />

        <Route element={<PublicRoute />}>
                  <Route path="/register" element={<Register />}/>

          <Route path="/login" element={<Login />} />
          {/* Add other public routes like signup here */}
        </Route>
       

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />


        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile/>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
