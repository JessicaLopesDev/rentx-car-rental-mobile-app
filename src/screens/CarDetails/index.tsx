import React from 'react';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';
import Animated, { 
  Extrapolate, 
  interpolate, 
  useAnimatedScrollHandler, 
  useAnimatedStyle, 
  useSharedValue 
} from 'react-native-reanimated';

import * as S from './styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Home';
import { CarDTO } from '../../dtos/CarDTO';
import { RouteProp } from '@react-navigation/native';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { StatusBar, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components';

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

  const theme = useTheme()

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      ),
    }
  });

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [0, 150],
        [1, 0],
        Extrapolate.CLAMP
      ),
    }
  });

  function handleScheduling() {
    navigation.navigate('Scheduling', { car })
  };

  function handleBack() {
    navigation.goBack();
  };

  return (
    <S.Container >
      <StatusBar 
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <Animated.View
        style={[
          headerStyleAnimation, 
          styles.header,
          { backgroundColor: theme.colors.background_secondary }
        ]}
      >
        <S.Header>
          <BackButton onPress={handleBack}/>
        </S.Header>
        <Animated.View style={sliderCarsStyleAnimation}>
          <S.CarImages>
            <ImageSlider 
              imagesUrl={car.photos}
            />
          </S.CarImages>
        </Animated.View>
      </Animated.View>
      
      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: getStatusBarHeight() + 160,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
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

        <S.About>
          {car.about}
          {car.about}
          {car.about}
          {car.about}
          {car.about}
        </S.About>
      </Animated.ScrollView>

      <S.Footer>
        <Button 
          title="Escolher período do aluguel"
          onPress={handleScheduling}
        />
      </S.Footer>
    </S.Container>
  )
} 

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1,
  }
})