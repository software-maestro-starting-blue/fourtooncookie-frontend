import React, { ReactNode, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as S from './SettingPage.styled';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Member } from '../../types/member';
import { getMember } from '../../apis/member';
import CharacterSelectPage from '../CharacterSelectPage/CharacterSelectPage';
import LoginInfoLayout from './LoginInfoLayout/LoginInfoLayout';
import CharacterInfoLayout from './CharacterInfoLayout/CharacterInfoLayout';
import Footer from './Footer/Footer';

const SettingPage = () => {
	const [member, setMember] = useState<Member | null>(null);=

  	useEffect(() => {
		const fetchMember = async () => {
			try {
				const memberData = await getMember();
				setMember(memberData);
			} catch (error) {
				console.error('Failed to fetch member data:', error);
			}
		};
	
    	fetchMember();
  	}, []);

	return (
    	<SafeAreaView style={S.styles.container}>
      		<Text style={S.styles.title}>설정</Text>

	    	<View style={S.styles.body}>
				<ContainerBox title="로그인 정보">
					<LoginInfoLayout member={member} />
				</ContainerBox>
				<ContainerBox title="캐릭터 정보">
					<CharacterInfoLayout />
				</ContainerBox>
			</View>

			<Footer />
    	</SafeAreaView>
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
			<Text style={S.styles.sectionTitle}>title</Text>
			<View style={S.styles.box}>
				{children}
			</View>
		</View>
	);
}