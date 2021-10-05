import styled, { css } from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  ${({ theme }) => css`
  flex: 1;
  align-items: center;
  background-color: ${theme.colors.background_primary};
  `}
`;

export const Header = styled.View`
  ${({ theme }) => css`
    width: 100%;
    height: 360px;

    background-color: ${theme.colors.header};

    justify-content: center;
    padding: 25px;
    padding-top: ${getStatusBarHeight() + 30}px;
  `}
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.shape};
    font-family: ${theme.fonts.secondary_600};
    font-size: ${RFValue(28)}px;

    margin-top: 24px;
  `}
`;

export const SubTitle = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.shape};
    font-family: ${theme.fonts.secondary_400};
    font-size: ${RFValue(13)}px;

    margin-top: 24px;
  `}
`;

export const Content = styled.View`
  ${({ theme }) => css`
  flex: 1;
  width: 100%;
  padding: 0 16px;
  `}
`;

export const Appointments = styled.View`
  ${({ theme }) => css`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 24px 0;

  `}
`;

export const AppointmentsTitle = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.text};
    font-family: ${theme.fonts.primary_400};
    font-size: ${RFValue(13)}px;
  `}
`;

export const AppointmentsQuantity = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.title};
    font-family: ${theme.fonts.primary_500};
    font-size: ${RFValue(13)}px;
  `}
`;

export const CarWrapper = styled.View`
  margin: 16px;
`;

export const CarFooter = styled.View`
  ${({ theme }) => css`
    width: 100%;
    padding: 12px;

    margin-top: -10px;

    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: ${theme.colors.background_secondary};
  `}
`;

export const CarFooterTitle = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.text_detail};
    font-family: ${theme.fonts.secondary_500};
    font-size: ${RFValue(10)}px;
  `}
`;

export const CarFooterPeriod = styled.View`
  flex-direction: row;
`;

export const CarFooterDate = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.title};
    font-family: ${theme.fonts.primary_400};
    font-size: ${RFValue(12)}px;
  `}
`;



