import { useTheme } from 'styled-components';
import React from 'react';
import * as S from './styles';
import { ActivityIndicator } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';

interface Props extends RectButtonProps{
  title: string;
  color?: string;
  loading?: boolean;
  light?: boolean;
}

export function Button({
  title,
  color,
  onPress,
  enabled = true,
  loading = false,
  light = false
} : Props){

  const theme = useTheme();

  return (
    <S.Container 
      color={color ? color : theme.colors.main} 
      onPress={onPress}
      enabled={enabled}
      style={{ opacity: (enabled === false || loading === true) ? 0.5 : 1}}
    >
      { loading 
        ? <ActivityIndicator color={theme.colors.shape} />
        : <S.Title light={light} >{title}</S.Title>
      }
    </S.Container>
  )
}