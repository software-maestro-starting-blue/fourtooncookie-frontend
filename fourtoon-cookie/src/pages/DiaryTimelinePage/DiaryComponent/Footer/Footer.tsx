import React from "react";
import { Image, TouchableOpacity, View, Platform, Alert, Linking } from "react-native";
import FAVORITE_ACTIVATE_ICON from "../../../../../assets/icon/favorite-activate.png";
import FAVORITE_INACTIVATE_ICON from "../../../../../assets/icon/favorite-inactivate.png";
import DOWNLOAD_ICON from "../../../../../assets/icon/download.png";
import UPLOAD_ICON from "../../../../../assets/icon/upload.png";
import * as S from './Footer.styled';
import { useUpdateDiaryFavorite } from "../../../../hooks/server/diary";
import Share from 'react-native-share';
import { getDiaryImage, saveImageToGallery } from "../../../../apis/diary";
import * as MediaLibrary from 'expo-media-library';

export interface FooterProps {
    diaryId: number;
    isFavorite: boolean;
}

const DiaryActionsLayout = (props: FooterProps) => {
    const {diaryId, isFavorite, ...rest} = props;

    const { mutate: updateDiaryFavorite } = useUpdateDiaryFavorite(diaryId);

    const handleToggleFavorite = async () => {
        updateDiaryFavorite(! isFavorite);
    }

    const handleDownload = async () => {
        try {
              // 갤러리 접근 권한 요청
            const { status } = await MediaLibrary.requestPermissionsAsync();

            // 권한이 없을 경우, 알림을 띄우고 저장을 중단
            if (status !== 'granted') {
                Alert.alert(
                    '권한 필요',
                    '갤러리에 이미지를 저장하려면 권한을 허용해야 합니다.',
                    [
                        { text: '취소', style: 'cancel' },
                        { text: '설정', onPress: () => Linking.openSettings() }
                    ]
                );
                return;
            }

            // 스프링 서버에서 이미지 다운
            const fileUri = await getDiaryImage(diaryId);
            // 갤러리에 이미지 저장
            await saveImageToGallery(fileUri);
            Alert.alert('이미지 저장 성공', '이미지를 갤러리에 저장했습니다.');
        } catch (error) {
            Alert.alert('이미지 저장 실패', '이미지를 갤러리에 저장하지 못했습니다.');
            console.error('이미지 다운로드 또는 갤러리 저장 중 오류 발생:', error);
        }
    };

    const handleShare = async () => {
        try {
            // 서버에서 이미지 다운로드
            const fileUri = await getDiaryImage(diaryId);

            // 공유 옵션 설정
            const shareOptions = {
                title: '다이어리 이미지 공유',
                url: Platform.OS === 'ios' ? `file://${fileUri}` : fileUri,
                type: 'image/jpeg',
            };

            // 공유 실행
            await Share.open(shareOptions);
        } catch (error: any) {
            // 유저가 공유박스를 열고 닫은 경우는 alert창을 뱉지 않기 위함
            // 리액트네이티브가(android, ios)가 뱉는 에러 메시지가 'User did not share' 임.
            if (error.message !== 'User did not share') {
                console.error('이미지 공유 중 오류 발생:', error);
                Alert.alert('공유 오류', '이미지 공유에 실패했습니다.');
            }
        }
    };

    return (
        <View style={S.styles.footer}>
            <View style={S.styles.favoriteButton}>
                <TouchableOpacity onPress={handleToggleFavorite}>
                    <Image
                        source={isFavorite ? FAVORITE_ACTIVATE_ICON : FAVORITE_INACTIVATE_ICON}
                        style={S.styles.image}
                    />
                </TouchableOpacity>
            </View>

            <View style={S.styles.actionButtons}>
                <TouchableOpacity onPress={handleDownload}>
                    <Image source={DOWNLOAD_ICON}
                    style={S.styles.image} />
                </TouchableOpacity>

                <TouchableOpacity onPress={handleShare}>
                    <Image source={UPLOAD_ICON}
                    style={S.styles.image} />
                </TouchableOpacity>
            </View>
            <View style={S.styles.actionButtons}>
            </View>
        </View>
    );
};

export default DiaryActionsLayout;