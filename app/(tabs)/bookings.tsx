import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/feedback/EmptyState';
import { colors, spacing, borderRadius, typography } from '@/theme';
import { Calendar, UserCheck, Briefcase } from 'lucide-react-native';

export default function BookingsScreen() {
  const [roleMode, setRoleMode] = useState<'customer' | 'provider'>('customer');

  return (
    <ScreenContainer scrollable>
      <Header
        title="My Bookings"
        subtitle="Track appointment requests & local service visits"
      />

      <View style={styles.content}>
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
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.base,
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
