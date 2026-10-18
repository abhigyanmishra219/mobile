import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const SESSION_TOKEN_KEY = 'marketplace_session_token';

/**
 * In-memory fallback for environments where SecureStore might be unavailable (e.g. web preview)
 */
let memoryToken: string | null = null;

export async function saveSessionToken(token: string): Promise<void> {
  memoryToken = token;
  try {
    if (Platform.OS !== 'web') {
      await SecureStore.setItemAsync(SESSION_TOKEN_KEY, token, {
        keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK,
      });
    }
  } catch (error) {
    console.warn('[TOKEN_STORAGE_WARN] Failed to write token to SecureStore:', error);
  }
}

export async function getSessionToken(): Promise<string | null> {
  try {
    if (Platform.OS !== 'web') {
      const storedToken = await SecureStore.getItemAsync(SESSION_TOKEN_KEY);
      if (storedToken) {
        memoryToken = storedToken;
        return storedToken;
      }
    }
  } catch (error) {
    console.warn('[TOKEN_STORAGE_WARN] Failed to read token from SecureStore:', error);
  }
  return memoryToken;
}

export async function deleteSessionToken(): Promise<void> {
  memoryToken = null;
  try {
    if (Platform.OS !== 'web') {
      await SecureStore.deleteItemAsync(SESSION_TOKEN_KEY);
    }
  } catch (error) {
    console.warn('[TOKEN_STORAGE_WARN] Failed to remove token from SecureStore:', error);
  }
}
