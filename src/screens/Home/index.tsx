import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Logo from '../../assets/logo.svg';
import { Card } from '../../components/Card';
import { useNavigation } from '@react-navigation/native';

import * as S from './styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import api from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';
import { Load } from '../../components/Load';
import { useTheme } from 'styled-components';


export type RootStackParamList = {
  Home: undefined;
  CarDetails: {} | undefined;
  Scheduling: {} | undefined;
  SchedulingDetails: {} | undefined;
  Confirmation: undefined;
  MyCars: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

export function Home(){
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const theme = useTheme();

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car })
  }

  function handleMyCars() {
    navigation.navigate('MyCars');
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
        <S.TotalCars>{`Total de ${cars.length} carros`}</S.TotalCars>
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

      <S.MyCarsButton onPress={handleMyCars}>
        <Ionicons 
          name="ios-car-sport"
          size={32}
          color={theme.colors.shape}
        />
      </S.MyCarsButton>
    </S.Container>
  )
}