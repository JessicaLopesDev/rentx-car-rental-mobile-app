import React, { useEffect, useState } from 'react';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';
import { StackNavigationProp } from '@react-navigation/stack';
import { CarDTO } from '../../dtos/CarDTO';

import * as S from './styles';
import { RootStackParamList } from '../Home';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { format } from 'date-fns';
import { getPlatformDate } from '../../utils/getPlatformDate';
import api from '../../services/api';
import { Alert } from 'react-native';

type NextScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SchedulingDetails'
>;
type NextScreenRouteProp = RouteProp<
  RootStackParamList, 
  'SchedulingDetails'
>;

type NextScreenProps = {
  navigation: NextScreenNavigationProp;
  route: NextScreenRouteProp;
}

interface Params {
  car: CarDTO;
  dates: string[];
}

interface RentalPeriod {
  start: string;
  end: string
}

interface UnavailableDatesProps {
  unavailable_dates: string[];
}

export function SchedulingDetails({ navigation, route }: NextScreenProps){
  const [loading, setLoading] = useState(false);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)
  const theme = useTheme();
  const { car, dates } = route.params as Params
  const totalRent = Number(dates.length * car.rent.price);

  async function handleConfirmation() {
    const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);
    const dataUnavailableDates = schedulesByCar.data as UnavailableDatesProps;
    const unavailableDates = dataUnavailableDates.unavailable_dates

    const unavailable_dates = [
      ...unavailableDates,
      ...dates,
    ];

    await api.post('/schedules_byuser', {
      user_id: 2,
      car,
      startDate: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      endDate: format(getPlatformDate(new Date(dates[dates.length -1])), 'dd/MM/yyyy')
    });

    api.put(`/schedules_bycars/${car.id}`, {
      id: car.id,
      unavailable_dates
    })
    .then(() => navigation.navigate('Confirmation'))
    .catch(() => {
      setLoading(false);
      Alert.alert('Não foi possível confirmar o agendamento.')
    })
    }

  function handleBack() {
    navigation.goBack();
  };

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end: format(getPlatformDate(new Date(dates[dates.length -1])), 'dd/MM/yyyy')

    })

  },[]);

  return (
    <S.Container >
      <S.Header>
        <BackButton onPress={handleBack}/>
      </S.Header>

      <S.CarImages>
        <ImageSlider 
          imagesUrl={car.photos}
        />
      </S.CarImages>
      
      <S.Content>
        <S.Details>
          <S.Description>
            <S.Brand>{car.brand}</S.Brand>
            <S.Name>{car.name}</S.Name>
          </S.Description>

          <S.Rent>
            <S.Period>{car.rent.period}</S.Period>
            <S.Price>{`R$ ${car.rent.price}`}</S.Price>
          </S.Rent>
        </S.Details>

        <S.Accessories>
          {
            car.accessories.map(accessory => (
              <Accessory 
                key={accessory.type}
                name={accessory.name} 
                icon={getAccessoryIcon(accessory.type)}
              />
            ))
          }

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
            <S.DateValue>{rentalPeriod.start}</S.DateValue>
          </S.DateInfo>

          <Feather 
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <S.DateInfo>
            <S.DateTitle>ATÉ</S.DateTitle>
            <S.DateValue>{rentalPeriod.end}</S.DateValue>
          </S.DateInfo>
        </S.RentalPeriod>

        <S.RentalPrice>
          <S.RentalPriceLabel>TOTAL</S.RentalPriceLabel>
          <S.RentalPriceDetails>
            <S.RentalPriceQuota>{`R$ ${car.rent.price} x${dates.length} diárias`}</S.RentalPriceQuota>
            <S.RentalPriceTotal>{`R$ ${totalRent}`}</S.RentalPriceTotal>
          </S.RentalPriceDetails>
        </S.RentalPrice>
      </S.Content>

      <S.Footer>
        <Button 
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleConfirmation}
          enabled={!loading}
          loading={!!loading}
        />
      </S.Footer>
    </S.Container>
  )
} 