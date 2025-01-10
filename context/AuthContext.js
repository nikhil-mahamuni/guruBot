"use client";

import { auth } from "@/utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

// Create Context
const AuthContext = createContext(null);

// Context Provider
export default function AuthContextProvider({ children }) {
  const [globalUserData, setGlobalUserData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setGlobalUserData(currentUser);
        setLoading(false);
      },
      (error) => {
        console.log("Error in onAuthStateChanged:", error);
        setLoading(false);
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        setLoading,
        setGlobalUserData,
        globalUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook
export function useAuthContext() {
  return useContext(AuthContext);
}
