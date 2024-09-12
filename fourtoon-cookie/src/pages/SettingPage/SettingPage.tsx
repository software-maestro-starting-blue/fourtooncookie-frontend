import React from 'react';
import { View } from 'react-native';
import MainPageLayout from '../../components/layout/MainPageLayout/MainPageLayout';
import { FOOTER_STATE } from '../../components/layout/MainPageLayout/Footer/Footer';

import ProfileLayout from './ProfileLayout/ProfileLayout';
import MenuLayout from './MenuLayout/MenuLayout';
import * as S from './SettingPage.styled';

const SettingPage = () => {

	return (
    	<MainPageLayout footerState={FOOTER_STATE.SETTING} >
			<View style={S.styles.container}>
				<ProfileLayout />
				<MenuLayout />
			</View>
    	</MainPageLayout>
  	);
};

export default SettingPage;