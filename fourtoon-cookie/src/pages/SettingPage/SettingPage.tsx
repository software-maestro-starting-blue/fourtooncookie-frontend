import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as S from './SettingPage.styled';
import type { Member } from '../../types/member';
import MenuLayout from './MenuLayout/MenuLayout';
import { GlobalErrorInfoType } from '../../types/error';
import MainPageLayout from '../../components/layout/MainPageLayout/MainPageLayout';
import ProfileLayout from './ProfileLayout/ProfileLayout';
import handleError from '../../error/errorhandler';
import { FOOTER_STATE } from '../../components/layout/MainPageLayout/Footer/Footer';

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