import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  Button,
  Center,
  Input,
  TextArea,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { useRequest } from '../RequestContext';

export default function RequestDescription({ route, navigation }) {
  const { handleNewRequest } = useRequest();
  const [numeroPatrimonio, setNumeroPatrimonio] = useState('');
  const [descricaoProblema, setDescricaoProblema] = useState('');

  const handleCadastrar = () => {
    const newRequest = {
      numeroPatrimonio: numeroPatrimonio,
      descricaoProblema: descricaoProblema,
    };

    handleNewRequest(newRequest);
    navigation.navigate('Request');
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <MaterialIcons
          name="keyboard-arrow-left"
          size={33}
          color="#FFFFFF"
          onPress={() => navigation.goBack()}
        />
      ),
      headerTitle: () => (
        <Center position="absolute" right="0" left="0">
          <Text bold color="#FFFFFF" fontSize="xl">
            Solicitação
          </Text>
        </Center>
      ),
    });
  }, []);

  return (
    <View bg="#202024" flex={1} position="relative">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View flexDirection="row" alignItems="center" mt="5">
          <View ml="5">
            <MaterialIcons
              name="keyboard-arrow-left"
              size={33}
              color="#FFFFFF"
              onPress={() => navigation.goBack()}
            />
          </View>

          <Center position="absolute" right="0" left="0">
            <Text bold color="#FFFFFF" fontSize="xl">
              Solicitação
            </Text>
          </Center>
        </View>

        <Center mt="20" flex={1}>
          <Input
            variant="unstyled"
            bg="#121214"
            size="md"
            w="90%"
            h={60}
            color="#FFFFFF"
            placeholder="Número do Patrimônio"
            value={numeroPatrimonio}
            onChangeText={setNumeroPatrimonio}
            _focus={{
              bg: '#121214',
              color: '#FFFFFF',
            }}
          />

          <TextArea
            variant="unstyled"
            bg="#121214"
            size="md"
            mt="15"
            w="92%"
            h={530}
            color="#FFFFFF"
            placeholder="Descrição do problema"
            value={descricaoProblema}
            onChangeText={setDescricaoProblema}
            _focus={{
              bg: '#121214',
              color: '#FFFFFF',
            }}
          />
        </Center>
      </ScrollView>

      <Center bottom={0} pb={5}>
        <Button
          variant="unstyled"
          bg="#00875F"
          _pressed={{ bg: '#00B37E' }}
          w={{
            base: '90%',
            md: '285',
          }}
          h={60}
          onPress={handleCadastrar}
        >
          <Text bold color="#FFFFFF">
            Cadastrar
          </Text>
        </Button>
      </Center>
    </View>
  );
}
