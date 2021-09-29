import React from 'react';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import SpeedSvg from '../../assets/speed.svg';
import * as S from './styles';
import { Button } from '../../components/Button';

export function SchedulingDetails(){

  return (
    <S.Container >
      <S.Header>
        <BackButton onPress={() => {}}/>
      </S.Header>

      <S.CarImage>
        <ImageSlider 
          imagesUrl={['https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png']}
        />
      </S.CarImage>
      
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

        <S.About>
          Este é automóvel desportivo. Surgiu do lendário 
          touro de lide indultado na praça Real Maestranza de Sevilla. 
          É um belíssimo carro para quem gosta de acelerar.
        </S.About>
      </S.Content>

      <S.Footer>
        <Button 
          title="Escolher período do aluguel"
        />
      </S.Footer>
    </S.Container>
  )
} 