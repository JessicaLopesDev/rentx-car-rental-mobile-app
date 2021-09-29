import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  ${({ theme }) => css`
    flex: 1;
    background-color: ${theme.colors.header};

    padding-top: 96px;
  `}
`;

export const Content = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;

    padding-bottom: 80px;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.secondary_600};
    color: ${theme.colors.shape};
    font-size: ${RFValue(27)}px;

    margin-top: 40px;
  `}
`;

export const Message = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.primary_400};
    color: ${theme.colors.text_detail};
    font-size: ${RFValue(13)}px;
    text-align: center;

    margin-top: 16px;
    line-height: ${RFValue(23)}px;
  `}
`;

export const Footer = styled.View`
    width: 100%;
    align-items: center;

    margin: 80px 0;
`;