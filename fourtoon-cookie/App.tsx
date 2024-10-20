import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ActionSheetProvider} from "@expo/react-native-action-sheet";
import {RootStackParamList} from './src/types/routing';
import {QueryClient, QueryClientProvider} from 'react-query';
import {init} from '@amplitude/analytics-react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Sentry from "@sentry/react-native";
import './src/system/i18n';
import * as Notifications from 'expo-notifications';

import CharacterSelectPage from './src/pages/CharacterSelectPage/CharacterSelectPage';
import DiaryWritePage from './src/pages/DiaryWritePage/DiaryWritePage';
import DiaryTimelinePage from './src/pages/DiaryTimelinePage/DiaryTimelinePage';
import SignUpPage from './src/pages/SignUpPage/SignUpPage';
import IntroPage from './src/pages/IntroPage/IntroPage';
import SettingPage from './src/pages/SettingPage/SettingPage';
import BasicErrorBoundary from './src/components/error/BasicErrorBoundary';
import Toast from 'react-native-toast-message';
import {assignPushNotificationToken, unassignPushNotificationToken} from "./src/apis/notification";
import {useAccountState} from "./src/hooks/account";
import {AccountStatus} from "./src/types/account";
import {useDiaries} from "./src/hooks/server/diary";
import { registerForPushNotificationsAsync } from './src/system/notification';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>();

const queryClient = new QueryClient();

init(process.env.EXPO_PUBLIC_AMPLITUDE_KEY)
Sentry.init({
	dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
	tracesSampleRate: 1.0,
	_experiments: {
		profilesSampleRate: 1.0,
	},
});

const TabScreens = () => {
	return (
		<Tab.Navigator initialRouteName="DiaryTimelinePage" screenOptions={{ headerShown: false }}>
			<Tab.Screen name="DiaryTimelinePage" component={DiaryTimelinePage} options={{ tabBarStyle: { display: 'none' } }} />
			<Tab.Screen name="SettingPage" component={SettingPage} options={{ tabBarStyle: { display: 'none' } }} />
		</Tab.Navigator>
	)
}

const StackScreens = () => {
	const { refetch } = useDiaries();
	Notifications.setNotificationHandler({
		handleNotification: async () => {
			refetch();
			return {
				shouldShowAlert: false,
				shouldPlaySound: false,
				shouldSetBadge: false,
			}
		}
	});

	const { accountState } = useAccountState();

	useEffect(() => {
		const pushNotificationTokenProcess = async () => {
			const pushToken: string = await registerForPushNotificationsAsync();
			if (accountState == AccountStatus.LOGINED) {
				assignPushNotificationToken(pushToken);
				return;
			} 
			if (accountState == AccountStatus.UNSIGNEDUP) {
				unassignPushNotificationToken(pushToken);
			}
		}
		
		pushNotificationTokenProcess();
	}, [accountState]);

	return (
		<Stack.Navigator initialRouteName="TabScreens" screenOptions={{ headerShown: false }}>
			<Stack.Screen name="IntroPage" component={IntroPage} />
			<Stack.Screen name="DiaryWritePage" component={DiaryWritePage} />
			<Stack.Screen name="CharacterSelectPage" component={CharacterSelectPage} />
			<Stack.Screen name="SignUpPage" component={SignUpPage} />
			<Stack.Screen name="TabScreens" component={TabScreens} />
		</Stack.Navigator>
	)
}


function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<NavigationContainer>
				<BasicErrorBoundary>
					<ActionSheetProvider>
						<StackScreens />
					</ActionSheetProvider>
				</BasicErrorBoundary>
			</NavigationContainer>
			<Toast />
		</QueryClientProvider>
	);
}

export default Sentry.wrap(App);