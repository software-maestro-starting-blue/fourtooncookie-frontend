import { Image, Text, TouchableOpacity, View } from 'react-native';
import * as S from "./InfoLayout.styled";
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../constants/routing';
import type { Member } from '../../../types/member';
import { useSelectedCharacterStore } from '../../../store/selectedCharacter';


export interface InfoLayoutProps {
    member: Member | null;
}

const InfoLayout = (props: InfoLayoutProps) => {
    const { member, ...rest } = props;

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { selectedCharacter } = useSelectedCharacterStore();

    const handleCharacterChangeButtonPress = () => {
        navigation.navigate('CharacterSelectPage');
    }

    return (
        <View style={S.styles.profileContainer}>
            <Image source={{uri: selectedCharacter?.selectionThumbnailUrl}} style={S.styles.profileImage} />
            <Text style={S.styles.name}>{member?.name}</Text>
            <Text style={S.styles.email}>{member?.email}</Text>
            <TouchableOpacity style={S.styles.changeCharacterButton} onPress={handleCharacterChangeButtonPress}>
                <Text style={S.styles.changeCharacterText}>캐릭터 변경</Text>
            </TouchableOpacity>
      </View>
    )
}

export default InfoLayout;