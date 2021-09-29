import React from 'react';
import { SvgProps } from 'react-native-svg';
import * as S from './styles';

interface Props {
  name: string;
  icon: React.FC<SvgProps>
}

export function Accessory({
  name,
  icon: Icon
} : Props){
  return (
    <S.Container>
      <Icon width={30} height={30}/>
      <S.Name>{name}</S.Name>
    </S.Container>
  )
}