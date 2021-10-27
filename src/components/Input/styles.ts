import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { TextInput } from 'react-native';

interface Props {
  isFocused: boolean;
}

export const Container = styled.View`
    flex-direction: row;

    margin-bottom: 8px;
`;

export const IconContainer = styled.View<Props>`
    height: 56px;
    width: 55px;
    justify-content: center;
    align-items: center;

    margin-right: 2px;

  ${({ theme }) => css`
    background-color: ${theme.colors.background_secondary};
  `}
  ${({ theme, isFocused }) => isFocused && css`
    border-bottom-width: 3px;
    border-bottom-color: ${theme.colors.main};
  `}
`;

export const InputText = styled(TextInput)<Props>`
    flex: 1;
    padding: 0 23px;

  ${({ theme }) => css`
    background-color: ${theme.colors.background_secondary};
    color: ${theme.colors.text};
    font-family: ${theme.fonts.primary_400};
    font-size: ${RFValue(13)}px;
  `}
  ${({ theme, isFocused }) => isFocused && css`
    border-bottom-width: 3px;
    border-bottom-color: ${theme.colors.main};
  `}
`;
