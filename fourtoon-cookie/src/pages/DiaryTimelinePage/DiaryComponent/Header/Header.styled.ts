import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 40,
      },
      profile: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        width: '35%',
        height: 40,
      },
      profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.03)',
      },
      profileText: {
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        width: 'auto',
        height: 40,
      },
      profileName: {
        fontFamily: 'Pretendard',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: 16,
        lineHeight: 20,
        color: '#212121',
      },
      profileDate: {
        fontFamily: 'Pretendard',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 14,
        lineHeight: 16,
        color: '#999999',
      },
      moreIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 36,
        height: 36,
        backgroundColor: '#F7F7F7',
        borderRadius: 20,
      },
      moreShape: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
      }
});