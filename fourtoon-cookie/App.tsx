import React, { useEffect, useRef, useState } from 'react';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { StyleSheet } from 'react-native';
import { RootStackParamList } from './src/constants/routing';

import CharacterSelectPage from './src/pages/CharacterSelectPage/CharacterSelectPage';
import DiaryWritePage from './src/pages/DiaryWritePage/DiaryWritePage';
import DiaryTimelinePage from './src/pages/DiaryTimelinePage/DiaryTimelinePage';
import SignUpPage from './src/pages/SignUpPage/SignUpPage';
import IntroPage from './src/pages/IntroPage/IntroPage';
import SettingPage from './src/pages/SettingPage/SettingPage';
import { useCharacterListStore } from './src/store/characterList';
import { useJWTStore } from './src/store/jwt';
import { useMemberStore } from './src/store/member';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {

	const [ isLoaded, setIsLoaded ] = useState<boolean>(false);

	const { jwt } = useJWTStore();
	const { member, reloadMember, logoutMember } = useMemberStore();
	const { updateCharacterList } = useCharacterListStore();

	const navigationRef = useRef<NavigationContainerRef<RootStackParamList> | null>(null);

	const navigateByMemberStatus = async () => {
		if (! jwt) {
			navigationRef.current?.navigate('IntroPage');
			return;
		}

		if (! member){
			navigationRef.current?.navigate('SignUpPage');
		}

		navigationRef.current?.navigate('DiaryTimelinePage');
    }

	useEffect(() => {
		if (jwt) {
			reloadMember();
			updateCharacterList();
		}

		setIsLoaded(true);
	}, [jwt, reloadMember, updateCharacterList, isLoaded]);

	useEffect(() => {
		navigateByMemberStatus();
	}, [member, jwt]);

	useEffect(() => {
		if (member && ! jwt){
			logoutMember();
		}
	}, [member, jwt]);

	if (! isLoaded) return null;

	return (
		<NavigationContainer ref={navigationRef}>
			<ActionSheetProvider>
				<Stack.Navigator initialRouteName="IntroPage" screenOptions={{ headerShown: false }}>
					<Stack.Screen name="IntroPage" component={IntroPage} />
					<Stack.Screen name="DiaryTimelinePage" component={DiaryTimelinePage} options={{ animation: "none" }} />
					<Stack.Screen name="DiaryWritePage" component={DiaryWritePage} />
					<Stack.Screen name="CharacterSelectPage" component={CharacterSelectPage} />
					<Stack.Screen name="SignUpPage" component={SignUpPage} />
					<Stack.Screen name="SettingPage" component={SettingPage} options={{ animation: "none" }} />
				</Stack.Navigator>
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
