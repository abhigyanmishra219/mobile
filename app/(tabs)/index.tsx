import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SectionHeading } from '@/components/layout/SectionHeading';
import { colors, spacing, borderRadius, typography } from '@/theme';
import {
  MapPin,
  Search,
  Building,
  Wrench,
  Sparkles,
  Zap,
  Paintbrush,
  Hammer,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react-native';

const PROPERTY_CATEGORIES = [
  { id: 'APARTMENT', label: 'Apartments', icon: Building },
  { id: 'VILLA', label: 'Villas', icon: Building },
  { id: 'INDEPENDENT_HOUSE', label: 'Houses', icon: Building },
  { id: 'COMMERCIAL', label: 'Commercial', icon: Building },
];

const SERVICE_CATEGORIES = [
  { id: 'PLUMBING', label: 'Plumbing', icon: Wrench },
  { id: 'ELECTRICAL', label: 'Electrical', icon: Zap },
  { id: 'CLEANING', label: 'Cleaning', icon: Sparkles },
  { id: 'PAINTING', label: 'Painting', icon: Paintbrush },
  { id: 'CARPENTRY', label: 'Carpentry', icon: Hammer },
];

export default function HomeScreen() {
  const selectedCity = 'Metropolis';
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 800);
  };

  const navigateToExplore = (type: 'PROPERTY' | 'SERVICE', category?: string) => {
    router.push({
      pathname: '/(tabs)/explore',
      params: { type, category },
    });
  };

  return (
    <ScreenContainer scrollable refreshing={refreshing} onRefresh={onRefresh}>
      {/* Top Brand & Location Bar */}
      <View style={styles.topBar}>
        <View>
          <Text style={styles.brandTitle}>Marketplace</Text>
          <Text style={styles.brandSubtitle}>Property & Local Services</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.locationPill}
          onPress={() => {
            // Location detection/selection modal triggers in M3
          }}
          accessibilityLabel="Select city"
          accessibilityRole="button"
        >
          <MapPin size={14} color={colors.forestGreen} />
          <Text style={styles.locationText}>{selectedCity}</Text>
          <Badge label="Auto" variant="default" style={styles.locationBadge} />
        </TouchableOpacity>
      </View>

      {/* Main Search Hero Entry Point */}
      <View style={styles.sectionContainer}>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.searchHero}
          onPress={() => router.push('/(tabs)/explore')}
          accessibilityRole="search"
          accessibilityLabel="Tap to search properties or local services"
        >
          <Search size={20} color={colors.mutedText} />
          <Text style={styles.searchPlaceholder}>
            Search locality, property, or service...
          </Text>
        </TouchableOpacity>
      </View>

      {/* Vertical Selection Quick Cards */}
      <View style={[styles.sectionContainer, styles.rowCards]}>
        <Card
          variant="elevated"
          style={styles.heroActionCard}
          onPress={() => navigateToExplore('PROPERTY')}
        >
          <View style={styles.actionIconWrapper}>
            <Building size={22} color={colors.forestGreen} />
          </View>
          <Text style={styles.actionCardTitle}>Find Properties</Text>
          <Text style={styles.actionCardDesc}>Rent, buy, or shared PG stays</Text>
          <View style={styles.actionCardArrow}>
            <Text style={styles.exploreLinkText}>Explore</Text>
            <ChevronRight size={14} color={colors.forestGreen} />
          </View>
        </Card>

        <Card
          variant="elevated"
          style={styles.heroActionCard}
          onPress={() => navigateToExplore('SERVICE')}
        >
          <View style={[styles.actionIconWrapper, { backgroundColor: colors.lightPurple }]}>
            <Wrench size={22} color={colors.forestGreen} />
          </View>
          <Text style={styles.actionCardTitle}>Local Services</Text>
          <Text style={styles.actionCardDesc}>Plumbers, electricians & repair</Text>
          <View style={styles.actionCardArrow}>
            <Text style={styles.exploreLinkText}>Explore</Text>
            <ChevronRight size={14} color={colors.forestGreen} />
          </View>
        </Card>
      </View>

      {/* Property Category Shortcuts */}
      <View style={styles.sectionContainer}>
        <SectionHeading
          title="Property Categories"
          subtitle="Discover verified homes by type"
          actionText="View all"
          onActionPress={() => navigateToExplore('PROPERTY')}
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {PROPERTY_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <TouchableOpacity
                key={cat.id}
                style={styles.categoryPill}
                activeOpacity={0.75}
                onPress={() => navigateToExplore('PROPERTY', cat.id)}
              >
                <Icon size={16} color={colors.forestGreen} />
                <Text style={styles.categoryPillText}>{cat.label}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Popular Local Services Shortcuts */}
      <View style={styles.sectionContainer}>
        <SectionHeading
          title="Popular Services"
          subtitle="Skilled neighborhood professionals"
          actionText="View all"
          onActionPress={() => navigateToExplore('SERVICE')}
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {SERVICE_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <TouchableOpacity
                key={cat.id}
                style={styles.categoryPill}
                activeOpacity={0.75}
                onPress={() => navigateToExplore('SERVICE', cat.id)}
              >
                <Icon size={16} color={colors.forestGreen} />
                <Text style={styles.categoryPillText}>{cat.label}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Trust & Safety Banner */}
      <View style={styles.sectionContainer}>
        <Card variant="flat" style={styles.trustBanner}>
          <View style={styles.trustRow}>
            <View style={styles.trustIconWrapper}>
              <ShieldCheck size={24} color={colors.forestGreen} />
            </View>
            <View style={styles.trustTextColumn}>
              <Text style={styles.trustTitle}>Verified Listings Only</Text>
              <Text style={styles.trustDesc}>
                All property ads and service profiles undergo moderation before being published.
              </Text>
            </View>
          </View>
        </Card>
      </View>

      {/* Bottom Padding for Tab Bar */}
      <View style={{ height: spacing.xxl }} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.base,
    paddingTop: spacing.base,
    paddingBottom: spacing.sm,
  },
  brandTitle: {
    ...typography.h2,
    color: colors.forestGreen,
  },
  brandSubtitle: {
    ...typography.caption,
    color: colors.mutedText,
  },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.sm + 2,
    borderRadius: borderRadius.full,
  },
  locationText: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.darkText,
    marginLeft: 4,
    marginRight: 6,
  },
  locationBadge: {
    paddingVertical: 1,
    paddingHorizontal: 4,
  },
  sectionContainer: {
    paddingHorizontal: spacing.base,
    marginTop: spacing.base,
  },
  searchHero: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.base,
    height: 50,
  },
  searchPlaceholder: {
    ...typography.body2,
    color: colors.mutedText,
    marginLeft: spacing.sm,
  },
  rowCards: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  heroActionCard: {
    flex: 1,
    padding: spacing.md,
  },
  actionIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    backgroundColor: colors.lightGreen,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  actionCardTitle: {
    ...typography.subtitle1,
    color: colors.darkText,
    marginBottom: 2,
  },
  actionCardDesc: {
    ...typography.caption,
    color: colors.mutedText,
    marginBottom: spacing.sm,
    minHeight: 32,
  },
  actionCardArrow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exploreLinkText: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.forestGreen,
    marginRight: 2,
  },
  horizontalScroll: {
    marginHorizontal: -spacing.base,
    paddingHorizontal: spacing.base,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.full,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginRight: spacing.sm,
  },
  categoryPillText: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.darkText,
    marginLeft: spacing.xs + 2,
  },
  trustBanner: {
    backgroundColor: colors.lightGreen,
    borderColor: colors.border,
    borderWidth: 1,
  },
  trustRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trustIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  trustTextColumn: {
    flex: 1,
  },
  trustTitle: {
    ...typography.subtitle2,
    color: colors.forestGreen,
  },
  trustDesc: {
    ...typography.caption,
    color: colors.mutedText,
    marginTop: 2,
  },
});
