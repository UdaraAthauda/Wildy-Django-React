import { useContext, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Layout from "./components/ui/Layout";
import Info from "./pages/Info";
import { AuthContext, AuthProvider } from "./components/AuthContext";
import Logged from "./pages/Logged";
import ProtectedRoute from "./components/ProtectedRoute";

function Logout() {
  const { setAuthenticated } = useContext(AuthContext)
  localStorage.clear()
  setAuthenticated(false)
  return <Navigate to='/' />
}

function App() {
  return (
    <>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/logout" element={<Logout />} />

            <Route path="/" element={<Home />} />
            <Route path="/info/:id" element={<Info />} />
            <Route path="/logged" element={<ProtectedRoute><Logged /></ProtectedRoute>} />
          </Routes>
        </Layout>
      </AuthProvider>
    </>
  );
}

export default App;
