import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { colors, spacing, borderRadius, typography } from '@/theme';
import { Building, MapPin, Share2, PhoneCall } from 'lucide-react-native';

export default function ListingDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <ScreenContainer scrollable>
      <Header
        title="Listing Details"
        subtitle={`ID: ${id || 'preview'}`}
        showBack
        rightAction={
          <Button
            title=""
            variant="ghost"
            size="sm"
            onPress={() => { }}
            icon={<Share2 size={18} color={colors.forestGreen} />}
          />
        }
      />

      <View style={styles.content}>
        {/* Photo Gallery Placeholder */}
        <View style={styles.photoPlaceholder}>
          <Building size={48} color={colors.forestGreen} />
          <Text style={styles.photoPlaceholderText}>Photo Gallery Preview</Text>
          <Badge label="12 Photos Supported" variant="primary" style={styles.photoBadge} />
        </View>

        {/* Overview Card */}
        <Card variant="elevated" style={styles.detailsCard}>
          <View style={styles.headerRow}>
            <Badge label="Verified Listing" variant="success" />
            <Text style={styles.priceText}>Price On Request</Text>
          </View>

          <Text style={styles.listingTitle}>Marketplace Listing Preview</Text>

          <View style={styles.locationRow}>
            <MapPin size={16} color={colors.mutedText} />
            <Text style={styles.locationText}>Central Locality, Metropolis</Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionHeading}>Description</Text>
          <Text style={styles.descriptionText}>
            This listing screen is part of the foundation architecture. Live data from
            `/api/v1/listings/${id || ':id'}`, photo carousels, full specifications, and
            WhatsApp contact reveal will be integrated in Milestone M5.
          </Text>

          <View style={styles.actionRow}>
            <Button
              title="Reveal Contact"
              variant="primary"
              size="lg"
              onPress={() => router.back()}
              icon={<PhoneCall size={18} color={colors.white} />}
              style={styles.actionButton}
            />
          </View>
        </Card>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.base,
  },
  photoPlaceholder: {
    height: 220,
    backgroundColor: colors.lightGreen,
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.base,
    borderWidth: 1,
    borderColor: colors.border,
  },
  photoPlaceholderText: {
    ...typography.subtitle1,
    color: colors.forestGreen,
    marginTop: spacing.sm,
  },
  photoBadge: {
    marginTop: spacing.xs,
  },
  detailsCard: {
    padding: spacing.lg,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  priceText: {
    ...typography.h3,
    color: colors.forestGreen,
  },
  listingTitle: {
    ...typography.h2,
    color: colors.darkText,
    marginBottom: spacing.xs,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.base,
  },
  locationText: {
    ...typography.body2,
    color: colors.mutedText,
    marginLeft: 4,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: spacing.base,
  },
  sectionHeading: {
    ...typography.subtitle1,
    color: colors.darkText,
    marginBottom: spacing.xs,
  },
  descriptionText: {
    ...typography.body1,
    color: colors.mutedText,
    lineHeight: 22,
    marginBottom: spacing.xl,
  },
  actionRow: {
    marginTop: spacing.sm,
  },
  actionButton: {
    width: '100%',
  },
});
