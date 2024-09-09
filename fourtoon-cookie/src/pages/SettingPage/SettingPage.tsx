import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as S from './SettingPage.styled';
import type { Member } from '../../types/member';
import { getMember } from '../../apis/member';
import MenuLayout from './MenuLayout/MenuLayout';
import { GlobalErrorInfoType } from '../../types/error';
import MainPageLayout from '../../components/layout/MainPageLayout/MainPageLayout';
import InfoLayout from './InfoLayout/InfoLayout';
import handleError from '../../error/errorhandler';
import { FOOTER_STATE } from '../../components/layout/MainPageLayout/Footer/Footer';

const SettingPage = () => {
	const [member, setMember] = useState<Member | null>(null);

  	useEffect(() => {
		const fetchMember = async () => {
			try {
				const memberData = await getMember();
				setMember(memberData);
			} catch (error) {
				if (error instanceof Error) {
                    handleError(
						error,
						GlobalErrorInfoType.ALERT
					);
                }
			}
		};
	
    	fetchMember();
  	}, []);

	return (
    	<MainPageLayout footerState={FOOTER_STATE.SETTING} >
			<View style={S.styles.container}>
				<InfoLayout member={member} />
				<MenuLayout />
			</View>
    	</MainPageLayout>
  	);
};

export default SettingPage;