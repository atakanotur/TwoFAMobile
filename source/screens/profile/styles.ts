import {StyleSheet} from 'react-native';
import colors from '../../theme/colors';
import {responsiveFontSize} from '../../theme/responsiveFontSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  banner: {
    backgroundColor: colors.white,
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: colors.green,
  },
  bannerText: {
    fontSize: responsiveFontSize(50),
    fontWeight: 'bold',
    color: colors.green,
    alignSelf: 'stretch',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: colors.red,
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: responsiveFontSize(20),
    fontWeight: 'bold',
  },
});
