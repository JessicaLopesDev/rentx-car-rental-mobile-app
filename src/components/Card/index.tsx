import React from 'react';
import GasolineSvg from '../../assets/gasoline.svg';

import * as S from './styles';

interface CarData {
  brand: string;
  name: string;
  rent: {
    period: string,
    price: number
  };
  thumbnail: string;
}

export interface CarProps {
  data: CarData;
}

export function Card({ data }: CarProps){
  return (
    <S.Container>
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