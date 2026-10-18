import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { colors, spacing, borderRadius, typography } from '@/theme';
import { Building, Wrench, ShieldCheck, CheckCircle2 } from 'lucide-react-native';

export default function ListTabScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState<'property' | 'service'>('property');

  const openIntroModal = (type: 'property' | 'service') => {
    setSelectedType(type);
    setModalVisible(true);
  };

  return (
    <ScreenContainer scrollable>
      <Header
        title="Post a Listing"
        subtitle="Reach verified tenants, buyers, and local customers"
      />

      <View style={styles.content}>
        {/* Intro Highlight Banner */}
        <Card variant="flat" style={styles.introCard}>
          <View style={styles.badgeRow}>
            <Badge label="Marketplace Direct" variant="primary" />
            <Badge label="Zero Brokerage" variant="purple" />
          </View>
          <Text style={styles.introHeading}>What would you like to list today?</Text>
          <Text style={styles.introDesc}>
            Connect with genuine customers across your city. All listings are reviewed for trust and safety.
          </Text>
        </Card>

        {/* Option 1: List a Property */}
        <Card
          variant="elevated"
          style={styles.optionCard}
          onPress={() => openIntroModal('property')}
        >
          <View style={styles.optionHeader}>
            <View style={styles.iconCircle}>
              <Building size={24} color={colors.forestGreen} />
            </View>
            <View style={styles.optionTextColumn}>
              <Text style={styles.optionTitle}>List a Property</Text>
              <Text style={styles.optionDesc}>
                Apartments, houses, villas, or commercial spaces for rent or sale.
              </Text>
            </View>
          </View>
          <View style={styles.benefitList}>
            <View style={styles.benefitRow}>
              <CheckCircle2 size={15} color={colors.forestGreen} />
              <Text style={styles.benefitText}>Direct WhatsApp inquiries with no middlemen</Text>
            </View>
            <View style={styles.benefitRow}>
              <CheckCircle2 size={15} color={colors.forestGreen} />
              <Text style={styles.benefitText}>Up to 12 high-resolution photos with secure upload</Text>
            </View>
          </View>
          <Button
            title="List Property"
            variant="primary"
            size="md"
            onPress={() => openIntroModal('property')}
            style={styles.cardButton}
          />
        </Card>

        {/* Option 2: List a Local Service */}
        <Card
          variant="elevated"
          style={styles.optionCard}
          onPress={() => openIntroModal('service')}
        >
          <View style={styles.optionHeader}>
            <View style={[styles.iconCircle, { backgroundColor: colors.lightPurple }]}>
              <Wrench size={24} color={colors.forestGreen} />
            </View>
            <View style={styles.optionTextColumn}>
              <Text style={styles.optionTitle}>Offer a Service</Text>
              <Text style={styles.optionDesc}>
                Plumbing, electrical, cleaning, carpentry, and home improvement.
              </Text>
            </View>
          </View>
          <View style={styles.benefitList}>
            <View style={styles.benefitRow}>
              <CheckCircle2 size={15} color={colors.forestGreen} />
              <Text style={styles.benefitText}>Receive customer booking requests directly</Text>
            </View>
            <View style={styles.benefitRow}>
              <CheckCircle2 size={15} color={colors.forestGreen} />
              <Text style={styles.benefitText}>Set your service areas, operating hours, and rates</Text>
            </View>
          </View>
          <Button
            title="Offer Service"
            variant="secondary"
            size="md"
            onPress={() => openIntroModal('service')}
            style={styles.cardButton}
          />
        </Card>

        {/* Trust Note */}
        <View style={styles.trustFooter}>
          <ShieldCheck size={16} color={colors.mutedText} />
          <Text style={styles.trustFooterText}>
            Full listing creation wizard and photo picker will be enabled in Milestone M6.
          </Text>
        </View>
      </View>

      {/* Info Modal */}
      <Modal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={selectedType === 'property' ? 'Property Listing Flow' : 'Service Listing Flow'}
        description={`The complete multi-step creation wizard for ${
          selectedType === 'property' ? 'properties' : 'local services'
        } (including camera/gallery photo upload and moderation submission) will be activated in Milestone M6.`}
        cancelText="Got it"
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.base,
  },
  introCard: {
    backgroundColor: colors.lightGreen,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  introHeading: {
    ...typography.h3,
    color: colors.forestGreen,
    marginBottom: spacing.xs,
  },
  introDesc: {
    ...typography.body2,
    color: colors.darkText,
  },
  optionCard: {
    marginBottom: spacing.base,
    padding: spacing.base,
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: colors.lightGreen,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  optionTextColumn: {
    flex: 1,
  },
  optionTitle: {
    ...typography.h3,
    color: colors.darkText,
    marginBottom: 2,
  },
  optionDesc: {
    ...typography.body2,
    color: colors.mutedText,
  },
  benefitList: {
    marginBottom: spacing.base,
    gap: spacing.xs + 2,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  benefitText: {
    ...typography.caption,
    color: colors.darkText,
    flex: 1,
  },
  cardButton: {
    width: '100%',
  },
  trustFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.lg,
  },
  trustFooterText: {
    ...typography.caption,
    color: colors.mutedText,
    textAlign: 'center',
    maxWidth: 300,
  },
});
