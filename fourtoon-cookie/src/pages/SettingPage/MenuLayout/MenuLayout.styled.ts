import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 20,
    width: 350,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    width: 350,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
  },
  menuText: {
    fontFamily: 'Pretendard',
    fontWeight: '400',
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.005,
    color: '#212121',
  },
  deleteText: {
    color: '#F60D0D',
  },
  chevronRight: {
    width: 24,
    height: 24,
  },
});