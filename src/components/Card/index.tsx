import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import GasolineSvg from '../../assets/gasoline.svg';
import { CarDTO } from '../../dtos/CarDTO';

import * as S from './styles';

export interface CarProps extends RectButtonProps {
  data: CarDTO;
}

export function Card({ data, ...rest }: CarProps){
  return (
    <S.Container {...rest}>
      <S.Details>
        <S.Brand>{data.brand}</S.Brand>
        <S.Name>{data.name}</S.Name>

        <S.About>
          <S.Rent>
            <S.Period>{data.rent.period}</S.Period>
            <S.Price>{`R$ ${data.rent.price}`}</S.Price>
          </S.Rent>

          <S.Type>
            <GasolineSvg/>
          </S.Type>

        </S.About>
      </S.Details>

      <S.CarImage 
        source={{ uri: data.thumbnail }}
        resizeMode="contain"
      />
    </S.Container>
  )
}