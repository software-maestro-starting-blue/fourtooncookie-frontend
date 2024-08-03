import { Image, Text, TouchableOpacity, View } from 'react-native';
import * as S from "./CharacterInfoLayout.styled";
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../constants/routing';



const CharacterInfoLayout = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const onCharacterChangeButtonPress = () => {
        navigation.navigate('CharacterSelectPage');
    }

    return (
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