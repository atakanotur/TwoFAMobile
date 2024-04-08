import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../theme/colors';

const width = Dimensions.get('window').width;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  headerText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: colors.red,
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputContainer: {
    height: 60,
    margin: 12,
    padding: 10,
    width: width - 20,
  },
  textInput: {
    fontSize: 22,
    color: colors.red,
  },
  loginButton: {
    height: 70,
    backgroundColor: colors.green,
    width: width - 20,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  loginButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    color: 'white',
  },
  register: {
    height: 70,
    width: '100%',
    flexDirection: 'row',
  },
  registerText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  registerButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.green,
  },
  remember: {
    height: 70,
    width: '100%',
  },
  rememberButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.red,
  },
});
