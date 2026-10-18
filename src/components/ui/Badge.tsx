import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors, borderRadius, spacing, typography } from '@/theme';

export type BadgeVariant =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'error'
  | 'purple'
  | 'outline';

export interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'default',
  style,
  textStyle,
  icon,
}) => {
  const getVariantStyles = (): { container: ViewStyle; text: TextStyle } => {
    switch (variant) {
      case 'primary':
        return {
          container: { backgroundColor: colors.forestGreen },
          text: { color: colors.white },
        };
      case 'success':
        return {
          container: { backgroundColor: colors.successLight },
          text: { color: colors.success },
        };
      case 'warning':
        return {
          container: { backgroundColor: colors.warningLight },
          text: { color: colors.warning },
        };
      case 'error':
        return {
          container: { backgroundColor: colors.errorLight },
          text: { color: colors.error },
        };
      case 'purple':
        return {
          container: { backgroundColor: colors.lightPurple },
          text: { color: colors.forestGreen },
        };
      case 'outline':
        return {
          container: {
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: colors.border,
          },
          text: { color: colors.mutedText },
        };
      case 'default':
      default:
        return {
          container: { backgroundColor: colors.lightGreen },
          text: { color: colors.forestGreen },
        };
    }
  };

  const vStyles = getVariantStyles();

  return (
    <View style={[styles.container, vStyles.container, style]}>
      {icon ? <View style={styles.iconWrapper}>{icon}</View> : null}
      <Text style={[styles.text, vStyles.text, textStyle]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm + 2,
    borderRadius: borderRadius.full,
  },
  iconWrapper: {
    marginRight: spacing.xs,
  },
  text: {
    ...typography.caption,
    fontWeight: '600',
  },
});
