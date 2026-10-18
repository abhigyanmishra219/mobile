import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, borderRadius, spacing, typography } from '@/theme';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
}) => {
  const getVariantStyles = (): { container: ViewStyle; text: TextStyle } => {
    switch (variant) {
      case 'secondary':
        return {
          container: {
            backgroundColor: colors.lightGreen,
            borderWidth: 1,
            borderColor: colors.border,
          },
          text: {
            color: colors.forestGreen,
          },
        };
      case 'outline':
        return {
          container: {
            backgroundColor: 'transparent',
            borderWidth: 1.5,
            borderColor: colors.forestGreen,
          },
          text: {
            color: colors.forestGreen,
          },
        };
      case 'ghost':
        return {
          container: {
            backgroundColor: 'transparent',
          },
          text: {
            color: colors.forestGreen,
          },
        };
      case 'danger':
        return {
          container: {
            backgroundColor: colors.error,
          },
          text: {
            color: colors.white,
          },
        };
      case 'primary':
      default:
        return {
          container: {
            backgroundColor: colors.forestGreen,
          },
          text: {
            color: colors.white,
          },
        };
    }
  };

  const getSizeStyles = (): { container: ViewStyle; text: TextStyle } => {
    switch (size) {
      case 'sm':
        return {
          container: {
            paddingVertical: spacing.xs + 2,
            paddingHorizontal: spacing.md,
            borderRadius: borderRadius.sm,
          },
          text: {
            fontSize: 13,
            fontWeight: '600',
          },
        };
      case 'lg':
        return {
          container: {
            paddingVertical: spacing.md + 2,
            paddingHorizontal: spacing.xl,
            borderRadius: borderRadius.md,
          },
          text: {
            fontSize: 16,
            fontWeight: '600',
          },
        };
      case 'md':
      default:
        return {
          container: {
            paddingVertical: spacing.sm + 3,
            paddingHorizontal: spacing.base,
            borderRadius: borderRadius.md,
          },
          text: {
            fontSize: 14,
            fontWeight: '600',
          },
        };
    }
  };

  const vStyles = getVariantStyles();
  const sStyles = getSizeStyles();

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.baseContainer,
        sStyles.container,
        vStyles.container,
        disabled && styles.disabledContainer,
        style,
      ]}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' || variant === 'danger' ? colors.white : colors.forestGreen}
        />
      ) : (
        <>
          {icon ? <>{icon}</> : null}
          <Text
            style={[
              typography.button,
              vStyles.text,
              sStyles.text,
              icon ? { marginLeft: spacing.sm } : undefined,
              disabled && styles.disabledText,
              textStyle,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledContainer: {
    opacity: 0.5,
  },
  disabledText: {
    color: colors.mutedText,
  },
});
