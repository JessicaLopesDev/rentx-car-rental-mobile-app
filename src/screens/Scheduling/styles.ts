import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

interface DateValueProps {
  selected: boolean;
}

export const Container = styled.View`
  ${({ theme }) => css`
  flex: 1;
  background-color: ${theme.colors.background_secondary};
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
    font-size: ${RFValue(30)}px;

    margin-top: 24px;
  `}
`;

export const RentalPeriod = styled.View`
  ${({ theme }) => css`
    width: 100%;

    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    margin: 32px 0;
  `}
`;

export const DateInfo = styled.View`
  ${({ theme }) => css`
  `}
`;


export const DateTitle = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.text};
    font-family: ${theme.fonts.secondary_500};
    font-size: ${RFValue(8)}px;
  `}
`;

export const DateValue = styled.Text<DateValueProps>`
  color: ${({ theme })=> theme.colors.shape};
  font-family: ${({ theme })=> theme.fonts.primary_500};
  font-size: ${RFValue(13)}px;

  ${({ theme, selected }) => !selected && css`
    border-bottom-width: 1px;
    border-bottom-color: ${theme.colors.text};
    padding-bottom: 5px;
  `}
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 24,
  },
  showsVerticalScrollIndicator: false
})`
`;

export const Footer = styled.View`
  ${({ theme }) => css`
    padding: 24px;
  `}
`;
