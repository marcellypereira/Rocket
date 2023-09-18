import React, { useState } from 'react';
import { View, ScrollView, Text, Center, Button, TextArea } from 'native-base';
import {
  MaterialIcons,
  SimpleLineIcons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import moment from 'moment';
import { useRequest } from '../RequestContext';
import notifee, { AndroidImportance } from '@notifee/react-native';

export default function DescriptionSolution({ route, navigation }) {
  const { numeroPatrimonio, descricaoProblema } = route.params;
  const { handleNewRequest } = useRequest();

  const [solution, setSolution] = useState('');

  const createAndDisplayNotificationFinalizado = async () => {
    await notifee.requestPermission();

    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });

    const title = 'Ticket Concluído!';
    const text = 'Seu ticket foi concluído com sucesso.';

    await notifee.displayNotification({
      title: title,
      body: text,
      android: {
        channelId,
        pressAction: {
          id: 'default',
        },
      },
    });
  };

  const handleCadastrar = () => {
    const newRequest = {
      numeroPatrimonio,
      descricaoProblema,
      solution,
      timestamp: new Date(),
      status: 'finalizado',
    };

    handleNewRequest(newRequest);

    createAndDisplayNotificationFinalizado();

    navigation.navigate('Request');
  };

  return (
    <View flex={1} position="relative" bg="#121214">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          flexDirection="row"
          alignItems="center"
          pt="5"
          pb="9"
          bg="#202024"
        >
          <View ml="4">
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
        <Center flexDirection="row" bg="#29292E" p="6">
          <SimpleLineIcons name="hourglass" size={20} color="#FBA94C" />
          <Text
            ml="2"
            fontSize="sm"
            textTransform="uppercase"
            color="#FBA94C"
            bold
          >
            Em Andamento
          </Text>
        </Center>
        <View>
          <View bg="#202024" m="4" mt="7" p="7" borderRadius="5">
            <View flexDirection="row">
              <MaterialCommunityIcons
                name="cellphone-link"
                size={20}
                color="#996DFF"
              />
              <Text color="#7C7C8A" ml="3" textTransform="uppercase">
                Equipamento
              </Text>
            </View>
            <Text color="#FFFFFF" mt="2">
              Patrimônio {numeroPatrimonio}
            </Text>
          </View>
          <View bg="#202024" m="4" mt="2" p="7" borderRadius="5">
            <View flexDirection="row">
              <MaterialCommunityIcons
                name="cellphone-link"
                size={20}
                color="#996DFF"
              />
              <Text color="#7C7C8A" ml="3" textTransform="uppercase">
                Descrição do problema
              </Text>
            </View>
            <Text color="#FFFFFF" mt="2">
              {descricaoProblema}
            </Text>
            <View
              borderBottomWidth={1}
              borderBottomColor="#29292E"
              mt="2"
              width="100%"
            />
            <Text color="#7C7C8A" mt="2" fontSize="xs">
              Registrado em {moment().format('YYYY-MM-DD ')} às{' '}
              {moment().format('HH:mm')}
            </Text>
          </View>
        </View>
        <View bg="#202024" m="4" mt="2" p="7" borderRadius="5">
          <View flexDirection="row">
            <MaterialCommunityIcons
              name="check-decagram-outline"
              size={20}
              color="#996DFF"
            />
            <Text color="#7C7C8A" ml="3" textTransform="uppercase">
              Solução
            </Text>
          </View>
          <TextArea
            variant="unstyled"
            p={0}
            h={200}
            mt={3}
            value={solution}
            onChangeText={(text) => setSolution(text)}
            fontSize="sm"
            color="#FFFFFF"
            _focus={{
              color: '#FFFFFF',
            }}
          ></TextArea>
        </View>
      </ScrollView>
      <Center bottom={0} pb={5} pt={5}>
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
            Finalizar
          </Text>
        </Button>
      </Center>
    </View>
  );
}
