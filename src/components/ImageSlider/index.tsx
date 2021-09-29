import React, { useRef, useState } from 'react';
import { FlatList } from 'react-native';
import * as S from './styles';

interface Props {
  imagesUrl: string[]
}

export function ImageSlider({ imagesUrl } : Props){

  return (
    <S.Container>
      <S.ImageIndexes> 
        <S.ImageIndex active={true}/>
        <S.ImageIndex active={false}/>
        <S.ImageIndex active={false}/>
        <S.ImageIndex active={false}/>
      </S.ImageIndexes>

      <S.CarImageWrapper>
        <S.CarImage 
          source={{ uri: imagesUrl[0] }}
          resizeMode="contain"
        />
      </S.CarImageWrapper>


    </S.Container>
  )
}