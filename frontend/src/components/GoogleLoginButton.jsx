import React, { useContext } from "react";
import { GoogleLogin } from "@react-oauth/google";
import api from "@/api";
import { ACCESS_TOKEN, REFRESH_TOKEN, USER } from "@/constants";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { toaster } from "./ui/toaster";

export default function GoogleLoginButton() {
  const navigate = useNavigate();
  const { setAuthenticated } = useContext(AuthContext);

  const handleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;

    try {
      const res = await api.post("auth/google/", {
        token: token,
      });

      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
      localStorage.setItem(USER, res.data.user?.email);

      setAuthenticated(true);

      toaster.create({
        title: "Login Successful",
        description: "Successfully logged in with Google",
        type: "success",
      });

      navigate("/logged");
    } catch (error) {
      console.error(error);

      toaster.create({
        title: "Login Failed",
        description: "Google login was unsuccessful. Please try again.",
        type: "error",
        closable: true,
        duration: Infinity,
      });
    }
  };
  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => {
        toaster.create({
          title: "Login Failed",
          description: "Google login was unsuccessful. Please try again.",
          type: "error",
          closable: true,
          duration: Infinity,
        });
      }}
    />
  );
}
