import { Image, Text, TouchableOpacity, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../constants/routing';
import { useSelectedCharacterStore } from '../../../store/selectedCharacter';

import * as S from "./ProfileLayout.styled";
import { useAccountStore } from '../../../store/account';

const ProfileLayout = () => {

    const { member } = useAccountStore();

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { selectedCharacter } = useSelectedCharacterStore();

    const handleCharacterChangeButtonPress = () => {
        navigation.navigate('CharacterSelectPage');
    }

    return (
        <View style={S.styles.profileContainer}>
            <Image source={{uri: selectedCharacter?.selectionThumbnailUrl}} style={S.styles.profileImage} />
            <Text style={S.styles.name}>{member?.name}</Text>
            <Text style={S.styles.email}>{member ? null : "로그인 해주세요."}</Text>
            <TouchableOpacity style={S.styles.changeCharacterButton} onPress={handleCharacterChangeButtonPress}>
                <Text style={S.styles.changeCharacterText}>캐릭터 변경</Text>
            </TouchableOpacity>
      </View>
    )
}

export default ProfileLayout;