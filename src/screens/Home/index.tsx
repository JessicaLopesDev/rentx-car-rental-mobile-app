import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Logo from '../../assets/logo.svg';
import { Card } from '../../components/Card';
import { useNavigation } from '@react-navigation/native';

import * as S from './styles';


export function Home(){
  const navigation = useNavigation();


  const carData = {
    brand: 'AUDI',
    name: 'RS 5 Coupé',
    rent: {
      period: 'Ao dia',
      price: 120,
    },
    thumbnail: 'https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png',
  };

  function handleCarDetails() {
    navigation.navigate('CarDetails')
  }

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

      <S.CarList
        data={[1, 2, 3, 4, 5, 6]}
        keyExtractor={item => String(item)}
        renderItem={({ item }) => 
          <Card 
            data={carData}
            onPress={handleCarDetails}
          />
        }
      />

    </S.Container>
  )
}