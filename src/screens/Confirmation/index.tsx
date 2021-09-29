import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useWindowDimensions, StatusBar } from 'react-native';
//import { useNavigation, useRoute } from '@react-navigation/native';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import { ConfirmButton } from '../../components/ConfirmButton';

import * as S from './styles';

// interface Params {
//   title: string;
//   message: string;
//   nextScreenRoute: string;
// }

export function Confirmation(){
  const { width } = useWindowDimensions();
  const navigation = useNavigation();

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