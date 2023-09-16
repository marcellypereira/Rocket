import React from 'react';
import { View, ScrollView, Text, Center } from 'native-base';
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Foundation,
} from '@expo/vector-icons';

import moment from 'moment';

export default function Finished({ route, navigation }) {
  const { numeroPatrimonio, descricaoProblema, solution } = route.params;

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
          <MaterialCommunityIcons
            name="check-decagram-outline"
            size={20}
            color="#04D361"
          />
          <Text
            ml="2"
            fontSize="sm"
            textTransform="uppercase"
            color="#04D361"
            bold
          >
            Finalizado
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
              <Foundation name="clipboard-notes" size={20} color="#996DFF" />
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
          <Text color="#FFFFFF" mt="2">
            {solution}
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
      </ScrollView>
    </View>
  );
}
