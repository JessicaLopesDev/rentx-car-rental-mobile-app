import React, { useState } from 'react';
import { Alert, StatusBar } from 'react-native';
import { BackButton } from '../../components/BackButton';
import { useTheme } from 'styled-components';
import { Button } from '../../components/Button';
import { Calendar, DayProps, MarkedDateProps } from '../../components/Calendar';
import ArrowSvg from '../../assets/arrow.svg';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Home';
import { generateInterval } from '../../components/Calendar/generateInterval';
import { format } from 'date-fns';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { RouteProp } from '@react-navigation/native';
import { CarDTO } from '../../dtos/CarDTO';
import * as S from './styles';


type NextScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Scheduling'
>;

type NextScreenRouteProp = RouteProp<
  RootStackParamList, 
  'Scheduling'
>;

type NextScreenProps = {
  navigation: NextScreenNavigationProp;
  route: NextScreenRouteProp;
}

interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}

interface Params {
  car: CarDTO;
}


export function Scheduling({ navigation, route }: NextScreenProps){
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
  const [rentPeriod, setRentPeriod] = useState<RentalPeriod>({} as RentalPeriod) 
  
  const theme = useTheme();
  const { car } = route.params as Params

  function handleRentalConfirm() {
    if(!rentPeriod.startFormatted || !rentPeriod.endFormatted) {
      Alert.alert('Selecione a data inicial e data final que deseja alugar.')
    } else {
      navigation.navigate('SchedulingDetails', {
        car,
        dates: Object.keys(markedDates)
      })
    }
  }

  function handleBack() {
    navigation.goBack();
  };

  const handleChangeDate = (date: DayProps) => {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if(start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }
    setLastSelectedDate(end);
    const interval = generateInterval(start, end)
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length -1];

    setRentPeriod({
      startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
      endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy'),
    })

  }

  return (
    <S.Container>
      <S.Header>
        <StatusBar 
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton 
          onPress={handleBack}
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
            <S.DateValue selected={!!rentPeriod.startFormatted}>
              {rentPeriod.startFormatted}
            </S.DateValue>
          </S.DateInfo>

          <ArrowSvg />

          <S.DateInfo>
            <S.DateTitle>ATÉ</S.DateTitle>
            <S.DateValue selected={!!rentPeriod.endFormatted}>
              {rentPeriod.endFormatted}
            </S.DateValue>
          </S.DateInfo>
        </S.RentalPeriod>
      </S.Header>
      <S.Content>
        <Calendar 
          markedDates={markedDates}
          onDayPress={handleChangeDate}
        />
      </S.Content>


      <S.Footer>
        <Button 
          title="Confirmar" 
          onPress={handleRentalConfirm} 
          enabled={!!rentPeriod.startFormatted}
        />
      </S.Footer>

    </S.Container>
  )
}