export default {
    expo: {
        "name": "fourtoon-cookie",
        "slug": "fourtoon-cookie",
        "version": "1.0.0",
        "orientation": "portrait",
        "icon": "./assets/icon.png",
        "userInterfaceStyle": "automatic",
        "splash": {
            "image": "./assets/splash.png",
            "resizeMode": "contain",
            "backgroundColor": "#FFFFFF"
        },
        android: {
            "adaptiveIcon": {
                "foregroundImage": "./assets/adaptive-icon.png",
                "backgroundColor": "#ffffff"
            },
            package: process.env.ANDROID_PACKAGE,
            googleServicesFile: process.env.ANDROID_GOOGLE_SERVICES_FILE
        },
        ios: {
            "supportsTablet": true,
            "bundleIdentifier": process.env.BUNDLE_IDENTIFIER,
            googleServicesFile: process.env.IOS_GOOGLE_SERVICES_FILE,
            "infoPlist": {
                "CFBundleURLTypes": [
                    {
                        "CFBundleURLSchemes": [
                            process.env.CF_BUNDLE_URL_SCHEMES
                        ]
                    }
                ]
            }
        },
        "web": {
            "favicon": "./assets/favicon.png"
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
