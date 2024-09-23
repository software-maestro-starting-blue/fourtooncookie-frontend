import type { Diary } from "../types/diary";
import type { DiaryCreatedResponse, DiaryPatchFavoriteRequest, DiarySaveRequest, DiarySavedResponse, DiaryUpdateRequest } from "../types/dto/diary";
import { requestApi } from "./api";
import { LocalDate } from "@js-joda/core";
import { ApiError } from "../error/ApiError";
import { API_METHOD_TYPE, API_STATUS } from "../constants/api";
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { Platform, Alert } from 'react-native';

export const getDiary = async (diaryId: number): Promise<Diary> => {
    const response = await requestApi(`/diary/${diaryId}`, API_METHOD_TYPE.GET);

    if (response.status !== API_STATUS.SUCCESS) {
        throw new ApiError("일기를 불러오는 중 오류가 발생했습니다.", response.status);
    }

    const diaryResponse: DiarySavedResponse = await response.json();
    return { ...diaryResponse, diaryDate: LocalDate.parse(diaryResponse.diaryDate) };
}

export const getDiaries = async (pageNumber: number): Promise<Diary[]> => {
    const response = await requestApi(`/diary/timeline?pageNumber=${pageNumber}`, API_METHOD_TYPE.GET);

    if (response.status === API_STATUS.SUCCESS) {
        const responseData = await response.json();

        if (!Array.isArray(responseData.diarySavedResponses)) {
            throw new ApiError("잘못된 응답 형식입니다. 일기 목록을 불러오지 못했습니다.");
        }

        const diaryResponses = responseData.diarySavedResponses as DiarySavedResponse[];

        return diaryResponses.map(diary => ({...diary, diaryDate: LocalDate.parse(diary.diaryDate)}));
    } else if (response.status === API_STATUS.NO_CONTENT) {
        return [];
    } else {
        throw new ApiError("일기 목록을 불러오는 중 오류가 발생했습니다.", response.status);
    }
}

export const postDiary = async (characterId: number, date: LocalDate, content: string) : Promise<number> => {

    const requestBody: DiarySaveRequest = {
        characterId: characterId,
        content: content,
        diaryDate: date,
    };

    const response = await requestApi(`/diary`, API_METHOD_TYPE.POST, requestBody);

    if (! (response.status == API_STATUS.SUCCESS || response.status == API_STATUS.CREATED)) {
        throw new ApiError("일기를 저장하는 중 오류가 발생했습니다. 다시 시도해 주세요.", response.status);
    }

    const responseData: DiaryCreatedResponse = await response.json();

    return responseData.diaryId;
}

export const putDiary = async (characterId: number, diaryId: number, content: string) => {
    
    const requestBody: DiaryUpdateRequest = {
        content: content,
        characterId: characterId
    }; 
    const response = await requestApi(`/diary/${diaryId}`, API_METHOD_TYPE.PUT, requestBody);
    
    if (response.status != API_STATUS.SUCCESS) {
        throw new ApiError("일기를 수정하는 중 오류가 발생했습니다. 다시 시도해 주세요.", response.status);
    }
}

export const deleteDiary = async (diaryId: number): Promise<void> => {
    const response = await requestApi(`/diary/${diaryId}`, API_METHOD_TYPE.DELETE);

    if (response.status != API_STATUS.NO_CONTENT) {
        throw new ApiError("일기를 삭제하는 중 오류가 발생했습니다. 다시 시도해 주세요.", response.status);
    }
};

export const patchDiaryFavorite = async (diaryId: number, isFavorite: boolean): Promise<void> => {
    const requestBody: DiaryPatchFavoriteRequest = {
        isFavorite: isFavorite
    }

    const response = await requestApi(`/diary/${diaryId}/favorite`, API_METHOD_TYPE.PATCH, requestBody);

    if (response.status != API_STATUS.SUCCESS) {
        throw new ApiError("일기 즐겨찾기 중 오류가 발생했습니다. 다시 시도해 주세요.", response.status);
    }
};

export const getDiaryImage = async (diaryId: number): Promise<string> => {
    const response = await requestApi(`/diary/${diaryId}/download`, API_METHOD_TYPE.GET);
    if (!response.ok) {
        throw new Error('이미지 다운로드 요청 중 오류가 발생했습니다.');
    }

    // 서버에서 Blob 형태로 데이터를 받음
    const blob = await response.blob();

    // Blob 데이터를 파일로 저장
    const fileUri = `${FileSystem.documentDirectory}${diaryId}.jpg`;

    // 파일로 저장 후 URI 반환
    await FileSystem.writeAsStringAsync(fileUri, await blobToBase64(blob), {
        encoding: FileSystem.EncodingType.Base64,
    });
    return fileUri;
};

export const saveImageToGallery = async (fileUri: string) => {
    try {
        // 갤러리 접근 권한 요청
        const { status } = await MediaLibrary.requestPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('권한 필요', '갤러리에 이미지를 저장하려면 권한이 필요합니다.');
            return;
        }

        // MediaLibrary에 파일 저장 (갤러리로 이동)
        const asset = await MediaLibrary.createAssetAsync(fileUri);
        // 앨범이 이미 있는지 확인
        const album = await MediaLibrary.getAlbumAsync('FourtoonCookie');
                
        if (album == null) {
            // 앨범이 없으면 새로 생성
            await MediaLibrary.createAlbumAsync('FourtoonCookie', asset, false);
        } else {
            // 앨범이 이미 있으면 기존 앨범에 추가
            await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
        }
    } catch (error) {
        console.error('갤러리에 저장하는 중 오류 발생:', error);
    }
};

// Blob 데이터를 Base64 문자열로 변환
const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64data = reader.result as string;
            resolve(base64data.split(',')[1]); // Data URL에서 Base64 부분만 추출
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(blob);  // Blob 데이터를 Data URL로 변환
    });
};
