import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  ${({ theme }) => css`
  flex: 1;
  background-color: ${theme.colors.background_secondary};
  `}
`;

export const Header = styled.View`
  ${({ theme }) => css`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
  position: absolute;
  margin-top: ${getStatusBarHeight() + 18}px;
  margin-left: 24px;
  `}
`;