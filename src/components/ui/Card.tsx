import React from 'react';
import { View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { colors, borderRadius, spacing, shadows } from '@/theme';

export interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  variant?: 'elevated' | 'outlined' | 'flat';
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  onPress,
  variant = 'outlined',
}) => {
  const getVariantStyle = (): ViewStyle => {
    switch (variant) {
      case 'elevated':
        return {
          backgroundColor: colors.surface,
          ...shadows.sm,
          borderWidth: 1,
          borderColor: colors.borderLight,
        };
      case 'flat':
        return {
          backgroundColor: colors.surfaceSubtle,
        };
      case 'outlined':
      default:
        return {
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
        };
    }
  };

  const cardStyle = [styles.base, getVariantStyle(), style];

  if (onPress) {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={cardStyle}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  base: {
    borderRadius: borderRadius.lg,
    padding: spacing.base,
  },
});
