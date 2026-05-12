import React, { createContext, useContext, useEffect, useState } from 'react';

export interface UserProfile {
  uid: string;
  email: string;
  role: 'student' | 'admin';
  displayName: string;
}

interface AuthContextType {
  user: { uid: string; email: string } | null;
  profile: UserProfile | null;
  loading: boolean;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  registerWithEmail: (email: string, pass: string, name: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY_AUTH = 'dream_migrator_auth';
const ADMIN_EMAIL = 'myskilluniversity@gmail.com';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY_AUTH);
    if (stored) {
      setProfile(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const loginWithEmail = async (email: string, _pass: string) => {
    // Mock login with email
    const mockProfile: UserProfile = {
      uid: 'email-user-id',
      email: email,
      displayName: email.split('@')[0],
      role: email === ADMIN_EMAIL ? 'admin' : 'student'
    };
    saveAuth(mockProfile);
  };

  const registerWithEmail = async (email: string, _pass: string, name: string) => {
    const mockProfile: UserProfile = {
      uid: 'email-user-id',
      email: email,
      displayName: name,
      role: email === ADMIN_EMAIL ? 'admin' : 'student'
    };
    saveAuth(mockProfile);
  };

  const saveAuth = (profile: UserProfile) => {
    setProfile(profile);
    localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(profile));
  };

  const resetPassword = async (_email: string) => {
    console.log("Mock password reset sent");
  };

  const logout = async () => {
    setProfile(null);
    localStorage.removeItem(STORAGE_KEY_AUTH);
  };

  return (
    <AuthContext.Provider value={{ 
      user: profile ? { uid: profile.uid, email: profile.email } : null, 
      profile, 
      loading, 
      loginWithEmail, 
      registerWithEmail, 
      resetPassword, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
