import { apiClient } from './client';
import { AuthSessionData, User, ContactPreferences } from '@/types/auth';

export const authApi = {
  /**
   * Exchanges a verified Google ID Token for a backend database session token.
   */
  loginWithGoogleIdToken: async (idToken: string): Promise<AuthSessionData> => {
    const response = await apiClient.post<AuthSessionData>('/api/v1/auth/mobile/google', {
      idToken,
    });
    return response.data;
  },

  /**
   * Immediately revokes the current session token on the backend.
   */
  signOut: async (): Promise<void> => {
    try {
      await apiClient.post<{ message: string }>('/api/v1/auth/mobile/signout');
    } catch (error) {
      // Sign-out should proceed locally even if network fails
      console.warn('[AUTH_API_SIGNOUT_WARN]', error);
    }
  },

  /**
   * Fetches the current user profile from /api/v1/users/me.
   */
  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get<User>('/api/v1/users/me');
    return response.data;
  },

  /**
   * Updates user profile fields (name, phone, whatsapp, contactPreferences).
   */
  updateProfile: async (payload: {
    name?: string;
    phone?: string | null;
    whatsapp?: string | null;
    contactPreferences?: ContactPreferences;
  }): Promise<User> => {
    const response = await apiClient.patch<User>('/api/v1/users/me', payload);
    return response.data;
  },
};
