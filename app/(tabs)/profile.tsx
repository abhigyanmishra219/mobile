import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { colors, spacing, borderRadius, typography } from '@/theme';
import { useAuth } from '@/features/auth/AuthContext';
import {
  User as UserIcon,
  Shield,
  HelpCircle,
  FileText,
  PhoneCall,
  LogOut,
  ChevronRight,
  Sparkles,
  MessageSquare,
  CheckCircle2,
} from 'lucide-react-native';

export default function ProfileScreen() {
  const { user, isAuthenticated, signOut, refreshProfile } = useAuth();
  const [signOutModalVisible, setSignOutModalVisible] = useState(false);
  const [preferencesModalVisible, setPreferencesModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshProfile();
    setRefreshing(false);
  };

  const handleConfirmSignOut = async () => {
    setSignOutModalVisible(false);
    await signOut();
  };

  return (
    <ScreenContainer scrollable refreshing={refreshing} onRefresh={handleRefresh}>
      <Header
        title="My Account"
        subtitle="Manage preferences, listings, and security"
      />

      <View style={styles.content}>
        {isAuthenticated && user ? (
          /* Authenticated User Card */
          <Card variant="elevated" style={styles.profileCard}>
            <View style={styles.profileRow}>
              {user.image ? (
                <Image source={{ uri: user.image }} style={styles.avatarImage} />
              ) : (
                <View style={styles.avatarCircle}>
                  <Text style={styles.avatarInitial}>
                    {user.name.charAt(0).toUpperCase()}
                  </Text>
                </View>
              )}
              <View style={styles.profileTextColumn}>
                <View style={styles.nameRow}>
                  <Text style={styles.userName} numberOfLines={1}>
                    {user.name}
                  </Text>
                  <Badge
                    label={user.role === 'ADMIN' ? 'Admin' : 'Verified'}
                    variant={user.role === 'ADMIN' ? 'purple' : 'success'}
                  />
                </View>
                <Text style={styles.userEmail} numberOfLines={1}>
                  {user.email}
                </Text>
                <Text style={styles.accountStatus}>Account Status: {user.status}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            {/* Quick Contact Overview */}
            <View style={styles.contactOverview}>
              <View style={styles.contactItem}>
                <PhoneCall size={14} color={colors.forestGreen} />
                <Text style={styles.contactValue}>
                  {user.phone ? user.phone : 'No phone linked'}
                </Text>
              </View>
              <View style={styles.contactItem}>
                <MessageSquare size={14} color={colors.forestGreen} />
                <Text style={styles.contactValue}>
                  {user.whatsapp ? `WhatsApp: ${user.whatsapp}` : 'No WhatsApp linked'}
                </Text>
              </View>
            </View>
          </Card>
        ) : (
          /* Guest Profile Banner */
          <Card variant="elevated" style={styles.profileCard}>
            <View style={styles.profileRow}>
              <View style={styles.avatarCircle}>
                <UserIcon size={36} color={colors.forestGreen} />
              </View>
              <View style={styles.profileTextColumn}>
                <View style={styles.nameRow}>
                  <Text style={styles.guestName}>Guest User</Text>
                  <Badge label="Not Signed In" variant="outline" />
                </View>
                <Text style={styles.guestSubtitle}>
                  Sign in to post listings, book local services, and manage appointments.
                </Text>
              </View>
            </View>

            <Button
              title="Sign In with Google"
              variant="primary"
              size="md"
              onPress={() => router.push('/(auth)/login')}
              style={styles.signInButton}
              icon={<Sparkles size={16} color={colors.white} />}
            />
          </Card>
        )}

        {/* Section: Account Actions */}
        <Text style={styles.sectionTitle}>Account & Services</Text>

        <Card variant="outlined" style={styles.menuCard}>
          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => {
              if (isAuthenticated) {
                setPreferencesModalVisible(true);
              } else {
                router.push('/(auth)/login?redirect=/(tabs)/profile');
              }
            }}
          >
            <View style={styles.menuLeft}>
              <View style={styles.menuIconBg}>
                <PhoneCall size={18} color={colors.forestGreen} />
              </View>
              <View>
                <Text style={styles.menuLabel}>Contact Preferences</Text>
                <Text style={styles.menuSubLabel}>
                  {isAuthenticated
                    ? 'Manage phone & WhatsApp privacy settings'
                    : 'Sign in to configure contact visibility'}
                </Text>
              </View>
            </View>
            <ChevronRight size={18} color={colors.mutedText} />
          </TouchableOpacity>

          <View style={styles.dividerMenu} />

          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => {
              if (!isAuthenticated) {
                router.push('/(auth)/login?redirect=/(tabs)/profile');
              }
            }}
          >
            <View style={styles.menuLeft}>
              <View style={styles.menuIconBg}>
                <Shield size={18} color={colors.forestGreen} />
              </View>
              <View>
                <Text style={styles.menuLabel}>Trust & Verification</Text>
                <Text style={styles.menuSubLabel}>
                  {isAuthenticated
                    ? 'OAuth verified identity via Google'
                    : 'Account moderation policies'}
                </Text>
              </View>
            </View>
            <ChevronRight size={18} color={colors.mutedText} />
          </TouchableOpacity>
        </Card>

        {/* Section: Support & Information */}
        <Text style={styles.sectionTitle}>Support & About</Text>

        <Card variant="outlined" style={styles.menuCard}>
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
            <View style={styles.menuLeft}>
              <View style={[styles.menuIconBg, { backgroundColor: colors.lightPurple }]}>
                <HelpCircle size={18} color={colors.forestGreen} />
              </View>
              <View>
                <Text style={styles.menuLabel}>Help & FAQs</Text>
                <Text style={styles.menuSubLabel}>Answers to common marketplace questions</Text>
              </View>
            </View>
            <ChevronRight size={18} color={colors.mutedText} />
          </TouchableOpacity>

          <View style={styles.dividerMenu} />

          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
            <View style={styles.menuLeft}>
              <View style={[styles.menuIconBg, { backgroundColor: colors.lightPurple }]}>
                <FileText size={18} color={colors.forestGreen} />
              </View>
              <View>
                <Text style={styles.menuLabel}>Terms & Privacy Policy</Text>
                <Text style={styles.menuSubLabel}>Platform rules and privacy guidelines</Text>
              </View>
            </View>
            <ChevronRight size={18} color={colors.mutedText} />
          </TouchableOpacity>
        </Card>

        {/* Sign Out Button (for Authenticated Users) */}
        {isAuthenticated ? (
          <Button
            title="Sign Out"
            variant="outline"
            size="md"
            onPress={() => setSignOutModalVisible(true)}
            style={styles.signOutButton}
            textStyle={{ color: colors.error }}
            icon={<LogOut size={16} color={colors.error} />}
          />
        ) : null}

        {/* App Version Info */}
        <View style={styles.footerVersion}>
          <Text style={styles.versionText}>Marketplace Mobile • Version 1.0.0 (M2 Auth)</Text>
          <Text style={styles.versionSubtext}>Expo SDK 57 • Shared Next.js Backend</Text>
        </View>
      </View>

      {/* Sign Out Confirmation Modal */}
      <Modal
        visible={signOutModalVisible}
        onClose={() => setSignOutModalVisible(false)}
        title="Sign Out"
        description="Are you sure you want to sign out? Your session will be securely revoked on this device."
        confirmText="Sign Out"
        confirmVariant="danger"
        onConfirm={handleConfirmSignOut}
        cancelText="Cancel"
      />

      {/* Contact Preferences Modal */}
      <Modal
        visible={preferencesModalVisible}
        onClose={() => setPreferencesModalVisible(false)}
        title="Contact Preferences"
        description="Your phone and WhatsApp visibility preferences configure how buyers and clients reach you when revealing contacts on your listings."
        cancelText="Close"
      >
        <View style={styles.prefList}>
          <View style={styles.prefRow}>
            <CheckCircle2 size={16} color={colors.forestGreen} />
            <Text style={styles.prefText}>
              Phone Visibility: {user?.contactPreferences?.showPhone !== false ? 'Enabled' : 'Hidden'}
            </Text>
          </View>
          <View style={styles.prefRow}>
            <CheckCircle2 size={16} color={colors.forestGreen} />
            <Text style={styles.prefText}>
              WhatsApp Direct Link: {user?.contactPreferences?.showWhatsapp !== false ? 'Enabled' : 'Hidden'}
            </Text>
          </View>
        </View>
      </Modal>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.base,
  },
  profileCard: {
    padding: spacing.base,
    marginBottom: spacing.lg,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: spacing.md,
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.lightGreen,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  avatarInitial: {
    ...typography.h2,
    color: colors.forestGreen,
  },
  profileTextColumn: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: 2,
  },
  userName: {
    ...typography.h3,
    color: colors.darkText,
    flexShrink: 1,
  },
  userEmail: {
    ...typography.body2,
    color: colors.mutedText,
  },
  accountStatus: {
    ...typography.caption,
    color: colors.forestGreen,
    marginTop: 2,
    fontWeight: '600',
  },
  guestName: {
    ...typography.h3,
    color: colors.darkText,
  },
  guestSubtitle: {
    ...typography.caption,
    color: colors.mutedText,
    marginTop: 2,
  },
  signInButton: {
    width: '100%',
    marginTop: spacing.base,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: spacing.md,
  },
  contactOverview: {
    gap: spacing.xs + 2,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
  },
  contactValue: {
    ...typography.caption,
    color: colors.darkText,
  },
  sectionTitle: {
    ...typography.subtitle2,
    color: colors.mutedText,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  menuCard: {
    padding: 0,
    marginBottom: spacing.lg,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.base,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIconBg: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.lightGreen,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  menuLabel: {
    ...typography.subtitle2,
    color: colors.darkText,
  },
  menuSubLabel: {
    ...typography.caption,
    color: colors.mutedText,
    marginTop: 1,
  },
  dividerMenu: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginLeft: 56,
  },
  signOutButton: {
    borderColor: colors.error,
    marginBottom: spacing.base,
  },
  footerVersion: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  versionText: {
    ...typography.caption,
    color: colors.mutedText,
    fontWeight: '600',
  },
  versionSubtext: {
    ...typography.caption,
    color: colors.mutedText,
    marginTop: 2,
  },
  prefList: {
    gap: spacing.sm,
  },
  prefRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  prefText: {
    ...typography.body2,
    color: colors.darkText,
  },
});
