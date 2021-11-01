import React, { useState } from 'react';
import { 
  KeyboardAvoidingView, 
  TouchableWithoutFeedback, 
  Keyboard,
  Alert
} from 'react-native';
import { useTheme } from 'styled-components';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { PasswordInput } from '../../../components/PasswordInput';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../Home';
import api from '../../../services/api';
import * as S from './styles';

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

  async function handleRegister() {
    if(!password || !passwordConfirm) {
      Alert.alert('Informe a senha e a confirmação')
    }
    if(password != passwordConfirm) {
      Alert.alert('As senhas não são iguais')
    }

    await api.post('/users', {
      name: user.name,
      email: user.email,
      driver_license: user.driverLicense,
      password
    })
    .then(() => {
      navigation.navigate('Confirmation', {
        nextScreenRoute: 'SignIn',
        title: 'Conta criada!',
        message: `Agora é só fazer o login\n e aproveitar.`
      })
    })
    .catch(() => {
      Alert.alert('Opa', 'Não foi possível cadastrar');
    });
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
              <Bullet/>
              <Bullet active/>
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