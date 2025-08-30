"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { auth } from "@/lib/firebase";
import { User, onAuthStateChanged, signOut } from "firebase/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true, logout: async () => {} });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, loading, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
