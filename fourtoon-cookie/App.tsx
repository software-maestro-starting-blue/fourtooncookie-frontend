import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { StyleSheet } from 'react-native';
import { RootStackParamList } from './src/constants/routing';

import CharacterSelectPage from './src/pages/CharacterSelectPage/CharacterSelectPage';
import DiaryWritePage from './src/pages/DiaryWritePage/DiaryWritePage';
import DiaryTimelinePage from './src/pages/DiaryTimelinePage/DiaryTimelinePage';
import GlobalSelectionCharacterStateProvider from './src/components/global/GlobalSelectionCharacter/GlobalSelectionCharacterStateProvider';
import SignUpPage from './src/pages/SignUpPage/SignUpPage';
import IntroPage from './src/pages/IntroPage/IntroPage';
import SettingPage from './src/pages/SettingPage/SettingPage';
import GlobalCharacterListStateProvider from './src/components/global/GlobalCharacterList/GlobalCharacterListStateProvider';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
	return (
		<NavigationContainer>
			<ActionSheetProvider>
				<GlobalCharacterListStateProvider>
					<GlobalSelectionCharacterStateProvider>
						<Stack.Navigator initialRouteName="IntroPage" screenOptions={{ headerShown: false }}>
							<Stack.Screen name="IntroPage" component={IntroPage} />
							<Stack.Screen name="DiaryTimelinePage" component={DiaryTimelinePage} options={{ animation: "none" }} />
							<Stack.Screen name="DiaryWritePage" component={DiaryWritePage} />
							<Stack.Screen name="CharacterSelectPage" component={CharacterSelectPage} />
							<Stack.Screen name="SignUpPage" component={SignUpPage} />
							<Stack.Screen name="SettingPage" component={SettingPage} options={{ animation: "none" }} />
						</Stack.Navigator>
					</GlobalSelectionCharacterStateProvider>
				</GlobalCharacterListStateProvider>
			</ActionSheetProvider>
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
