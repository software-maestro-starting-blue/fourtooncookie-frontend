import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types/routing';
import { useSelectedCharacterStore } from '../../hooks/store/selectedCharacter';

import { useMember } from '../../hooks/server/member';
import { useFunctionWithErrorHandling } from '../../hooks/error';
import { useTranslationWithParentName } from '../../hooks/locale';

const ProfileLayout = () => {

    const { data: member } = useMember();

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { selectedCharacter } = useSelectedCharacterStore();

    const { functionWithErrorHandling } = useFunctionWithErrorHandling();

    const t = useTranslationWithParentName('pages.settingPage.profileLayout');
    const loginT = useTranslationWithParentName('login');

    const handleCharacterChangeButtonPress = functionWithErrorHandling(() => {
        navigation.navigate('CharacterSelectPage');
    })

    return (
        <View style={styles.profileContainer}>
            <Image source={{uri: selectedCharacter?.selectionThumbnailUrl}} style={styles.profileImage} />
            <Text style={styles.name}>{member?.name}</Text>
            <Text style={styles.email}>{member ? null : loginT("loginRequired")}</Text>
            <TouchableOpacity style={styles.changeCharacterButton} onPress={handleCharacterChangeButtonPress}>
                <Text style={styles.changeCharacterText}>{t("characterChange")}</Text>
            </TouchableOpacity>
      </View>
    )
}

export default ProfileLayout;

const styles = StyleSheet.create({
    profileContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
        width: "100%",
        height: "auto",
        marginBottom: 40,
      },
      profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.03)',
      },    
      name: {
        fontFamily: 'Pretendard',
        fontWeight: '700',
        fontSize: 28,
        lineHeight: 32,
        textAlign: 'center',
        letterSpacing: -0.005,
        color: '#212121',
      },
      email: {
        fontFamily: 'Pretendard',
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 20,
        textAlign: 'center',
        letterSpacing: -0.005,
        color: '#999999',
      },
      changeCharacterButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#212121',
        borderRadius: 20,
        width: 'auto',
        height: 40,
      },
      changeCharacterText: {
        fontFamily: 'Pretendard',
        fontWeight: '700',
        fontSize: 14,
        lineHeight: 16,
        color: '#FFFFFF',
      },
});