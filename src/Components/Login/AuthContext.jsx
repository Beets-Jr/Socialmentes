import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../../Database/FirebaseConfig.mjs";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

// Criando o contexto
const AuthContext = createContext();

// Criando o provedor
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Inicializado como null
  const [user, setUser] = useState(null);
  const [signInWithEmailAndPassword, , loading, error] =
    useSignInWithEmailAndPassword(auth);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const signInWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      setIsAuthenticated(true);
      console.log("Successfully signed in with Facebook.");
    } catch (error) {
      console.error("Error signing in with Facebook: ", error);
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      setIsAuthenticated(true);
      console.log("Successfully signed in with Google.");
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    }
  };

  const signInWithEmail = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(email, password);
      setUser(result.user);
      setIsAuthenticated(true);
      console.log("Successfully signed in with email and password.");
    } catch (error) {
      console.error("Error signing in with email and password: ", error);
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      setIsAuthenticated(false);
      console.log("Successfully logged out.");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        signInWithFacebook,
        signInWithGoogle,
        signInWithEmail,
        logout,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useAuth = () => useContext(AuthContext);
