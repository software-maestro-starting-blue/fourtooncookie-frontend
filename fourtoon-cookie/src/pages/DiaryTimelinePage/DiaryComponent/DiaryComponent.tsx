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
import GlobalJwtTokenStateContext from "../../../components/global/GlobalJwtToken/GlobalJwtTokenStateContext";
import GlobalErrorInfoStateContext from "../../../components/global/GlobalError/GlobalErrorInfoStateContext";
import { GlobalErrorInfoType } from "../../../types/error";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";

export interface DiaryProps {
    diary: Diary,
    onDelete: () => void
}

const DiaryComponent = (props: DiaryProps) => {
    const { diary, onDelete, ...rest } = props;
    const { diaryId, content, isFavorite: initialFavorite, diaryDate, paintingImageUrls, hashtagIds } = diary;
    
    const [isFavorite, setIsFavorite] = useState(initialFavorite);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const jwtContext = useContext(GlobalJwtTokenStateContext);
    const { errorInfo, setErrorInfo } = useContext(GlobalErrorInfoStateContext);

    const handleToggleFavorite = async () => {
        try {
            await patchDiaryFavorite(diaryId, !isFavorite, jwtContext);
            setIsFavorite(!isFavorite);
        } catch (error) {
            if (error instanceof Error) {
                setErrorInfo({
                    type: GlobalErrorInfoType.MODAL,
                    error: error
                });
            }
        }
    };

    const handleDownload = () => {
        //TODO: 다운로드 로직 구현
    };

    const handleShare = () => {
        //TODO: 공유 로직 구현
    };

    const handleEdit = () => {
        navigation.navigate("DiaryWritePage", { diary: diary, isEdit: true });
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
                isFavorite={isFavorite}
                onToggleFavorite={handleToggleFavorite}
                onShare={handleShare}
                onDownload={handleDownload}
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
