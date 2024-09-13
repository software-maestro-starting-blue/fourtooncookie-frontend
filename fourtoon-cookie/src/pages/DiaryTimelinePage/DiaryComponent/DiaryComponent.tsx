import React, { useContext, useState } from "react";
import { View } from "react-native";
import { NavigationProp, useNavigation } from '@react-navigation/native';
import ConfirmationModal from "../../../components/common/Modal/ConfirmationModal/ConfirmationModal";
import { patchDiaryFavorite } from '../../../apis/diary';
import { Diary } from "../../../types/diary";
import DiaryContentsLayout from "./DiaryContentsLayout/DiaryContentsLayout";
import DiaryPaintingImagesLayout from "./DiaryPaintingImagesLayout/DiaryPaintingImagesLayout";
import * as S from './DiaryComponent.styled';
import { RootStackParamList } from "../../../constants/routing";
import { GlobalErrorInfoType } from "../../../types/error";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import handleError from "../../../error/errorhandler";

export interface DiaryProps {
    diary: Diary,
    onDelete: () => void
}

const DiaryComponent = (props: DiaryProps) => {
    const { diary, onDelete, ...rest } = props;
    const { diaryId, content, isFavorite, diaryDate, paintingImageUrls } = diary;

    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleDownload = () => {
        //TODO: 다운로드 로직 구현
    };

    const handleShare = () => {
        //TODO: 공유 로직 구현
    };

    const handleEdit = () => {
        navigation.navigate("DiaryWritePage", { currentDiaryId: diaryId });
    };

    const handleDelete = () => {
        setIsModalVisible(true);
    };

    const handleConfirmDelete = () => {
        setIsModalVisible(false);
        onDelete();
    };

    return (
        <View style={S.styles.container}>
            <Header
                characterId={diary.characterId}
                date={diaryDate}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            <DiaryPaintingImagesLayout imageUrls={paintingImageUrls} />
            <DiaryContentsLayout
                content={content}     
            />
            <Footer
                diaryId={diaryId}
                isFavorite={isFavorite}
            />
            <ConfirmationModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onConfirm={handleConfirmDelete}
                message="정말 삭제하시겠습니까?"
            />
        </View>
    );
};

export default DiaryComponent;
