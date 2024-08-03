import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { RootStackParamList } from './src/constants/routing';

import CharacterSelectPage from './src/pages/CharacterSelectPage/CharacterSelectPage';
import DiaryWritePage from './src/pages/DiaryWritePage/DiaryWritePage';
import DiaryTimelinePage from './src/pages/DiaryTimelinePage/DiaryTimelinePage';
import GlobalSelectionCharacterStateProvider from './src/components/global/GlobalSelectionCharacter/GlobalSelectionCharacterStateProvider';
import SignUpPage from './src/pages/SignUpPage/SignUpPage';
import GlobalJwtTokenStateProvider from './src/components/global/GlobalJwtToken/GlobalJwtTokenStateProvider';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <GlobalJwtTokenStateProvider>
      <GlobalSelectionCharacterStateProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="DiaryTimelinePage" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="DiaryTimelinePage" component={DiaryTimelinePage} />
            <Stack.Screen name="DiaryWritePage" component={DiaryWritePage} />
            <Stack.Screen name="CharacterSelectPage" component={CharacterSelectPage} />
            <Stack.Screen name="SignUpPage" component={SignUpPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </GlobalSelectionCharacterStateProvider>
    </GlobalJwtTokenStateProvider>
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
