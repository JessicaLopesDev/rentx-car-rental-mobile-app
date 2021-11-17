import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Card } from '../../components/Card';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CarDTO } from '../../dtos/CarDTO';
import { LoadAnimation } from '../../components/LoadAnimation';
import { useNetInfo } from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync';
import { database } from '../../database'
import { Car as ModelCar } from '../../database/model/Car';
import api from '../../services/api';
import Logo from '../../assets/logo.svg';
import * as S from './styles';

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
  const [cars, setCars] = useState<ModelCar[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const netInfo = useNetInfo();

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car })
  }

  async function offlineSynchronize(){
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const response = await api
          .get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`);

        const { changes, latestVersion } = response.data;
        return { changes, timestamp: latestVersion };
      },
      pushChanges: async ({ changes }) => {
        const user = changes.users;
        await api.post('/users/sync', user);
      },
    });
  }

  useEffect(() => {
    let isMounted = true;

    async function fetchCars() {
      try {
        const carCollection = database.get<ModelCar>('cars');
        const cars = await carCollection.query().fetch();
        if (isMounted) {
          setCars(cars);
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

  useEffect(() => {
    if(netInfo.isConnected === true){
      offlineSynchronize();
    }
  },[netInfo.isConnected])

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


