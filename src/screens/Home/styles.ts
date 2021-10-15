import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';
import { CarDTO } from '../../dtos/CarDTO';

export const Container = styled.View`
  ${({ theme }) => css`
    flex: 1;
    background-color: ${theme.colors.background_primary};
  `}
`;

export const Header = styled.View`
  ${({ theme }) => css`
    width: 100%;
    height: 113px;
    padding: 42px 24px 0 24px;
    background-color: ${theme.colors.header};

    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  `}
`;

export const TotalCars = styled.Text`
  ${({ theme }) => css`
    font-size: ${RFValue(12)}px;
    font-family: ${theme.fonts.primary_400};
    color: ${theme.colors.text};
  `}
`;

export const CarList = styled(FlatList as new () => FlatList<CarDTO>)
.attrs({
  contentContainerStyle: {
    padding: 24
  },
  showsVerticalScrollIndicator: false
})``;
