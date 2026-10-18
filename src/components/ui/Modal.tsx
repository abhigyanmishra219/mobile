import React from 'react';
import {
  Modal as RNModal,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';
import { colors, borderRadius, spacing, typography, shadows } from '@/theme';
import { Button } from './Button';

export interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  confirmText?: string;
  onConfirm?: () => void;
  confirmVariant?: 'primary' | 'danger';
  cancelText?: string;
  confirmLoading?: boolean;
  contentStyle?: ViewStyle;
}

export const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  title,
  description,
  children,
  confirmText,
  onConfirm,
  confirmVariant = 'primary',
  cancelText = 'Cancel',
  confirmLoading = false,
  contentStyle,
}) => {
  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={[styles.dialogCard, contentStyle]}>
              {title ? <Text style={styles.title}>{title}</Text> : null}
              {description ? <Text style={styles.description}>{description}</Text> : null}
              {children ? <View style={styles.body}>{children}</View> : null}
              <View style={styles.actions}>
                <Button
                  title={cancelText}
                  variant="ghost"
                  size="md"
                  onPress={onClose}
                  style={styles.actionBtn}
                />
                {onConfirm && confirmText ? (
                  <Button
                    title={confirmText}
                    variant={confirmVariant}
                    size="md"
                    onPress={onConfirm}
                    loading={confirmLoading}
                    style={styles.actionBtn}
                  />
                ) : null}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  dialogCard: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...shadows.lg,
  },
  title: {
    ...typography.h3,
    marginBottom: spacing.xs,
    color: colors.darkText,
  },
  description: {
    ...typography.body2,
    marginBottom: spacing.base,
    color: colors.mutedText,
  },
  body: {
    marginBottom: spacing.base,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  actionBtn: {
    minWidth: 90,
  },
});
