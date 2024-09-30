import { Platform } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import Share from 'react-native-share';
import { OS } from '../types/os';
import { Alert, Linking } from 'react-native';

export const checkPhotoPermissions = async (): Promise<boolean> => {
    try {
        const { status } = await MediaLibrary.getPermissionsAsync();

        if (status === 'granted') {
            return true;
        }

        const { status: newStatus } = await MediaLibrary.requestPermissionsAsync();

        if (newStatus === 'granted') {
            return true;
        }

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

export const saveBlobToFile = async (blob: Blob, diaryId: number): Promise<string> => {
    const fileUri = Platform.OS === 'ios' 
        ? `${FileSystem.documentDirectory}${diaryId}.png`
        : `${FileSystem.cacheDirectory}${diaryId}.png`;

    await FileSystem.writeAsStringAsync(fileUri, await blobToBase64(blob), {
        encoding: FileSystem.EncodingType.Base64,
    });
    return fileUri;
};

export const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64data = reader.result as string;
            resolve(base64data.split(',')[1]);
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(blob);
    });
};


export const saveImageToGallery = async (fileUri: string) => {
    const asset = await MediaLibrary.createAssetAsync(fileUri);
    const album = await MediaLibrary.getAlbumAsync('FourtoonCookie');
            
    if (album == null) {
        await MediaLibrary.createAlbumAsync('FourtoonCookie', asset, false);
    } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
    }

};

export const shareImageFile = async (fileUri: string) => {
    const shareOptions = {
        title: '다이어리 이미지 공유',
        url: Platform.OS === OS.IOS ? `file://${fileUri}` : fileUri,
        type: 'image/jpeg',
    };
    await Share.open(shareOptions);
}
