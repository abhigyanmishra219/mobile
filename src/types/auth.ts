/**
 * Authentication and User Model definitions matching backend models.
 */

export interface ContactPreferences {
  showPhone: boolean;
  showWhatsapp: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role: 'USER' | 'ADMIN';
  status: 'ACTIVE' | 'SUSPENDED' | 'DELETED';
  phone?: string | null;
  whatsapp?: string | null;
  contactPreferences?: ContactPreferences;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthSessionData {
  sessionToken: string;
  expires: string;
  user: User;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  signInWithGoogleIdToken: (idToken: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  clearError: () => void;
}
