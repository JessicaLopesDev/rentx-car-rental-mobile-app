import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  ${({ theme }) => css`
  flex: 1;
  justify-content: center;
  align-items: center;

  background-color: ${theme.colors.header};
  `}
`;