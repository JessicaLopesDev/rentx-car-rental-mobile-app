import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  ${({ theme }) => css`
  width: 115px;
  height: 100px;

  justify-content: center;
  align-items: center;

  background-color: ${theme.colors.background_primary};

  padding: 12px;
  margin-bottom: 8px;
  `}
`;

export const Name = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.primary_500};
    color: ${theme.colors.text};
    font-size: ${RFValue(12)}px;
  `}
`;