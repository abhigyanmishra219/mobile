import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, typography } from '@/theme';

export interface LoadingIndicatorProps {
  message?: string;
  size?: 'small' | 'large';
  color?: string;
  style?: ViewStyle;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  message,
  size = 'large',
  color = colors.forestGreen,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={color} />
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    ...typography.body2,
    color: colors.mutedText,
    marginTop: spacing.md,
    textAlign: 'center',
  },
});
