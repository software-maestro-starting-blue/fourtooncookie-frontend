import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { RootStackParamList } from './src/constants/routing';

import CharacterSelectPage from './src/pages/CharacterSelectPage/CharacterSelectPage';
import DiaryWritePage from './src/pages/DiaryWritePage/DiaryWritePage';
import DiaryTimelinePage from './src/pages/DiaryTimelinePage/DiaryTimelinePage';
import { GlobalSelectionCharacterStateProvider } from './src/global/GlobalSelectionCharacterStateContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <GlobalSelectionCharacterStateProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="CharacterSelectPage" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="DiaryTimelinePage" component={DiaryTimelinePage} />
          <Stack.Screen name="DiaryWritePage" component={DiaryWritePage} />
          <Stack.Screen name="CharacterSelectPage" component={CharacterSelectPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalSelectionCharacterStateProvider>
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
