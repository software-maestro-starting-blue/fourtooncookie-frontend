import { Image, Text, TouchableOpacity, View } from 'react-native';
import * as S from "./CharacterInfoLayout.styled";
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../constants/routing';
import type { Character } from '../../../types/character';
import { useContext } from 'react';
import GlobalJwtTokenStateContext from '../../../components/global/GlobalJwtToken/GlobalJwtTokenStateContext';
import GlobalSelectionCharacterStateContext from '../../../components/global/GlobalSelectionCharacter/GlobalSelectionCharacterStateContext';



const CharacterInfoLayout = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const character: Character | null = useContext(GlobalSelectionCharacterStateContext).selectedCharacter;

    const onCharacterChangeButtonPress = () => {
        navigation.navigate('CharacterSelectPage');
    }

    return ( // TODO: 캐릭터 이미지 추가
        <View style={S.styles.character}>
            <Image
                style={S.styles.characterCircle}
            />
            <TouchableOpacity style={S.styles.changeButton} onPress={onCharacterChangeButtonPress}>
                <Text style={S.styles.changeButtonText}>캐릭터 변경</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CharacterInfoLayout;