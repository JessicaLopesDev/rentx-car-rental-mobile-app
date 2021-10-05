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
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
  position: absolute;
  margin-top: ${getStatusBarHeight() + 16}px;
  margin-left: 24px;
`;

export const CarImages = styled.View`
  margin-top: ${getStatusBarHeight() + 32}px;
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 24,
    alignItems: 'center'
  },
  showsVerticalScrollIndicator: false
})`
`;

export const Details = styled.View`
  width: 100%;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-top: 8px;
`;

export const Description = styled.View`
`;

export const Brand = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.secondary_500};
    color: ${theme.colors.text_detail};
    font-size: ${RFValue(9)}px;

    text-transform: uppercase;
  `}
`;

export const Name = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.secondary_500};
    color: ${theme.colors.title};
    font-size: ${RFValue(23)}px;
  `}
`;

export const Rent = styled.View`
`;

export const Period = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.secondary_500};
    color: ${theme.colors.text_detail};
    font-size: ${RFValue(9)}px;

    text-transform: uppercase;
  `}
`;

export const Price = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.secondary_500};
    color: ${theme.colors.main};
    font-size: ${RFValue(23)}px;
  `}
`;

export const Accessories = styled.View`
  width: 100%;

  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;

  margin-top: 10px;
`;

export const RentalPeriod = styled.View`
  ${({ theme }) => css`
    width: 100%;

    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    margin-top: 20px;

    border-bottom-width: 1px;
    border-bottom-color: ${theme.colors.line};
    padding-bottom: 16px;
  `}
`;

export const CalendarIcon = styled.View`
  ${({ theme }) => css`
    width: 48px;
    height: 48px;

    background-color: ${theme.colors.main};
    
    justify-content: center;
    align-items: center;
  `}
`;

export const DateInfo = styled.View`
`;

export const DateTitle = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.primary_500};
    color: ${theme.colors.text_detail};
    font-size: ${RFValue(10)}px;

    text-transform: uppercase;
  `}
`;

export const DateValue = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.primary_500};
    color: ${theme.colors.title};
    font-size: ${RFValue(14)}px;
  `}
`;

export const RentalPrice = styled.View`
  width: 100%;
  margin-top: 16px;
`;

export const RentalPriceLabel = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.primary_500};
    color: ${theme.colors.text_detail};
    font-size: ${RFValue(12)}px;

    text-transform: uppercase;
  `}
`;

export const RentalPriceDetails = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const RentalPriceQuota = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.primary_500};
    color: ${theme.colors.title};
    font-size: ${RFValue(14)}px;
  `}
`;

export const RentalPriceTotal = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.secondary_500};
    color: ${theme.colors.success};
    font-size: ${RFValue(22)}px;
  `}
`;


export const Footer = styled.View`
  ${({ theme }) => css`
    width: 100%;

    background-color: ${theme.colors.background_secondary};

    padding: 24px 24px ${getBottomSpace() + 24}px;
  `}
`;
