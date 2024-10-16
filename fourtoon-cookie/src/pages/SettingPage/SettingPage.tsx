import React from 'react';
import { StyleSheet, View } from 'react-native';
import MainPageLayout from '../../components/layout/MainPageLayout/MainPageLayout';
import { FOOTER_STATE } from '../../components/layout/MainPageLayout/Footer/Footer';

import ProfileLayout from './ProfileLayout';
import MenuLayout from './MenuLayout';

const SettingPage = () => {

	return (
    	<MainPageLayout footerState={FOOTER_STATE.SETTING} >
			<View style={styles.container}>
				<ProfileLayout />
				<MenuLayout />
			</View>
    	</MainPageLayout>
  	);
};

export default SettingPage;

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  alignItems: 'center',
	  padding: 20,
	}
	});