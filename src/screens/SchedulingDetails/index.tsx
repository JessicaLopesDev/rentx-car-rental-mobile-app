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
import { useNetInfo } from '@react-native-community/netinfo';

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
  const [updatedCar, setUpdatedCar] = useState<CarDTO>({} as CarDTO);

  const netInfo  = useNetInfo();
  const theme = useTheme();
  const { car, dates } = route.params as Params
  const totalRent = Number(dates.length * car.price);

  async function handleConfirmation() {
    setLoading(true)

    await api.post('/rentals', {
      user_id: 2,
      car_id: car.id,
      start_date: new Date(dates[0]),
      end_date: new Date(dates[dates.length -1]),
      total: totalRent
    })
    .then(() => navigation.navigate('Confirmation', {
      nextScreenRoute: 'Home',
      title: 'Carro alugado!',
      message: `Agora você só precisa ir\naté a concessionária da RENTX\npegar o seu automóvel.`
    }))
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

  useEffect(() => {
    async function fetchUpdatedCar() {
      const response = await api.get(`/cars/${car.id}`);
      setUpdatedCar(response.data);
    }
    if(netInfo.isConnected === true) {
      fetchUpdatedCar();
    }
  },[netInfo.isConnected])

  return (
    <S.Container >
      <S.Header>
        <BackButton onPress={handleBack}/>
      </S.Header>

      <S.CarImages>
        <ImageSlider 
          imagesUrl={!!updatedCar.photos ? 
            updatedCar.photos : [{ id: car.thumbnail, photo: car.thumbnail }]}
        />
      </S.CarImages>
      
      <S.Content>
        <S.Details>
          <S.Description>
            <S.Brand>{car.brand}</S.Brand>
            <S.Name>{car.name}</S.Name>
          </S.Description>

          <S.Rent>
            <S.Period>{car.period}</S.Period>
            <S.Price>{`R$ ${car.price}`}</S.Price>
          </S.Rent>
        </S.Details>

        { 
          updatedCar.accessories &&
          <S.Accessories>
            {
              updatedCar.accessories.map(accessory => (
                <Accessory 
                  key={accessory.type}
                  name={accessory.name}
                  icon={getAccessoryIcon(accessory.type)}
                />
              ))
            }
          </S.Accessories>
        }

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
            <S.RentalPriceQuota>{`R$ ${car.price} x${dates.length} diárias`}</S.RentalPriceQuota>
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