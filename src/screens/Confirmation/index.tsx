import React from 'react';
import { useWindowDimensions, StatusBar } from 'react-native';
//import { useNavigation, useRoute } from '@react-navigation/native';
import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';
import { ConfirmButton } from '../../components/ConfirmButton';
import { StackNavigationProp } from '@react-navigation/stack';

import * as S from './styles';

type RootStackParamList = {
  Confirmation: undefined;
  Home: undefined;
};

type NextScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Confirmation'
>;

type NextScreenProps = {
  navigation: NextScreenNavigationProp;
}

// interface Params {
//   title: string;
//   message: string;
//   nextScreenRoute: string;
// }

export function Confirmation({ navigation }: NextScreenProps){
  const { width } = useWindowDimensions();

  const handleConfirm = () => {
    navigation.navigate('Home')
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
        <S.Title>Carro alugado</S.Title>

        <S.Message>
          Agora você só precisa ir {'\n'}
          até a concessionária da RENTX {'\n'}
          pegar o seu automóvel.
        </S.Message>
      </S.Content>

      <S.Footer>
        <ConfirmButton title="OK" onPress={handleConfirm} />
      </S.Footer>

    </S.Container>
  )
}