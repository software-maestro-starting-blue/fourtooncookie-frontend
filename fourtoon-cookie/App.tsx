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
import IntroPage from './src/pages/IntroPage/IntroPage';
import SettingPage from './src/pages/SettingPage/SettingPage';
import GlobalErrorInfoStateProvider from './src/components/global/GlobalError/GlobalErrorInfoStateProvider';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
    <GlobalErrorInfoStateProvider>
      <GlobalJwtTokenStateProvider>
        <GlobalSelectionCharacterStateProvider>
            <Stack.Navigator initialRouteName="IntroPage" screenOptions={{ headerShown: false }}>
              <Stack.Screen name="IntroPage" component={IntroPage} />
              <Stack.Screen name="DiaryTimelinePage" component={DiaryTimelinePage} />
              <Stack.Screen name="DiaryWritePage" component={DiaryWritePage} />
              <Stack.Screen name="CharacterSelectPage" component={CharacterSelectPage} />
              <Stack.Screen name="SignUpPage" component={SignUpPage} />
              <Stack.Screen name="SettingPage" component={SettingPage} />
            </Stack.Navigator>
        </GlobalSelectionCharacterStateProvider>
      </GlobalJwtTokenStateProvider>
    </GlobalErrorInfoStateProvider>
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
