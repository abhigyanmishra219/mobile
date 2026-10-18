import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/feedback/EmptyState';
import { colors, spacing, borderRadius, typography } from '@/theme';
import { useAuth } from '@/features/auth/AuthContext';
import { Calendar, UserCheck, Briefcase, Sparkles } from 'lucide-react-native';

export default function BookingsScreen() {
  const { isAuthenticated } = useAuth();
  const [roleMode, setRoleMode] = useState<'customer' | 'provider'>('customer');

  return (
    <ScreenContainer scrollable>
      <Header
        title="My Bookings"
        subtitle="Track appointment requests & local service visits"
      />

      <View style={styles.content}>
        {!isAuthenticated ? (
          /* Sign-In Prompt Banner for Unauthenticated Visitors */
          <Card variant="elevated" style={styles.authPromptCard}>
            <View style={styles.authPromptHeader}>
              <View style={styles.authIconCircle}>
                <Calendar size={24} color={colors.forestGreen} />
              </View>
              <View style={styles.authPromptTextColumn}>
                <Text style={styles.authPromptTitle}>Sign in to view appointments</Text>
                <Text style={styles.authPromptDesc}>
                  Track incoming requests for your services or view scheduled appointments with local professionals.
                </Text>
              </View>
            </View>
            <Button
              title="Sign In with Google"
              variant="primary"
              size="md"
              onPress={() => router.push('/(auth)/login?redirect=/(tabs)/bookings')}
              icon={<Sparkles size={16} color={colors.white} />}
              style={styles.signInBtn}
            />
          </Card>
        ) : (
          /* Authenticated Bookings View */
          <>
            {/* Role Toggle */}
            <View style={styles.roleToggle}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setRoleMode('customer')}
                style={[
                  styles.toggleTab,
                  roleMode === 'customer' && styles.toggleTabActive,
                ]}
              >
                <UserCheck
                  size={16}
                  color={roleMode === 'customer' ? colors.white : colors.forestGreen}
                />
                <Text
                  style={[
                    styles.toggleText,
                    roleMode === 'customer' && styles.toggleTextActive,
                  ]}
                >
                  As Customer
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setRoleMode('provider')}
                style={[
                  styles.toggleTab,
                  roleMode === 'provider' && styles.toggleTabActive,
                ]}
              >
                <Briefcase
                  size={16}
                  color={roleMode === 'provider' ? colors.white : colors.forestGreen}
                />
                <Text
                  style={[
                    styles.toggleText,
                    roleMode === 'provider' && styles.toggleTextActive,
                  ]}
                >
                  As Provider
                </Text>
              </TouchableOpacity>
            </View>

            {/* Informational Scope Card */}
            <Card variant="flat" style={styles.scopeCard}>
              <View style={styles.scopeHeader}>
                <Calendar size={18} color={colors.forestGreen} />
                <Text style={styles.scopeTitle}>
                  {roleMode === 'customer' ? 'Customer Appointments' : 'Provider Requests'}
                </Text>
                <Badge label="M7 Scheduled" variant="purple" />
              </View>
              <Text style={styles.scopeText}>
                {roleMode === 'customer'
                  ? 'When you schedule a plumber, electrician, or local specialist, your booking timeline, confirmations, and date proposals will appear here.'
                  : 'Skilled professionals will manage incoming booking requests, accept appointments, or propose alternative time slots from this view.'}
              </Text>
            </Card>

            {/* Empty State */}
            <EmptyState
              title={roleMode === 'customer' ? 'No Service Bookings Yet' : 'No Incoming Requests'}
              description={
                roleMode === 'customer'
                  ? 'Browse local services in the Explore tab and book an appointment with verified professionals in your city.'
                  : 'Post your skilled service in the List tab to start receiving appointment requests from local homeowners.'
              }
              icon={<Calendar size={32} color={colors.forestGreen} />}
            />
          </>
        )}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.base,
  },
  authPromptCard: {
    padding: spacing.base,
    marginBottom: spacing.base,
  },
  authPromptHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.base,
  },
  authIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.lightGreen,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  authPromptTextColumn: {
    flex: 1,
  },
  authPromptTitle: {
    ...typography.subtitle1,
    color: colors.darkText,
    marginBottom: 2,
  },
  authPromptDesc: {
    ...typography.body2,
    color: colors.mutedText,
  },
  signInBtn: {
    width: '100%',
  },
  roleToggle: {
    flexDirection: 'row',
    backgroundColor: colors.lightGreen,
    borderRadius: borderRadius.md,
    padding: spacing.xs,
    marginBottom: spacing.base,
  },
  toggleTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
    gap: spacing.xs + 2,
  },
  toggleTabActive: {
    backgroundColor: colors.forestGreen,
  },
  toggleText: {
    ...typography.subtitle2,
    color: colors.forestGreen,
  },
  toggleTextActive: {
    color: colors.white,
  },
  scopeCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.base,
  },
  scopeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
    marginBottom: spacing.xs,
  },
  scopeTitle: {
    ...typography.subtitle2,
    color: colors.forestGreen,
    flex: 1,
  },
  scopeText: {
    ...typography.body2,
    color: colors.mutedText,
  },
});
