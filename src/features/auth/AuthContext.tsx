import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { AuthContextType, User } from '@/types/auth';
import { authApi } from '@/services/api/auth.api';
import {
  getSessionToken,
  saveSessionToken,
  deleteSessionToken,
} from '@/services/auth/tokenStorage';
import { setOnUnauthorized } from '@/services/api/client';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const handleSignOut = useCallback(async () => {
    try {
      await authApi.signOut();
    } catch {
      // Ignore network errors during sign-out
    } finally {
      await deleteSessionToken();
      setUser(null);
      setError(null);
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    try {
      const token = await getSessionToken();
      if (!token) {
        setUser(null);
        return;
      }
      const freshUser = await authApi.getCurrentUser();
      setUser(freshUser);
    } catch (err) {
      console.warn('[AUTH_REFRESH_WARN] Failed to refresh user profile:', err);
      // If unauthorized, clean up
      await deleteSessionToken();
      setUser(null);
    }
  }, []);

  // Initialize session on startup
  useEffect(() => {
    let isMounted = true;

    const bootstrapAuth = async () => {
      try {
        const token = await getSessionToken();
        if (token) {
          const profile = await authApi.getCurrentUser();
          if (isMounted) {
            setUser(profile);
          }
        }
      } catch {
        // Token was invalid or expired
        await deleteSessionToken();
        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    // Auto sign-out on 401 Unauthorized
    setOnUnauthorized(() => {
      deleteSessionToken();
      setUser(null);
    });

    bootstrapAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  const signInWithGoogleIdToken = async (idToken: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const sessionData = await authApi.loginWithGoogleIdToken(idToken);
      await saveSessionToken(sessionData.sessionToken);
      setUser(sessionData.user);
      return true;
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Google authentication failed. Please try again.';
      setError(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: Boolean(user),
        error,
        signInWithGoogleIdToken,
        signOut: handleSignOut,
        refreshProfile,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
