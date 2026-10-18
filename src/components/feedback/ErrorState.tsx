import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, typography } from '@/theme';
import { Button } from '@/components/ui/Button';
import { AlertCircle } from 'lucide-react-native';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  style?: ViewStyle;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'An unexpected error occurred while loading content. Please check your network and try again.',
  onRetry,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconWrapper}>
        <AlertCircle size={32} color={colors.error} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {onRetry ? (
        <Button
          title="Retry"
          onPress={onRetry}
          variant="outline"
          size="md"
          style={styles.retryBtn}
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
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.errorLight,
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
  message: {
    ...typography.body2,
    color: colors.mutedText,
    textAlign: 'center',
    maxWidth: 300,
    marginBottom: spacing.lg,
  },
  retryBtn: {
    minWidth: 120,
  },
});
