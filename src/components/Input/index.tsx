import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import * as S from './styles';

interface Props extends TextInputProps{
  iconName: React.ComponentProps<typeof Feather>['name'];
  value?: string;
}

export function Input({
  iconName,
  value,
  ...rest
} : Props){
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  
  const theme = useTheme();

  const handleInputFocus = () => {
    setIsFocused(true);
  }

  const handleInputBlur = () => {
    setIsFocused(false);
    setIsFilled(!!value)
  }

  return (
    <S.Container >
      <S.IconContainer isFocused={isFocused} >
          <Feather 
            name={iconName}
            size={22}
            color={(isFocused || isFilled) ? theme.colors.main : theme.colors.text_detail}
          />
      </S.IconContainer>
      <S.InputText 
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        isFocused={isFocused}
        {...rest}
      />
    </S.Container>
  )
}

