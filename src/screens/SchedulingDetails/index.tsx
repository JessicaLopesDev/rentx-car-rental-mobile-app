import React, { useEffect, useState } from 'react';
//import { format } from 'date-fns';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';
import SpeedSvg from '../../assets/speed.svg';

import { Alert } from 'react-native';

import * as S from './styles';


interface RentalPeriod {
  start: string;
  end: string
}

export function SchedulingDetails(){
  const theme = useTheme();

  return (
    <S.Container >
      <S.Header>
        <BackButton onPress={() => {}}/>
      </S.Header>

      <S.CarImages>
        <ImageSlider 
          imagesUrl={['https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png']}
        />
      </S.CarImages>
      
      <S.Content>
        <S.Details>
          <S.Description>
            <S.Brand>Lamburghini</S.Brand>
            <S.Name>Huracan</S.Name>
          </S.Description>

          <S.Rent>
            <S.Period>Ao dia</S.Period>
            <S.Price>R$ 580</S.Price>
          </S.Rent>
        </S.Details>

        <S.Accessories>
          <Accessory name="380Km/h" icon={SpeedSvg}/>
          <Accessory name="380Km/h" icon={SpeedSvg}/>
          <Accessory name="380Km/h" icon={SpeedSvg}/>
          <Accessory name="380Km/h" icon={SpeedSvg}/>
          <Accessory name="380Km/h" icon={SpeedSvg}/>
          <Accessory name="380Km/h" icon={SpeedSvg}/>
        </S.Accessories>

        <S.RentalPeriod>
          <S.CalendarIcon>
            <Feather 
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </S.CalendarIcon>

          <S.DateInfo>
            <S.DateTitle>DE</S.DateTitle>
            <S.DateValue>18/10/2021</S.DateValue>
          </S.DateInfo>

          <Feather 
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <S.DateInfo>
            <S.DateTitle>ATÉ</S.DateTitle>
            <S.DateValue>21/10/2021</S.DateValue>
          </S.DateInfo>
        </S.RentalPeriod>

        <S.RentalPrice>
          <S.RentalPriceLabel>TOTAL</S.RentalPriceLabel>
          <S.RentalPriceDetails>
            <S.RentalPriceQuota>R$ 580 x3 diárias</S.RentalPriceQuota>
            <S.RentalPriceTotal>R$ 2.900</S.RentalPriceTotal>
          </S.RentalPriceDetails>
        </S.RentalPrice>
      </S.Content>

      <S.Footer>
        <Button 
          title="Alugar agora"
          color={theme.colors.success}
        />
      </S.Footer>
    </S.Container>
  )
} 