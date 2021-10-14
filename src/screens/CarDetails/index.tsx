import React from 'react';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';

import * as S from './styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Home';
import { CarDTO } from '../../dtos/CarDTO';
import { RouteProp } from '@react-navigation/native';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

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
  // const scrollY = useSharedValue(0);
  // const scrollHandler = useAnimatedScrollHandler(event => {
  //   scrollY.value = event.contentOffset.y;
  //   console.log(event.contentOffset.y);
  // }); 

  function handleScheduling() {
    navigation.navigate('Scheduling', { car })
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
      
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: getStatusBarHeight(),
        }}
        showsVerticalScrollIndicator={false}
        //onScroll={scrollHandler}
      >
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
      </ScrollView>

      <S.Footer>
        <Button 
          title="Escolher período do aluguel"
          onPress={handleScheduling}
        />
      </S.Footer>
    </S.Container>
  )
} 