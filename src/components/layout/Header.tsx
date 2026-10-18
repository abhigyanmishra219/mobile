import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { colors, spacing, typography } from '@/theme';
import { ArrowLeft } from 'lucide-react-native';
import { router } from 'expo-router';

export interface HeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
  style?: ViewStyle;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  showBack = false,
  onBack,
  rightAction,
  style,
}) => {
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.leftRow}>
        {showBack ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleBack}
            style={styles.backButton}
            accessibilityLabel="Go back"
            accessibilityRole="button"
          >
            <ArrowLeft size={22} color={colors.forestGreen} />
          </TouchableOpacity>
        ) : null}
        <View style={styles.titleColumn}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {subtitle ? (
            <Text style={styles.subtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          ) : null}
        </View>
      </View>
      {rightAction ? <View style={styles.rightRow}>{rightAction}</View> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  leftRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: spacing.xs,
    marginRight: spacing.sm,
  },
  titleColumn: {
    flex: 1,
  },
  title: {
    ...typography.h3,
    color: colors.forestGreen,
  },
  subtitle: {
    ...typography.caption,
    color: colors.mutedText,
    marginTop: 2,
  },
  rightRow: {
    marginLeft: spacing.md,
  },
});
