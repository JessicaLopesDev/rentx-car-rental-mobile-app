import React from 'react';
import * as S from './styles';

interface Props {
  active?: boolean;
}

export function Bullet({ active = false } : Props){
  return (
    <S.Container active={active} />
  )
}