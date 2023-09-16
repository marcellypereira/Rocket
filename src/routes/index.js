import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../pages/Login';
import Request from '../pages/Request';
import RequestDescription from '../pages/RequestDescription';
import DescriptionSolution from '../pages/DescriptionSolution';
import Finished from '../pages/Finished';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Request"
        component={Request}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RequestDescription"
        component={RequestDescription}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DescriptionSolution"
        component={DescriptionSolution}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Finished"
        component={Finished}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
