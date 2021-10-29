import React, { useState } from 'react';
import { 
  KeyboardAvoidingView, 
  TouchableWithoutFeedback, 
  Keyboard
} from 'react-native';
import { useTheme } from 'styled-components';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { PasswordInput } from '../../../components/PasswordInput';
import * as S from './styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../Home';

type NextScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SignUpSecondStep'
>;

type NextScreenRouteProp = RouteProp<
  RootStackParamList, 
  'SignUpSecondStep'
>;

type NextScreenProps = {
  navigation: NextScreenNavigationProp;
  route: NextScreenRouteProp;
}

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  }
}

export function SignUpSecondStep({ navigation, route }: NextScreenProps){
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const theme = useTheme();

  const { user } = route.params as Params;
  

  function handleRegister() {
    navigation.navigate('Confirmation')
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
            <S.FormTitle>1.Senha</S.FormTitle>
            <PasswordInput 
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
            <PasswordInput 
              iconName="lock"
              placeholder="Repetir senha"
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
          </S.Form>
          <Button 
            title="Cadastrar" 
            color={theme.colors.success}
            onPress={handleRegister}
          />

        </S.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}