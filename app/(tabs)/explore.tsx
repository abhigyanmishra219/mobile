import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { Header } from '@/components/layout/Header';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/feedback/EmptyState';
import { Card } from '@/components/ui/Card';
import { colors, spacing, borderRadius, typography } from '@/theme';
import { Search, SlidersHorizontal, Compass, Building, Wrench } from 'lucide-react-native';

const PROPERTY_FILTERS = ['All Types', 'For Rent', 'For Sale', 'Apartments', 'Villas'];
const SERVICE_FILTERS = ['All Services', 'Plumbing', 'Electrical', 'Cleaning', 'Carpentry', 'Painting'];

export default function ExploreScreen() {
  const params = useLocalSearchParams<{ type?: string; category?: string }>();
  const [activeTab, setActiveTab] = useState<'PROPERTY' | 'SERVICE'>(
    params.type === 'SERVICE' ? 'SERVICE' : 'PROPERTY'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const currentFilters = activeTab === 'PROPERTY' ? PROPERTY_FILTERS : SERVICE_FILTERS;

  return (
    <ScreenContainer scrollable>
      <Header
        title="Explore Marketplace"
        subtitle="Browse verified properties and skilled services"
      />

      <View style={styles.content}>
        {/* Type Toggle Pills */}
        <View style={styles.toggleRow}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setActiveTab('PROPERTY');
              setSelectedFilter('All Types');
            }}
            style={[
              styles.toggleButton,
              activeTab === 'PROPERTY' && styles.toggleButtonActive,
            ]}
          >
            <Building
              size={16}
              color={activeTab === 'PROPERTY' ? colors.white : colors.forestGreen}
            />
            <Text
              style={[
                styles.toggleText,
                activeTab === 'PROPERTY' && styles.toggleTextActive,
              ]}
            >
              Properties
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setActiveTab('SERVICE');
              setSelectedFilter('All Services');
            }}
            style={[
              styles.toggleButton,
              activeTab === 'SERVICE' && styles.toggleButtonActive,
            ]}
          >
            <Wrench
              size={16}
              color={activeTab === 'SERVICE' ? colors.white : colors.forestGreen}
            />
            <Text
              style={[
                styles.toggleText,
                activeTab === 'SERVICE' && styles.toggleTextActive,
              ]}
            >
              Local Services
            </Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar with Filter Icon */}
        <View style={styles.searchRow}>
          <View style={styles.searchInputWrapper}>
            <Input
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder={
                activeTab === 'PROPERTY'
                  ? 'Search locality, apartment, villa...'
                  : 'Search plumber, electrician, cleaner...'
              }
              leftIcon={<Search size={18} color={colors.mutedText} />}
              containerStyle={styles.noMargin}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.75}
            style={styles.filterButton}
            accessibilityLabel="Open search filters"
            accessibilityRole="button"
          >
            <SlidersHorizontal size={18} color={colors.forestGreen} />
          </TouchableOpacity>
        </View>

        {/* Horizontal Quick Filter Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersScroll}
        >
          {currentFilters.map((filter) => {
            const isSelected = selectedFilter === filter;
            return (
              <TouchableOpacity
                key={filter}
                activeOpacity={0.75}
                onPress={() => setSelectedFilter(filter)}
                style={[
                  styles.filterPill,
                  isSelected && styles.filterPillActive,
                ]}
              >
                <Text
                  style={[
                    styles.filterPillText,
                    isSelected && styles.filterPillTextActive,
                  ]}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Informational Integration Card */}
        <Card variant="outlined" style={styles.noticeCard}>
          <View style={styles.noticeHeader}>
            <Compass size={18} color={colors.forestGreen} />
            <Text style={styles.noticeTitle}>
              {activeTab === 'PROPERTY' ? 'Property Discovery' : 'Service Discovery'}
            </Text>
            <Badge label="M4 Preview" variant="purple" />
          </View>
          <Text style={styles.noticeText}>
            The foundation UI and filter controls are ready. Live backend search integration
            against `/api/v1/listings` will be attached during Milestone M4.
          </Text>
        </Card>

        {/* Results Area with Empty State */}
        <EmptyState
          title={`No ${activeTab === 'PROPERTY' ? 'Properties' : 'Services'} Loaded Yet`}
          description="Enter keywords above or adjust filters. Verified listings will populate automatically once discovery is connected."
          icon={<Compass size={32} color={colors.forestGreen} />}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.base,
  },
  toggleRow: {
    flexDirection: 'row',
    backgroundColor: colors.lightGreen,
    borderRadius: borderRadius.md,
    padding: spacing.xs,
    marginBottom: spacing.base,
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
  },
  toggleButtonActive: {
    backgroundColor: colors.forestGreen,
  },
  toggleText: {
    ...typography.subtitle2,
    color: colors.forestGreen,
    marginLeft: spacing.xs + 2,
  },
  toggleTextActive: {
    color: colors.white,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  searchInputWrapper: {
    flex: 1,
  },
  noMargin: {
    marginBottom: 0,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtersScroll: {
    marginHorizontal: -spacing.base,
    paddingHorizontal: spacing.base,
    marginBottom: spacing.base,
  },
  filterPill: {
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: spacing.sm,
  },
  filterPillActive: {
    backgroundColor: colors.forestGreen,
    borderColor: colors.forestGreen,
  },
  filterPillText: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.darkText,
  },
  filterPillTextActive: {
    color: colors.white,
  },
  noticeCard: {
    marginBottom: spacing.base,
    backgroundColor: colors.surface,
  },
  noticeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
    marginBottom: spacing.xs,
  },
  noticeTitle: {
    ...typography.subtitle2,
    color: colors.forestGreen,
    flex: 1,
  },
  noticeText: {
    ...typography.body2,
    color: colors.mutedText,
  },
});
