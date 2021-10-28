import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  padding: 0 24px;

  ${({ theme }) => css`
  background-color: ${theme.colors.background_primary};
  `}
`;

export const Header = styled.View`
  width: 100%;
  margin-top: ${getStatusBarHeight() + 31}px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Steps = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  margin-top: 60px;
  margin-bottom: 16px;
  ${({ theme }) => css`
    font-size: ${RFValue(38)}px;
    font-family: ${theme.fonts.secondary_600};
    color: ${theme.colors.title};
  `}
`;

export const Subtitle = styled.Text`
  ${({ theme }) => css`
    font-size: ${RFValue(13)}px;
    font-family: ${theme.fonts.primary_400};
    color: ${theme.colors.text};
    line-height: 24px;
  `}
`;

export const Form = styled.View`
  width: 100%;
  margin-top: 64px;
  margin-bottom: 16px;
`;

export const FormTitle = styled.Text`
  ${({ theme }) => css`
    font-size: ${RFValue(20)}px;
    font-family: ${theme.fonts.secondary_600};
    color: ${theme.colors.title};
    margin-bottom: 24px;
  `}
`;