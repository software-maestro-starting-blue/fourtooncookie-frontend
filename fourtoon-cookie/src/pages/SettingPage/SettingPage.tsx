import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as S from './SettingPage.styled';
import type { Member } from '../../types/member';
import { getMember } from '../../apis/member';
import MenuLayout from './MenuLayout/MenuLayout';
import GlobalErrorInfoStateContext from '../../components/global/GlobalError/GlobalErrorInfoStateContext';
import { GlobalErrorInfoType } from '../../types/error';
import MainPageLayout from '../../components/layout/MainPageLayout/MainPageLayout';
import InfoLayout from './InfoLayout/InfoLayout';

const SettingPage = () => {
	const [member, setMember] = useState<Member | null>(null);
	const { errorInfo, setErrorInfo } = useContext(GlobalErrorInfoStateContext);

  	useEffect(() => {
		const fetchMember = async () => {
			try {
				const memberData = await getMember();
				setMember(memberData);
			} catch (error) {
				if (error instanceof Error) {
                    setErrorInfo({
                        type: GlobalErrorInfoType.MODAL,
                        error: error
                    });
                }
			}
		};
	
    	fetchMember();
  	}, []);

	return (
    	<MainPageLayout isHomeActivate={false} isPersonActivate={true} >
			<View style={S.styles.container}>
				<InfoLayout member={member} />
				<MenuLayout />
			</View>
    	</MainPageLayout>
  	);
};

export default SettingPage;