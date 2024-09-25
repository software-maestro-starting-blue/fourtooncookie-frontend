import React, { useEffect, useRef, useState } from 'react';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { StyleSheet } from 'react-native';
import { RootStackParamList } from './src/types/routing';
import { QueryClient, QueryClientProvider } from 'react-query';

import CharacterSelectPage from './src/pages/CharacterSelectPage/CharacterSelectPage';
import DiaryWritePage from './src/pages/DiaryWritePage/DiaryWritePage';
import DiaryTimelinePage from './src/pages/DiaryTimelinePage/DiaryTimelinePage';
import SignUpPage from './src/pages/SignUpPage/SignUpPage';
import IntroPage from './src/pages/IntroPage/IntroPage';
import SettingPage from './src/pages/SettingPage/SettingPage';
import { ErrorBoundary } from 'react-error-boundary';
import BasicErrorBoundary from './src/components/error/BasicErrorBoundary/BasicErrorBoundary';

const Stack = createNativeStackNavigator<RootStackParamList>();

const queryClient = new QueryClient();

export default function App() {

	return (
		<BasicErrorBoundary >
			<QueryClientProvider client={queryClient}>
				<NavigationContainer>
					<ActionSheetProvider>
						<Stack.Navigator initialRouteName="DiaryTimelinePage" screenOptions={{ headerShown: false }}>
							<Stack.Screen name="IntroPage" component={IntroPage} />
							<Stack.Screen name="DiaryTimelinePage" component={DiaryTimelinePage} options={{ animation: "none" }} />
							<Stack.Screen name="DiaryWritePage" component={DiaryWritePage} />
							<Stack.Screen name="CharacterSelectPage" component={CharacterSelectPage} />
							<Stack.Screen name="SignUpPage" component={SignUpPage} />
							<Stack.Screen name="SettingPage" component={SettingPage} options={{ animation: "none" }} />
						</Stack.Navigator>
					</ActionSheetProvider>
				</NavigationContainer>
			</QueryClientProvider>
		</ErrorBoundary>
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
