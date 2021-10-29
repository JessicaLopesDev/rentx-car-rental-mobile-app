import React from 'react';
import { useWindowDimensions, StatusBar } from 'react-native';
import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';
import { ConfirmButton } from '../../components/ConfirmButton';
import { StackNavigationProp } from '@react-navigation/stack';

import * as S from './styles';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../Home';

type NextScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Confirmation'
>;

type NextScreenRouteProp = RouteProp<
  RootStackParamList, 
  'Confirmation'
>;

type NextScreenProps = {
  navigation: NextScreenNavigationProp;
  route: NextScreenRouteProp;
}

interface Params {
  title: string;
  message: string;
  nextScreenRoute: string;
}

export function Confirmation({ navigation, route }: NextScreenProps){
  const { width } = useWindowDimensions();
  const { title, message, nextScreenRoute } = route.params as Params;

  const handleConfirm = () => {
    if (!!nextScreenRoute && nextScreenRoute === 'SignIn') {
      navigation.navigate('SignIn');
      return;
    } 

    navigation.navigate('Home');
  }

  return (
    <S.Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <LogoSvg width={width}/>

      <S.Content>
        <DoneSvg width={80} height={80} />
        <S.Title>{title}</S.Title>

        <S.Message>{message}</S.Message>
      </S.Content>

      <S.Footer>
        <ConfirmButton title="OK" onPress={handleConfirm} />
      </S.Footer>

    </S.Container>
  )
}