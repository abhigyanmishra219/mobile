import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  ViewStyle,
  RefreshControl,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/theme';

export interface ScreenContainerProps {
  children: React.ReactNode;
  scrollable?: boolean;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  refreshing?: boolean;
  onRefresh?: () => void;
  withTopInset?: boolean;
  withBottomInset?: boolean;
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  scrollable = false,
  style,
  contentContainerStyle,
  refreshing = false,
  onRefresh,
  withTopInset = true,
  withBottomInset = false,
}) => {
  const insets = useSafeAreaInsets();

  const containerPadding: ViewStyle = {
    paddingTop: withTopInset ? insets.top : 0,
    paddingBottom: withBottomInset ? insets.bottom : 0,
  };

  if (scrollable) {
    return (
      <View style={[styles.root, containerPadding, style]}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
        <ScrollView
          style={styles.flex}
          contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          refreshControl={
            onRefresh ? (
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={colors.forestGreen}
                colors={[colors.forestGreen]}
              />
            ) : undefined
          }
        >
          {children}
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={[styles.root, containerPadding, style]}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <View style={[styles.flex, contentContainerStyle]}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
