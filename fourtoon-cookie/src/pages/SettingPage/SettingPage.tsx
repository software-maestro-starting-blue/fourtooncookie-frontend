import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as S from './SettingPage.styled';
import type { Member } from '../../types/member';
import { getMember } from '../../apis/member';
import MenuLayout from './MenuLayout/MenuLayout';
import GlobalJwtTokenStateContext from '../../components/global/GlobalJwtToken/GlobalJwtTokenStateContext';
import GlobalErrorInfoStateContext from '../../components/global/GlobalError/GlobalErrorInfoStateContext';
import { GlobalErrorInfoType } from '../../types/error';
import MainPageLayout from '../../components/layout/MainPageLayout/MainPageLayout';
import InfoLayout from './InfoLayout/InfoLayout';

const SettingPage = () => {
	const [member, setMember] = useState<Member | null>(null);
	const jwtContext = useContext(GlobalJwtTokenStateContext);
	const { errorInfo, setErrorInfo } = useContext(GlobalErrorInfoStateContext);

  	useEffect(() => {
		const fetchMember = async () => {
			try {
				const memberData = await getMember(jwtContext);
				setMember(memberData);
			} catch (error) {
				if (error instanceof Error) {
                    setErrorInfo({
                        type: GlobalErrorInfoType.MODAL,
                        error: error
                    });
                }
                jwtContext.setJwtToken(null);
			}
		};
	
    	fetchMember();
  	}, [jwtContext]);

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