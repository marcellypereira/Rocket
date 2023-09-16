import React from 'react';
import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { RequestProvider } from './src/pages/RequestContext';

import Routes from './src/routes';

export default function App() {
  return (
    <RequestProvider>
      <NavigationContainer>
        <StatusBar backgroundColor="#202024" />
        <NativeBaseProvider>
          <Routes />
        </NativeBaseProvider>
      </NavigationContainer>
    </RequestProvider>
  );
}
