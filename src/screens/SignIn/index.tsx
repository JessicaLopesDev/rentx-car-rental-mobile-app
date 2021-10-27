import React, { useState } from 'react';
import { KeyboardAvoidingView, StatusBar } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import * as S from './styles';

export function SignIn(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const theme = useTheme()

  return (
    <KeyboardAvoidingView>
      <TouchableWithoutFeedback>

        <S.Container>
          <StatusBar 
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />
          <S.Header>
            <S.Title>Estamos{'\n'}quase lá.</S.Title>
            <S.Subtitle>
              Faça seu login para começar{'\n'}
              uma experiência incrível.
            </S.Subtitle>
          </S.Header>

          <S.Form>
            <Input 
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
            />

            <PasswordInput 
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
          </S.Form>

          <S.Footer>
            <Button 
              title="Login"
              onPress={() => {}}
              enabled
              loading={false}
            />
            <Button 
              title="Criar conta gratuita"
              color={theme.colors.background_secondary}
              light
              onPress={() => {}}
              enabled
              loading={false}
            />
          </S.Footer>

        </S.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}