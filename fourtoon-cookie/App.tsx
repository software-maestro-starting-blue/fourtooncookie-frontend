import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from './src/constants/routing';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import DiaryWritePage from './src/pages/DiaryWritePage/DiaryWritePage';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="DiaryWritePage">
        <Stack.Screen name="DiaryWritePage" component={DiaryWritePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
