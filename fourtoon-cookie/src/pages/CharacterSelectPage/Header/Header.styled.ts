import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    position: 'relative',
    width: '100%',
    height: 64,
  },
  backButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'flex-end',
    position: 'relative'
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: "45%",
},
  text: {
      fontFamily: 'Pretendard',
      fontWeight: '600',
      fontSize: 17,
      lineHeight: 24,
      display: 'flex',
      alignItems: 'center',
      letterSpacing: -0.5,
      color: '#212121',
  },

});