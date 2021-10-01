import React from 'react';
import { StatusBar } from 'react-native';
import { BackButton } from '../../components/BackButton';
import { useTheme } from 'styled-components';
import { Button } from '../../components/Button';
import { Calendar } from '../../components/Calendar';
import ArrowSvg from '../../assets/arrow.svg';

import * as S from './styles';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Scheduling: undefined;
  SchedulingDetails: undefined;
};

type NextScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Scheduling'
>;

type NextScreenProps = {
  navigation: NextScreenNavigationProp;
}


export function Scheduling({ navigation }: NextScreenProps){

  function handleSchedulingDetails() {
    navigation.navigate('SchedulingDetails')
  }

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
          onPress={handleSchedulingDetails} 
          enabled
        />
      </S.Footer>

    </S.Container>
  )
}