import { SafeAreaView } from "react-native";
import { Header } from "react-native/Libraries/NewAppScreen";
import TextInputLayer from "../../components/diarywrite/TextInputLayer/TextInputLayer";
import HashtagLayer from "../../components/diarywrite/HashtagLayer/HashtagLayer";

import * as S from "./DiaryWritePage.styled";


const DiaryWritePage = () => {

    // TODO: state 넘어올 때 처리 (수정 상태이거나, 캐릭터 선택 후 상태)

    // TODO: GPS API 긁어와서 날씨 정보 받아오기
    
    // TODO: 자동 태깅 기능 구현
    

    const onBackButtonPress = () => {
        // TODO: 뒤로가기 버튼 눌렀을 때
        console.log('back');
    }

    const onCharacterChooseButtonPress = () => {
        // TODO: 캐릭터 선택 버튼 눌렀을 때
        console.log('character choose');
    }

    const onDiaryWriteButtonPress = () => {
        // TODO: 일기 작성 버튼 눌렀을 때
        console.log('diary write');
    }

    const onTextInputChange = (text: string) => {
        // TODO: 텍스트 입력 시
        console.log(text);
    }

    return (
        <SafeAreaView style={S.styles.container}>
            <Header />
            <TextInputLayer />
            <HashtagLayer />
        </SafeAreaView>
    );
}

export default DiaryWritePage;