import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Logo from '../../assets/logo.svg';
import { Card } from '../../components/Card';
import { useNavigation } from '@react-navigation/native';

import * as S from './styles';
import { StackNavigationProp } from '@react-navigation/stack';
import api from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';
import { Load } from '../../components/Load';


export type RootStackParamList = {
  Home: undefined;
  CarDetails: { car: CarDTO } | undefined;
  Scheduling: undefined;
  SchedulingDetails: undefined;
  Confirmation: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

export function Home(){
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car })
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/cars');
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  },[]);

  return (
    <S.Container>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <S.Header>
        <Logo 
          width={RFValue(114)}
          height={RFValue(11)}
        />
        <S.TotalCars>Total de 12 carros</S.TotalCars>
      </S.Header>
      { loading ? 
        <Load /> :

        <S.CarList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => 
            <Card 
              data={item}
              onPress={() => handleCarDetails(item)}
            />
          }
        />
      }
    </S.Container>
  )
}