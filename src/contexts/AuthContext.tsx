
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

type User = {
  id: string;
  username: string;
};

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  signUp: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check for stored user in localStorage
    const storedUser = localStorage.getItem("safeSpacesUser");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("safeSpacesUser");
      }
    }
    setIsLoading(false);
  }, []);

  // In a real implementation, this would call your backend API
  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      // This is a mock implementation - in production, this would be an API call
      if (!username.trim() || !password.trim()) {
        toast.error("Username and password are required");
        return false;
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      const userData = { id: `user-${Date.now()}`, username };
      setUser(userData);
      localStorage.setItem("safeSpacesUser", JSON.stringify(userData));
      toast.success("Login successful");
      return true;
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      // This is a mock implementation - in production, this would be an API call
      if (!username.trim() || !password.trim()) {
        toast.error("Username and password are required");
        return false;
      }
      
      if (username.length < 3) {
        toast.error("Username must be at least 3 characters");
        return false;
      }
      
      if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return false;
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful signup
      const userData = { id: `user-${Date.now()}`, username };
      setUser(userData);
      localStorage.setItem("safeSpacesUser", JSON.stringify(userData));
      toast.success("Account created successfully");
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Signup failed. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("safeSpacesUser");
    toast.success("You've been logged out");
  };

  const value = {
    user,
    isLoading,
    login,
    signUp,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
