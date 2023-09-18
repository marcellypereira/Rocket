import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  Button,
  Center,
  HStack,
  Image,
} from 'native-base';
import {
  MaterialIcons,
  Ionicons,
  Fontisto,
  SimpleLineIcons,
  MaterialCommunityIcons,
  Feather,
} from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import moment from 'moment';
import { useRequest } from '../RequestContext';
import notifee, { AndroidImportance } from '@notifee/react-native';

export default function Request({ navigation }) {
  const { requests, completedRequests, handleNewRequest } = useRequest();
  const [activeButton, setActiveButton] = useState('emAndamento');

  const createAndDisplayNotification = async () => {
    await notifee.requestPermission();

    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });

    const title = 'Bem-vindo ao nosso aplicativo!';
    const text = 'Você fez login com sucesso.';

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

  const createAndDisplayLogoutNotification = async () => {
    await notifee.requestPermission();

    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });

    const title = 'Até logo!';
    const text = 'Você fez logout com sucesso.';

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

  const handleLogout = () => {
    createAndDisplayLogoutNotification();
    navigation.navigate('Login');
  };

  useEffect(() => {
    createAndDisplayNotification();
  }, []);

  return (
    <View bg="#121214" flex={1} position="relative">
      <ScrollView flex={1} showsVerticalScrollIndicator={false}>
        <HStack
          bg="#202024"
          p={7}
          justifyContent="space-between"
          alignItems="center"
        >
          <Image source={require('../../../assets/logo.png')} alt="logo" />
          <MaterialIcons
            name="logout"
            size={24}
            color="#7C7C8A"
            onPress={handleLogout}
          />
        </HStack>

        <View p={6}>
          <HStack justifyContent="space-between">
            <Text fontSize="xl" color="#FFFFFF">
              Solicitações
            </Text>
            <Text fontSize="xl" color="#FFFFFF">
              {activeButton === 'emAndamento'
                ? requests.length
                : completedRequests.length}
            </Text>
          </HStack>
        </View>

        <HStack justifyContent="space-around" pb="5">
          <Button
            variant="unstyled"
            flex={1}
            ml="5"
            mr="2"
            bg="#202024"
            borderWidth={1}
            borderColor={activeButton === 'emAndamento' ? '#FBA94C' : '#7C7C8A'}
            onPress={() =>
              setActiveButton(
                activeButton === 'emAndamento' ? null : 'emAndamento',
              )
            }
          >
            <Text
              textTransform="uppercase"
              fontSize="xs"
              color={activeButton === 'emAndamento' ? '#FBA94C' : '#7C7C8A'}
            >
              Em andamento
            </Text>
          </Button>
          <Button
            variant="unstyled"
            flex={1}
            mr="5"
            ml="2"
            bg="#202024"
            borderWidth={1}
            borderColor={activeButton === 'finalizados' ? '#04D361' : '#7C7C8A'}
            onPress={() =>
              setActiveButton(
                activeButton === 'finalizados' ? null : 'finalizados',
              )
            }
          >
            <Text
              textTransform="uppercase"
              fontSize="xs"
              color={activeButton === 'finalizados' ? '#04D361' : '#7C7C8A'}
            >
              Finalizados
            </Text>
          </Button>
        </HStack>

        <ScrollView>
          {activeButton === 'emAndamento' ? (
            requests.length > 0 ? (
              requests.map((request, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    navigation.navigate('DescriptionSolution', {
                      numeroPatrimonio: request.numeroPatrimonio,
                      descricaoProblema: request.descricaoProblema,
                      solution: request.solution,
                    })
                  }
                >
                  <View
                    p={6}
                    bg="#202024"
                    ml="4"
                    mr="4"
                    mt="3"
                    borderRadius="5"
                    borderLeftWidth={5}
                    borderLeftColor="#FBA94C"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <View>
                      <Text fontSize="sm" color="#FFFFFF">
                        Número de Patrimônio {request.numeroPatrimonio}
                      </Text>
                      <View mt="2" flexDirection="row" alignItems="center">
                        <Fontisto name="clock" size={15} color="#7C7C8A" />
                        <Text ml="2" fontSize="xs" color="#7C7C8A">
                          {moment(request.emissao).format('YYYY-MM-DD HH:mm')}
                        </Text>
                      </View>
                    </View>
                    <View bg="#323238" p="3" borderRadius="50">
                      <SimpleLineIcons
                        name="hourglass"
                        size={20}
                        color="#FBA94C"
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Center mt="20">
                <Ionicons
                  name="md-chatbox-ellipses-outline"
                  size={40}
                  color="#323238"
                />
                <Text
                  fontSize="md"
                  mt={3}
                  maxWidth={200}
                  textAlign="center"
                  color="#7C7C8A"
                >
                  Você ainda não tem chamados criados
                </Text>
              </Center>
            )
          ) : completedRequests.length > 0 ? (
            completedRequests.map((request, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate('Finished', {
                    numeroPatrimonio: request.numeroPatrimonio,
                    descricaoProblema: request.descricaoProblema,
                    solution: request.solution,
                  })
                }
              >
                <View
                  p={6}
                  bg="#202024"
                  ml="4"
                  mr="4"
                  mt="3"
                  borderRadius="5"
                  borderLeftWidth={5}
                  borderLeftColor="#04D361"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <View>
                    <Text fontSize="sm" color="#FFFFFF">
                      Número de Patrimônio {request.numeroPatrimonio}
                    </Text>
                    <View mt="2" flexDirection="row" alignItems="center">
                      <Fontisto name="clock" size={15} color="#7C7C8A" />
                      <Text ml="2" fontSize="xs" color="#7C7C8A">
                        {moment(request.emissao).format('YYYY-MM-DD HH:mm')}
                      </Text>
                    </View>
                  </View>
                  <View bg="#323238" p="3" borderRadius="50">
                    <MaterialCommunityIcons
                      name="check-decagram-outline"
                      size={20}
                      color="#04D361"
                    />
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Center mt="20">
              <Feather name="check-circle" size={40} color="#323238" />
              <Text
                fontSize="md"
                mt={3}
                maxWidth={200}
                textAlign="center"
                color="#7C7C8A"
              >
                Não há chamados finalizados
              </Text>
            </Center>
          )}
        </ScrollView>
      </ScrollView>
      <Center bottom={0} pb={5} mt="10">
        <Button
          variant="unstyled"
          bg="#00875F"
          _pressed={{ bg: '#00B37E' }}
          w={{
            base: '90%',
            md: '285',
          }}
          h={60}
          onPress={() =>
            navigation.navigate('RequestDescription', {
              currentRequests: requests,
            })
          }
        >
          <Text bold color="#FFFFFF">
            Nova Solicitação
          </Text>
        </Button>
      </Center>
    </View>
  );
}
