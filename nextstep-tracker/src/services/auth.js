import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

const API_URL = process.env.REACT_APP_API_URL;

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: localStorage.getItem("token") || null,
    isAdmin: localStorage.getItem("isAdmin") === "true" || false,
  });

  const [userVerified, setUserVerified] = useState(
    JSON.parse(localStorage.getItem("userVerified")) || false
  );

  const loginUser = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, data);
      console.log(response.data);

      const { token, isAdmin } = response.data;

      if (token) {
        setAuthState({ token, isAdmin });
        localStorage.setItem("token", token);
        localStorage.setItem("isAdmin", isAdmin);
        localStorage.setItem("userVerified", userVerified);
      }

      return { token, isAdmin };
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };

  const signupUser = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, data);
      console.log(response.data);
      const { token } = response.data;

      if (token) {
        setAuthState({ token, isAdmin: false });
        localStorage.setItem("token", token);
        localStorage.setItem("userVerified", userVerified);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      throw error;
    }
  };

  const verifyOtp = async (OTP) => {
    try {
      const token = authState.token;
      const response = await axios.post(
        `${API_URL}/auth/verify-otp`,
        { OTP },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //console.log("verify OTP Res", response.data.userVerified);

      if (response.data.userVerified) {
        setUserVerified(true);
        //console.log("OTP verified successfully");
      } else {
        setUserVerified(false);
        console.error("OTP verification failed");
      }

      return response.data.userVerified;
    } catch (error) {
      console.error("Error during OTP verification:", error);
      throw error;
    }
  };

  const reSendOtp = async () => {
    const token = authState.token;
    try {
      const response = await axios.get(`${API_URL}/auth/send-otp`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      
    } catch (error) {
        console.log("Enable to resend OTP", error);
        
    }
  };

  const logoutUser = () => {
    setAuthState({ token: null, isAdmin: false });
    // localStorage.removeItem("token");
    // localStorage.removeItem("isAdmin");
    setUserVerified(false);
    localStorage.clear();
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    localStorage.setItem("userVerified", userVerified);

    if (token) {
      setAuthState({ token, isAdmin });
    }
  }, [userVerified]);

  const value = {
    authState,
    loginUser,
    signupUser,
    logoutUser,
    userVerified,
    setUserVerified,
    verifyOtp,
    reSendOtp
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
