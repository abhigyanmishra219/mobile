import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { colors, spacing, borderRadius, typography } from '@/theme';
import {
  User,
  Shield,
  HelpCircle,
  FileText,
  PhoneCall,
  ChevronRight,
  Sparkles,
} from 'lucide-react-native';

export default function ProfileScreen() {
  const [authModalVisible, setAuthModalVisible] = useState(false);

  return (
    <ScreenContainer scrollable>
      <Header
        title="My Account"
        subtitle="Manage preferences, listings, and security"
      />

      <View style={styles.content}>
        {/* Guest Profile Banner */}
        <Card variant="elevated" style={styles.profileCard}>
          <View style={styles.profileRow}>
            <View style={styles.avatarCircle}>
              <User size={36} color={colors.forestGreen} />
            </View>
            <View style={styles.profileTextColumn}>
              <View style={styles.nameRow}>
                <Text style={styles.guestName}>Guest User</Text>
                <Badge label="Not Signed In" variant="outline" />
              </View>
              <Text style={styles.guestSubtitle}>
                Sign in to post listings, book services, and manage requests.
              </Text>
            </View>
          </View>

          <Button
            title="Sign In with Google"
            variant="primary"
            size="md"
            onPress={() => setAuthModalVisible(true)}
            style={styles.signInButton}
            icon={<Sparkles size={16} color={colors.white} />}
          />
        </Card>

        {/* Section: Account Actions */}
        <Text style={styles.sectionTitle}>Account & Services</Text>

        <Card variant="outlined" style={styles.menuCard}>
          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => setAuthModalVisible(true)}
          >
            <View style={styles.menuLeft}>
              <View style={styles.menuIconBg}>
                <PhoneCall size={18} color={colors.forestGreen} />
              </View>
              <View>
                <Text style={styles.menuLabel}>Contact Preferences</Text>
                <Text style={styles.menuSubLabel}>Phone and WhatsApp visibility</Text>
              </View>
            </View>
            <ChevronRight size={18} color={colors.mutedText} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => setAuthModalVisible(true)}
          >
            <View style={styles.menuLeft}>
              <View style={styles.menuIconBg}>
                <Shield size={18} color={colors.forestGreen} />
              </View>
              <View>
                <Text style={styles.menuLabel}>Trust & Safety</Text>
                <Text style={styles.menuSubLabel}>Account verification and policies</Text>
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

          <View style={styles.divider} />

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

        {/* App Version Info */}
        <View style={styles.footerVersion}>
          <Text style={styles.versionText}>Marketplace Mobile • Version 1.0.0 (M1 Foundation)</Text>
          <Text style={styles.versionSubtext}>Expo SDK 57 • Shared Next.js Backend</Text>
        </View>
      </View>

      {/* Auth Info Modal */}
      <Modal
        visible={authModalVisible}
        onClose={() => setAuthModalVisible(false)}
        title="Google Authentication"
        description="Native Google Sign-In with hardware-backed session storage (expo-secure-store) and backend token bridge will be integrated during Milestone M2."
        cancelText="Understood"
      />
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
    marginBottom: spacing.base,
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
  profileTextColumn: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: 2,
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
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginLeft: 56,
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
});
