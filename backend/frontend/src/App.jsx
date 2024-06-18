import React from 'react';
import Home from './Home/Home';
import Signup from './components/signup';
import Login from "./components/login";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from './context/AuthProvider';
import { Toaster } from "react-hot-toast";

const App = () => {
  const [authUser, setAuthUser] = useAuth();
  // console.log(authUser);

  return (
    <>
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={authUser ? <Navigate to="/" /> : <Signup />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
