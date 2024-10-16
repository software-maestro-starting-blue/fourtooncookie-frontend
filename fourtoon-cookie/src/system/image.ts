import { Platform } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import Share from 'react-native-share';
import { OS } from '../types/os';
import { Alert, Linking } from 'react-native';
import i18n from './i18n';

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
            i18n.t('system.image.permissionRequired'),
            i18n.t('system.image.permissionRequiredDetail'),
            [
                { text: i18n.t("common.cancel"), style: 'cancel' },
                { text: i18n.t("common.setting"), onPress: () => Linking.openSettings() }
            ]
        );
        return false;
    } catch (error) {
        console.error('error with permission checking:', error);
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
        title: i18n.t('system.image.shareTitle'),
        url: Platform.OS === OS.IOS ? `file://${fileUri}` : fileUri,
        type: 'image/jpeg',
    };
    await Share.open(shareOptions);
}
