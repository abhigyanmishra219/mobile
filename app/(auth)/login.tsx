import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { colors, spacing, borderRadius, typography } from '@/theme';
import { useAuth } from '@/features/auth/AuthContext';
import { ShieldCheck, Sparkles, AlertCircle, ArrowRight } from 'lucide-react-native';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const { redirect: redirectParam } = useLocalSearchParams<{ redirect?: string }>();
  const { signInWithGoogleIdToken, isLoading, error: authError, clearError } = useAuth();
  const [localError, setLocalError] = useState<string | null>(null);

  // Configure Expo Google Auth Request
  const [request, , promptAsync] = Google.useIdTokenAuthRequest({
    clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID || 'marketplace-mobile.apps.googleusercontent.com',
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  });

  /**
   * Validates target redirect to prevent open-redirect attacks.
   */
  const handleSafeRedirect = useCallback(() => {
    if (redirectParam && typeof redirectParam === 'string') {
      const trimmed = redirectParam.trim();
      // Ensure target is relative internal path
      if (
        trimmed.startsWith('/') &&
        !trimmed.startsWith('//') &&
        !trimmed.startsWith('/\\') &&
        !trimmed.includes('javascript:')
      ) {
        router.replace(trimmed as unknown as Parameters<typeof router.replace>[0]);
        return;
      }
    }
    router.replace('/(tabs)/profile');
  }, [redirectParam]);

  const handleGooglePress = async () => {
    setLocalError(null);
    clearError();
    try {
      const result = await promptAsync();
      if (result.type === 'success') {
        const { id_token } = result.params;
        if (id_token) {
          const success = await signInWithGoogleIdToken(id_token);
          if (success) {
            handleSafeRedirect();
          }
        }
      } else if (result.type === 'cancel' || result.type === 'dismiss') {
        setLocalError('Sign-in was cancelled. You can retry whenever you are ready.');
      } else if (result.type === 'error') {
        setLocalError(
          result.error?.message || 'Google authorization encountered an error. Please try again.'
        );
      }
    } catch (err: unknown) {
      setLocalError(
        err instanceof Error ? err.message : 'Unable to initiate Google sign-in. Check your connection.'
      );
    }
  };

  const activeError = localError || authError;

  return (
    <ScreenContainer scrollable withTopInset={false}>
      <Header
        title="Sign In"
        subtitle="Marketplace Account"
        showBack
        onBack={() => router.back()}
      />

      <View style={styles.content}>
        {/* Brand Banner */}
        <View style={styles.brandContainer}>
          <View style={styles.logoBadge}>
            <Sparkles size={28} color={colors.forestGreen} />
          </View>
          <Text style={styles.brandTitle}>Welcome to Marketplace</Text>
          <Text style={styles.brandSubtitle}>
            Sign in with your Google account to post verified listings, request local services, and manage appointments.
          </Text>
        </View>

        {/* Benefits Card */}
        <Card variant="flat" style={styles.benefitsCard}>
          <View style={styles.benefitRow}>
            <ShieldCheck size={18} color={colors.forestGreen} />
            <Text style={styles.benefitText}>Direct inquiries with verified owners & clients</Text>
          </View>
          <View style={styles.benefitRow}>
            <ShieldCheck size={18} color={colors.forestGreen} />
            <Text style={styles.benefitText}>Single account synced between web and mobile</Text>
          </View>
          <View style={styles.benefitRow}>
            <ShieldCheck size={18} color={colors.forestGreen} />
            <Text style={styles.benefitText}>Hardware-backed session security</Text>
          </View>
        </Card>

        {/* Error Notification */}
        {activeError ? (
          <View style={styles.errorBox}>
            <AlertCircle size={18} color={colors.error} />
            <Text style={styles.errorText}>{activeError}</Text>
          </View>
        ) : null}

        {/* Action Button: Google Sign-in */}
        <View style={styles.actionContainer}>
          <Button
            title={isLoading ? 'Signing In...' : 'Continue with Google'}
            variant="primary"
            size="lg"
            onPress={handleGooglePress}
            loading={isLoading}
            disabled={!request || isLoading}
            style={styles.googleButton}
            icon={<Sparkles size={18} color={colors.white} />}
          />

          <TouchableOpacity
            style={styles.guestLink}
            activeOpacity={0.7}
            onPress={() => router.back()}
          >
            <Text style={styles.guestLinkText}>Continue browsing as guest</Text>
            <ArrowRight size={14} color={colors.forestGreen} />
          </TouchableOpacity>
        </View>

        {/* Trust & Privacy Notice */}
        <View style={styles.footerNotice}>
          <Text style={styles.footerNoticeText}>
            By signing in, you agree to the Marketplace Terms of Service and Privacy Policy.
            We will never post anything without your permission.
          </Text>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.base,
    flex: 1,
    justifyContent: 'center',
  },
  brandContainer: {
    alignItems: 'center',
    marginVertical: spacing.xl,
  },
  logoBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.lightGreen,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.base,
  },
  brandTitle: {
    ...typography.h1,
    color: colors.forestGreen,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  brandSubtitle: {
    ...typography.body2,
    color: colors.mutedText,
    textAlign: 'center',
    maxWidth: 320,
    lineHeight: 20,
  },
  benefitsCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderLight,
    padding: spacing.base,
    marginBottom: spacing.xl,
    gap: spacing.sm + 2,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  benefitText: {
    ...typography.body2,
    color: colors.darkText,
    flex: 1,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.errorLight,
    borderWidth: 1,
    borderColor: colors.error,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  errorText: {
    ...typography.caption,
    color: colors.error,
    flex: 1,
  },
  actionContainer: {
    gap: spacing.base,
    marginBottom: spacing.xl,
  },
  googleButton: {
    width: '100%',
    paddingVertical: spacing.md,
  },
  guestLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    gap: spacing.xs,
  },
  guestLinkText: {
    ...typography.subtitle2,
    color: colors.forestGreen,
  },
  footerNotice: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  footerNoticeText: {
    ...typography.caption,
    color: colors.mutedText,
    textAlign: 'center',
    lineHeight: 16,
  },
});
