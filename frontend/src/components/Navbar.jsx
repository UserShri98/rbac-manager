import {Link} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";

export default function Navbar(){
  const {token,logout}= useContext(AuthContext);

  if (!token) return null; 

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex gap-6">
      <Link to="/dashboard">Dashboard</Link>
    <Link to="/tasks">Tasks</Link>
        <Link to="/profile">Profile</Link>

      <button
        onClick={logout}
        className="ml-auto text-red-400"
      >
        Logout
      </button>
    </nav>
  );
}
