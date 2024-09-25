import { Platform } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import Share from 'react-native-share';
import { OS } from '../types/os';
import { Alert, Linking } from 'react-native';

// 권한 체크하는 함수
export const checkPhotoPermissions = async (): Promise<boolean> => {
    try {
        // 현재 권한 상태 확인
        const { status } = await MediaLibrary.getPermissionsAsync();

        // 이미 권한이 허용된 경우
        if (status === 'granted') {
            return true;
        }

        // 권한이 거부된 경우, 다시 요청
        const { status: newStatus } = await MediaLibrary.requestPermissionsAsync();

        if (newStatus === 'granted') {
            return true;
        }

        // 권한 요청이 거부되었을 경우, 설정으로 이동 안내
        Alert.alert(
            '권한 필요',
            '갤러리에 접근하려면 권한을 허용해야 합니다.',
            [
                { text: '취소', style: 'cancel' },
                { text: '설정', onPress: () => Linking.openSettings() }
            ]
        );
        return false;
    } catch (error) {
        console.error('권한 확인 중 오류 발생:', error);
        return false;
    }
};

// Blob 데이터를 파일로 저장하는 함수
export const saveBlobToFile = async (blob: Blob, diaryId: number): Promise<string> => {
    // iOS와 Android에 따라 파일 경로 구분
    const fileUri = Platform.OS === 'ios' 
        ? `${FileSystem.documentDirectory}${diaryId}.png`  // iOS의 경우 documentDirectory 사용
        : `${FileSystem.cacheDirectory}${diaryId}.png`;    // Android의 경우 cacheDirectory 사용

    // Blob 데이터를 Base64로 변환 후 파일에 저장
    await FileSystem.writeAsStringAsync(fileUri, await blobToBase64(blob), {
        encoding: FileSystem.EncodingType.Base64,
    });
    return fileUri; // 저장된 파일 경로 반환
};

// Blob 데이터를 Base64 문자열로 변환하는 함수
export const blobToBase64 = (blob: Blob): Promise<string> => {
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


// 이미지를 갤러리에 저장하는 함수
export const saveImageToGallery = async (fileUri: string) => {
    try {
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

// 이미지 파일을 공유하는 함수
export const shareImageFile = async (fileUri: string) => {
    // 공유 옵션 설정
    const shareOptions = {
        title: '다이어리 이미지 공유',
        url: Platform.OS === OS.IOS ? `file://${fileUri}` : fileUri,
        type: 'image/jpeg',
    };
    await Share.open(shareOptions);
}
