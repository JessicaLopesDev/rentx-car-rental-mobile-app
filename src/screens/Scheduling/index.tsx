import React from 'react';
import { StatusBar } from 'react-native';
import { BackButton } from '../../components/BackButton';
import { useTheme } from 'styled-components';
import { Button } from '../../components/Button';
import ArrowSvg from '../../assets/arrow.svg';

import * as S from './styles';
import { Calendar } from '../../components/Calendar';

export function Scheduling(){
  const theme = useTheme();
  return (
    <S.Container>
      <S.Header>
        <StatusBar 
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton 
          onPress={() => {}}
          color={theme.colors.shape}
        />

        <S.Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel
        </S.Title>

        <S.RentalPeriod>
          <S.DateInfo>
            <S.DateTitle>DE</S.DateTitle>
            <S.DateValue selected={false}>
              18/10/2021
            </S.DateValue>
          </S.DateInfo>

          <ArrowSvg />

          <S.DateInfo>
            <S.DateTitle>ATÉ</S.DateTitle>
            <S.DateValue selected={false}>
              20/10/2021
            </S.DateValue>
          </S.DateInfo>
        </S.RentalPeriod>
      </S.Header>
      <S.Content>
        <Calendar />
      </S.Content>


      <S.Footer>
        <Button 
          title="Confirmar" 
          onPress={() => {}} 
          enabled
        />
      </S.Footer>

    </S.Container>
  )
}