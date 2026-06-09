import React, { createContext, useContext, useEffect, useState } from 'react';

export interface UserProfile {
  uid: string;
  email: string;
  role: 'student' | 'admin' | 'crm' | 'seo';
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
const STORAGE_KEY_USERS = 'dream_migrator_registered_users';
const ADMIN_EMAIL = 'myskilluniversity@gmail.com';

const DEFAULT_STAFF = [
  { uid: 'admin-master', email: 'myskilluniversity@gmail.com', name: 'Master Admin', role: 'admin' },
  { uid: 'staff-crm-1', email: 'crm_specialist@dream.com', name: 'CRM Specialist', role: 'crm' },
  { uid: 'staff-seo-1', email: 'seo_editor@dream.com', name: 'SEO Content Creator', role: 'seo' }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Seed initial staff users if not present
    const usersStore = localStorage.getItem(STORAGE_KEY_USERS);
    if (!usersStore) {
      localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(DEFAULT_STAFF));
    }

    const stored = localStorage.getItem(STORAGE_KEY_AUTH);
    if (stored) {
      setProfile(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const loginWithEmail = async (email: string, _pass: string) => {
    const usersStore = localStorage.getItem(STORAGE_KEY_USERS);
    const users = usersStore ? JSON.parse(usersStore) : DEFAULT_STAFF;
    
    // Find the staff account or user
    const matched = users.find((u: any) => u.email.toLowerCase() === email.trim().toLowerCase());

    let mockProfile: UserProfile;
    if (matched) {
      mockProfile = {
        uid: matched.uid || 'id-' + Math.random().toString(36).substr(2, 9),
        email: matched.email,
        displayName: matched.name || matched.displayName,
        role: matched.role
      };
    } else {
      mockProfile = {
        uid: 'user-uid-' + Math.random().toString(36).substr(2, 9),
        email: email,
        displayName: email.split('@')[0],
        role: email === ADMIN_EMAIL ? 'admin' : 'student'
      };
    }
    
    saveAuth(mockProfile);
  };

  const registerWithEmail = async (email: string, _pass: string, name: string) => {
    const usersStore = localStorage.getItem(STORAGE_KEY_USERS);
    const users = usersStore ? JSON.parse(usersStore) : [...DEFAULT_STAFF];
    
    const role = email.toLowerCase() === ADMIN_EMAIL.toLowerCase() ? 'admin' : 'student';
    const newUid = 'user-uid-' + Math.random().toString(36).substr(2, 9);
    
    // Add to local registered users list if new
    if (!users.some((u: any) => u.email.toLowerCase() === email.toLowerCase())) {
      users.push({
        uid: newUid,
        email: email,
        name: name,
        role: role
      });
      localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
    }

    const mockProfile: UserProfile = {
      uid: newUid,
      email: email,
      displayName: name,
      role: role
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
