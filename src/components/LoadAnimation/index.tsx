import React from 'react';
import LottieView from 'lottie-react-native';
import loadingCar from '../../assets/loadingCar.json';

import * as S from './styles';

export function LoadAnimation(){
  return (
    <S.Container>
      <LottieView 
        source={loadingCar}
        style={{ height: 200 }}
        resizeMode="contain"
        autoPlay
        loop
      />

    </S.Container>
  )
}