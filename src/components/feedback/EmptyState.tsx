import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, typography } from '@/theme';
import { Button } from '@/components/ui/Button';

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionText?: string;
  onActionPress?: () => void;
  style?: ViewStyle;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  actionText,
  onActionPress,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {icon ? <View style={styles.iconWrapper}>{icon}</View> : null}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {actionText && onActionPress ? (
        <Button
          title={actionText}
          onPress={onActionPress}
          variant="primary"
          size="md"
          style={styles.actionBtn}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.lightGreen,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.base,
  },
  title: {
    ...typography.h3,
    color: colors.darkText,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  description: {
    ...typography.body2,
    color: colors.mutedText,
    textAlign: 'center',
    maxWidth: 280,
    marginBottom: spacing.lg,
  },
  actionBtn: {
    minWidth: 140,
  },
});
