import React, { useState, useEffect } from 'react';
import {
  Button,
  Center,
  Image,
  Input,
  ScrollView,
  Text,
  View,
} from 'native-base';
import {
  MaterialCommunityIcons,
  Ionicons,
  MaterialIcons,
} from '@expo/vector-icons';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setEmail('');
      setPassword('');
    });

    return unsubscribe;
  }, [navigation]);

  const handleLogin = () => {
    setEmailError('');
    setPasswordError('');

    if (email === 'teste@teste.com' && password === '1234') {
      setFormSubmitted(true);
      navigation.navigate('Request');
    } else {
      if (email !== 'teste@teste.com') {
        setEmailError('Email inválido');
      }
      if (password !== '1234') {
        setPasswordError('Senha incorreta');
      }
    }
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    if (emailError) {
      setEmailError('');
    }

    const isValidEmail = text.includes('@') && text.includes('.');
    setIsEmailValid(isValidEmail);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (passwordError) {
      setPasswordError('');
    }

    const isValidPassword = text.length >= 8;
    setIsPasswordValid(isValidPassword);
  };

  const handleEmailBlur = () => {
    setEmailFocused(false);
  };

  const handlePasswordBlur = () => {
    setPasswordFocused(false);
  };

  const handleEmailIconClick = () => {
    if (!isEmailValid) {
      setEmail('');
      setEmailError('');
    }
  };

  const handlePasswordIconClick = () => {
    if (!isPasswordValid) {
      setPassword('');
      setPasswordError('');
    }
  };

  return (
    <ScrollView flex={1} bg="#202024" showsVerticalScrollIndicator={false}>
      <Center mt="15%">
        <Image source={require('../../../assets/logoRocket.png')} alt="logo" />
        <Text color="#E1E1E6" fontSize="xl" mt="22%" fontWeight="bold">
          Acesse sua conta
        </Text>

        <View mt="7%" position="relative">
          <Input
            variant="filled"
            placeholder="E-mail"
            pl="7"
            placeholderTextColor="#7C7C8A"
            borderColor={
              (formSubmitted && isEmailValid) ||
              (emailFocused && emailError === '') ||
              (isEmailValid && !emailFocused && !emailError)
                ? '#00875F'
                : emailError
                ? '#F75A68'
                : '#121214'
            }
            borderRadius="5"
            bg="#121214"
            fontSize="sm"
            w={{
              base: '90%',
              md: '285',
            }}
            h={59}
            _focus={{
              borderColor: '#121214',
              bg: '#121214',
              color: '#FFFFFF',
            }}
            color={emailFocused ? '#FFFFFF' : '#FFFFFF'}
            autoCapitalize="none"
            autoCorrect={false}
            InputLeftElement={
              <MaterialCommunityIcons
                name="email-outline"
                size={22}
                left="25%"
                color={
                  isEmailValid
                    ? '#00875F'
                    : emailFocused && !emailError
                    ? '#00875F'
                    : emailError
                    ? '#F75A68'
                    : '#7C7C8A'
                }
                onPress={handleEmailIconClick}
              />
            }
            value={email}
            onChangeText={handleEmailChange}
            onFocus={() => {
              setEmailError('');
              setEmailFocused(true);
            }}
            onBlur={handleEmailBlur}
          />
          {emailError ? (
            <Text color="#F75A68" fontSize="xs">
              {emailError}
            </Text>
          ) : null}
          <Input
            mt="5%"
            variant="filled"
            placeholder="Senha"
            pl="7"
            placeholderTextColor="#7C7C8A"
            borderColor={
              (formSubmitted && isPasswordValid) ||
              (passwordFocused && passwordError === '') ||
              (isPasswordValid && !passwordFocused && !passwordError)
                ? '#00875F'
                : passwordError
                ? '#F75A68'
                : '#121214'
            }
            borderRadius="5"
            bg="#121214"
            fontSize="sm"
            w={{
              base: '90%',
              md: '285',
            }}
            h={59}
            _focus={{
              borderColor: '#121214',
              bg: '#121214',
              color: '#FFFFFF',
            }}
            color={passwordFocused ? '#FFFFFF' : '#FFFFFF'}
            InputLeftElement={
              <MaterialIcons
                name="vpn-key"
                size={22}
                left="25%"
                color={
                  isPasswordValid
                    ? '#00875F'
                    : passwordFocused && !passwordError
                    ? '#00875F'
                    : passwordError
                    ? '#F75A68'
                    : '#7C7C8A'
                }
                onPress={handlePasswordIconClick}
              />
            }
            InputRightElement={
              <Ionicons
                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                size={24}
                right="20%"
                color="#7C7C8A"
                onPress={() => setShowPassword(!showPassword)}
              />
            }
            value={password}
            onChangeText={handlePasswordChange}
            onFocus={() => {
              setPasswordError('');
              setPasswordFocused(true);
            }}
            onBlur={handlePasswordBlur}
            secureTextEntry={!showPassword}
          />
          {passwordError ? (
            <Text color="#F75A68" fontSize="xs">
              {passwordError}
            </Text>
          ) : null}
        </View>
        <Button
          variant="unstyled"
          onPress={handleLogin}
          w={{
            base: '90%',
            md: '285',
          }}
          h={60}
          mt="8%"
          bg="#00875F"
          _pressed={{ bg: '#00B37E' }}
        >
          <Text bold color="#FFFFFF">
            Entrar
          </Text>
        </Button>
      </Center>
    </ScrollView>
  );
}
