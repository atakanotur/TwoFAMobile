import { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from './styles';
import { loginAsync, validateAsync } from '../../../store/auth';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { Button, TextInput, Text, TwoFACode } from '../../../components';
import colors from '../../../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { User } from '../../../types';

const Login = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const dispatch = useAppDispatch();
    const token: String = useAppSelector(state => state.auth.token);
    const user: User = useAppSelector(state => state.auth.user);
    const userId: String = useAppSelector(state => state.auth.userId);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [twoFAVisible, setTwoFAVisible] = useState<Boolean>(false);
    const [code, setCode] = useState<string>('');

    const login = async () => {
        if (email && password) {
            try {
                const { payload } = await dispatch(loginAsync({ email, password }));
                if (payload) {
                    if (payload.data.otp_enabled && payload.data.user._id) return setTwoFAVisible(true);
                    else if (!payload.data.otp_enabled && payload.data.user && payload.data.token) {
                        return navigation.navigate('Tab');
                    }
                }
            } catch (error) {
                console.log('loginError', error);
                return Alert.alert('Login Failed!', 'Please check your email or password and try again', [{ text: 'OK' }]);
            }
        }
    }

    const confirmTwoFACode = async () => {
        if (code && code.length == 6 && userId) {
            try {
                const { payload } = await dispatch(validateAsync({ validateUser: { user_id: userId, token: code }, token, }));
                if (payload && payload.code == '200') {
                    setCode('');
                    setTwoFAVisible(false);
                    return navigation.navigate('Tab');
                }
                else {
                    setCode('');
                    return Alert.alert('Error', 'Please check your code and try again', [{ text: 'OK' }]);
                }
            } catch (error) {
                console.log('confirmTwoFACodeError', error);
            }
        } else {
            return Alert.alert('Error', 'Please check your code and try again', [{ text: 'OK' }]);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text text='2FA Login' style={styles.headerText} />
            <View style={styles.inputContainer}>
                <TextInput style={styles.textInput} containerStyle={styles.textInputContainer} placeholder='Email' onChangeText={(e: string) => setEmail(e)} selectionColor={colors.green} placeholderTextColor={colors.gray} value={email} />
                <TextInput style={styles.textInput} containerStyle={styles.textInputContainer} placeholder='Password' onChangeText={(e: string) => setPassword(e)} selectionColor={colors.green} placeholderTextColor={colors.gray} value={password} secureTextEntry />
                <Button onPress={login} text='Login' style={styles.loginButton} textStyle={styles.loginButtonText} />
                <View style={styles.register}>
                    <Text text={`Don't have an account? `} style={styles.registerText} />
                    <Button onPress={() => navigation.navigate('Register')} text='Create One' textStyle={styles.registerButtonText} />
                </View>
            </View>
            <TwoFACode isVisible={twoFAVisible} setIsVisible={() => setTwoFAVisible(false)} confirmTwoFACode={confirmTwoFACode} setCode={setCode} />
        </SafeAreaView>
    )
}

export default Login;
