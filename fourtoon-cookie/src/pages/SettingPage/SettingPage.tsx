import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as S from './SettingPage.styled';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Member } from '../../types/member';
import { getMember } from '../../apis/member';
import CharacterSelectPage from '../CharacterSelectPage/CharacterSelectPage';

const SettingPage = () => {
  const [member, setMember] = useState<Member | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const memberData = await getMember('2abae1cc-c4c3-4349-b8aa-38e4fefbd7fa');
        setMember(memberData);
      } catch (error) {
        console.error('Failed to fetch member data:', error);
      }
    };

    fetchMember();
  }, []);

  const handleCharacterChange = () => {
    navigation.navigate(CharacterSelectPage as never);
  };

  const handleLogout = () => {
    console.log("Logout Pressed");
  };

  const handleInquiry = () => {
    console.log("Inquiry Pressed");
  };

  return (
    <SafeAreaView style={S.styles.container}>
      <Text style={S.styles.title}>설정</Text>

      <View style={S.styles.body}>
        <View style={S.styles.section}>
          <Text style={S.styles.sectionTitle}>로그인 정보</Text>
          <View style={S.styles.box}>
            <Text style={S.styles.infoText}>이름: {member ? member.name : 'Loading...'}</Text>
            <Text style={S.styles.infoText}>연결된 계정: {member ? member.email : 'Loading...'}</Text>
          </View>
        </View>

        <View style={S.styles.section}>
          <Text style={S.styles.sectionTitle}>캐릭터 정보</Text>
          <View style={S.styles.box}>
            <View style={S.styles.character}>
              <Image
                style={S.styles.characterCircle}
                source={require('./naruto.png')}
              />
              <TouchableOpacity style={S.styles.changeButton} onPress={handleCharacterChange}>
                <Text style={S.styles.changeButtonText}>캐릭터 변경</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <View style={S.styles.footer}>
        <TouchableOpacity onPress={handleInquiry}>
          <Text style={S.styles.inquiryText}>문의하기</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={S.styles.logoutText}>탈퇴하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SettingPage;
