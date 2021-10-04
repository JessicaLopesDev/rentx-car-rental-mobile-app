import React from 'react';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';

import * as S from './styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Home';
import { CarDTO } from '../../dtos/CarDTO';
import { RouteProp } from '@react-navigation/native';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

type NextScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CarDetails'
>;

type NextScreenRouteProp = RouteProp<
  RootStackParamList, 
  'CarDetails'
>;

type NextScreenProps = {
  navigation: NextScreenNavigationProp;
  route: NextScreenRouteProp;
}

interface Params {
  car: CarDTO;
}

export function CarDetails({ navigation, route }: NextScreenProps){
  const { car } = route.params as Params

  function handleScheduling() {
    navigation.navigate('Scheduling')
  };

  function handleBack() {
    navigation.goBack();
  };

  return (
    <S.Container >
      <S.Header>
        <BackButton onPress={handleBack}/>
      </S.Header>

      <S.CarImage>
        <ImageSlider 
          imagesUrl={car.photos}
        />
      </S.CarImage>
      
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

        <S.About>{car.about}</S.About>
      </S.Content>

      <S.Footer>
        <Button 
          title="Escolher período do aluguel"
          onPress={handleScheduling}
        />
      </S.Footer>
    </S.Container>
  )
} 