import { useNavigation } from '@react-navigation/core';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { 
  KeyboardAvoidingView, 
  TouchableWithoutFeedback, 
  Keyboard
} from 'react-native';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { RootStackParamList } from '../../Home';
import * as S from './styles';

type NextScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SignUpFirstStep'
>;

type NextScreenRouteProp = RouteProp<
  RootStackParamList, 
  'SignUpFirstStep'
>;

type NextScreenProps = {
  navigation: NextScreenNavigationProp;
}

export function SignUpFirstStep({ navigation }: NextScreenProps){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [driverLicense, setDriverLicense] = useState('');

  function handleRegister() {
    navigation.navigate('SignUpSecondStep')
  };

  function handleBack() {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
        <S.Container>
          <S.Header>
            <BackButton onPress={handleBack}/>
            <S.Steps>
              <Bullet active/>
              <Bullet/>
            </S.Steps>
          </S.Header>

          <S.Title>
            Crie sua{'\n'}conta
          </S.Title>
          <S.Subtitle>
            Faça seu cadastro de{'\n'}
            forma rápida e fácil.
          </S.Subtitle>

          <S.Form>
            <S.FormTitle>1.Dados</S.FormTitle>
            <Input 
              iconName="user"
              placeholder="Nome"
              onChangeText={setName}
              value={name}
            />

            <Input 
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              onChangeText={setEmail}
              value={email}
            />

            <Input 
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
              onChangeText={setDriverLicense}
              value={driverLicense}
            />

          </S.Form>
          <Button 
            title="Próximo" 
            onPress={handleRegister}
          />

        </S.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}