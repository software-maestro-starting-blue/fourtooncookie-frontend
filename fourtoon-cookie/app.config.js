export default {
    expo: {
        owner: "startingblue",
        "name": process.env.PROJECT_NAME,
        "slug": process.env.SLUG,
        "version": "1.0.0",
        "orientation": "portrait",
        "icon": "./assets/logo/logo-3.png",
        "userInterfaceStyle": "automatic",
        "splash": {
            "image": "./assets/logo/logo-3.png",
            "resizeMode": "contain",
            "backgroundColor": "#FFFFFF"
        },
        android: {
            permissions: [
                "WRITE_EXTERNAL_STORAGE",
                "READ_EXTERNAL_STORAGE"
            ],
            "adaptiveIcon": {
                "foregroundImage": "./assets/logo/logo-3.png",
                "backgroundColor": "#ffffff"
            },
            package: process.env.ANDROID_PACKAGE,
        },
        ios: {
            "supportsTablet": true,
            "usesAppleSignIn": true,
            "bundleIdentifier": process.env.BUNDLE_IDENTIFIER,
            "infoPlist": {
                "CFBundleURLTypes": [
                    {
                        "CFBundleURLSchemes": [
                            process.env.CF_BUNDLE_URL_SCHEMES
                        ],
                        "NSPhotoLibraryAddUsageDescription": "사진을 저장하기 위해 갤러리 접근 권한이 필요합니다.",
                        "NSPhotoLibraryUsageDescription": "사진을 저장하기 위해 갤러리 접근 권한이 필요합니다.",
                    }
                ]
            }
        },
        "web": {
            "favicon": "./assets/logo/logo-3.png"
        },
        "extra": {
            "eas": {
                "projectId": process.env.EAS_PROJECT_ID
            }
        },
        "runtimeVersion": {
            "policy": "appVersion"
        },
        "updates": {
            "url": process.env.EXPO_UPDATES_URL
        }
    },
};
