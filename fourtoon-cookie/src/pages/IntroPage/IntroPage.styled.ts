import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: 200,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  subtitle: {
    fontFamily: 'Pretendard',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 20,
    color: '#AAAAAA',
    marginTop: 8,
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 60,
    left: 20,
    right: 20,
  },
  });