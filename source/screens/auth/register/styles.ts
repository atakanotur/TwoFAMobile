import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../theme/colors';
import {responsiveFontSize} from '../../../theme/responsiveFontSize';

const width = Dimensions.get('window').width;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  headerContainer: {
    flex: 1,
  },
  backButtonContainer: {
    alignSelf: 'flex-start',
  },
  backButton: {
    fontSize: responsiveFontSize(35),
  },
  headerText: {
    fontSize: responsiveFontSize(55),
    fontWeight: 'bold',
    color: colors.red,
  },
  headerTextContainer: {
    flex: 1,
  },
  inputContainer: {
    flex: 3,
    width: width - 20,
  },
  registerButton: {
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
  registerButtonText: {
    fontSize: responsiveFontSize(20),
    fontWeight: 'bold',
    padding: 10,
    color: 'white',
  },
});
