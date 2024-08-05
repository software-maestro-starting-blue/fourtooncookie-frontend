import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as S from './SettingPage.styled';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { Member } from '../../types/member';
import { getMember } from '../../apis/member';
import CharacterSelectPage from '../CharacterSelectPage/CharacterSelectPage';
import LoginInfoLayout from './LoginInfoLayout/LoginInfoLayout';
import CharacterInfoLayout from './CharacterInfoLayout/CharacterInfoLayout';
import InfoLayout from './InfoLayout/InfoLayout';
import GlobalJwtTokenStateContext from '../../components/global/GlobalJwtToken/GlobalJwtTokenStateContext';
import GlobalErrorInfoStateContext from '../../components/global/GlobalError/GlobalErrorInfoStateContext';
import { GlobalErrorInfoType } from '../../types/error';
import Footer from '../../components/common/Footer/Footer';
import MainPageLayout from '../../components/layout/MainPageLayout/MainPageLayout';

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
      		<Text style={S.styles.title}>설정</Text>

	    	<View style={S.styles.body}>
				<ContainerBox title="로그인 정보">
					<LoginInfoLayout member={member} />
				</ContainerBox>
				<ContainerBox title="캐릭터 정보">
					<CharacterInfoLayout />
				</ContainerBox>
			</View>

			<InfoLayout />

    	</MainPageLayout>
  	);
};

export default SettingPage;

interface ContainerBoxProps {
	title: string;
	children: ReactNode;
}


const ContainerBox = (props: ContainerBoxProps) => {
	const { title, children } = props;

	return (
		<View style={S.styles.section}>
			<Text style={S.styles.sectionTitle}>{title}</Text>
			<View style={S.styles.box}>
				{children}
			</View>
		</View>
	);
}