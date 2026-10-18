import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { colors, spacing, typography } from '@/theme';

export interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  actionText?: string;
  onActionPress?: () => void;
  style?: ViewStyle;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  actionText,
  onActionPress,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.textColumn}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {actionText && onActionPress ? (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onActionPress}
          style={styles.actionBtn}
          accessibilityRole="button"
        >
          <Text style={styles.actionText}>{actionText}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: spacing.md,
  },
  textColumn: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  title: {
    ...typography.subtitle1,
    color: colors.darkText,
  },
  subtitle: {
    ...typography.caption,
    color: colors.mutedText,
    marginTop: 2,
  },
  actionBtn: {
    paddingVertical: spacing.xs,
  },
  actionText: {
    ...typography.caption,
    color: colors.forestGreen,
    fontWeight: '600',
  },
});
