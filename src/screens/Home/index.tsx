import React, { useEffect, useState } from 'react';
import { Alert, StatusBar, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Logo from '../../assets/logo.svg';
import { Card } from '../../components/Card';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import api from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';
import { LoadAnimation } from '../../components/LoadAnimation';
import * as S from './styles';
import { useNetInfo } from '@react-native-community/netinfo';

export type RootStackParamList = {
  SignIn: {} | undefined;
  SignUpFirstStep: {} | undefined;
  SignUpSecondStep: {} | undefined;
  Confirmation: {} | undefined;
  Splash: undefined;
  Home: {} | undefined;
  CarDetails: {} | undefined;
  Scheduling: {} | undefined;
  SchedulingDetails: {} | undefined;
  MyCars: undefined;
  Profile: undefined;
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
    let isMounted = true;

    async function fetchCars() {
      try {
        const response = await api.get('/cars');
        if (isMounted) {
          setCars(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchCars();

    return () => {
      isMounted = false;
    };
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
        {
          !loading &&
          <S.TotalCars>
            {`Total de ${cars.length} carros`}
          </S.TotalCars>
        }
      </S.Header>
      { loading ? 
        <LoadAnimation /> :

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
  );
}
