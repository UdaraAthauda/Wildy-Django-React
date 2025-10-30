import { useContext, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Layout from "./components/ui/Layout";
import Info from "./pages/Info";
import { AuthContext, AuthProvider } from "./components/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { toaster } from "./components/ui/toaster";
import WriteBlog from "./pages/WriteBlog";
import ReadBlog from "./pages/ReadBlog";

function Logout() {
  const { setAuthenticated } = useContext(AuthContext)
  localStorage.clear()
  setAuthenticated(false)

  toaster.create({
    title: "Logging Out",
    description: "Logout Successful",
    type: "info"
  })

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
            <Route path="/read" element={<ReadBlog />} />

            <Route path="/write/:id/:name" element={<ProtectedRoute><WriteBlog /></ProtectedRoute>} />
          </Routes>
        </Layout>
      </AuthProvider>
    </>
  );
}

export default App;
