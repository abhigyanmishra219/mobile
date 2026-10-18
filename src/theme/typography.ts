import { TextStyle } from 'react-native';
import { colors } from './colors';

export const typography = {
  h1: {
    fontSize: 26,
    fontWeight: '700' as const,
    lineHeight: 32,
    color: colors.darkText,
  } satisfies TextStyle,
  h2: {
    fontSize: 22,
    fontWeight: '700' as const,
    lineHeight: 28,
    color: colors.darkText,
  } satisfies TextStyle,
  h3: {
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 24,
    color: colors.darkText,
  } satisfies TextStyle,
  subtitle1: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 22,
    color: colors.darkText,
  } satisfies TextStyle,
  subtitle2: {
    fontSize: 14,
    fontWeight: '600' as const,
    lineHeight: 20,
    color: colors.darkText,
  } satisfies TextStyle,
  body1: {
    fontSize: 15,
    fontWeight: '400' as const,
    lineHeight: 22,
    color: colors.darkText,
  } satisfies TextStyle,
  body2: {
    fontSize: 13,
    fontWeight: '400' as const,
    lineHeight: 18,
    color: colors.mutedText,
  } satisfies TextStyle,
  caption: {
    fontSize: 11,
    fontWeight: '500' as const,
    lineHeight: 16,
    color: colors.mutedText,
  } satisfies TextStyle,
  button: {
    fontSize: 15,
    fontWeight: '600' as const,
    lineHeight: 20,
    color: colors.white,
  } satisfies TextStyle,
};
