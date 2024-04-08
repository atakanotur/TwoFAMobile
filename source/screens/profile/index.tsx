import React, { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from './styles';
import { Button, TwoFACode, Text } from '../../components';
import { User } from '../../types';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { disableOTPAsync, generateOTPAsync, verifyAsync } from '../../store/auth';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Clipboard from '@react-native-clipboard/clipboard';

const Profile = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [twoFAVisible, setTwoFAVisible] = useState<Boolean>(false);
    const [code, setCode] = useState<string>('');
    const user: User = useAppSelector(state => state.auth.user);
    const userId: String = useAppSelector(state => state.auth.userId);

    const generateOTP = async () => {
        try {
            const { payload: generatePayload } = await dispatch(generateOTPAsync(user._id));
            if (generatePayload.data.base32) {
                return Alert.alert("Success", "Your OTP code is generated!", [
                    {
                        text: 'Copy Code',
                        onPress: () => Clipboard.setString(generatePayload.data.base32.toString()),
                    }
                ])
            }
        } catch (error) {
            Alert.alert("Not Generated !", "Your OTP code is not generated!",)
        }
    }
    const confirmTwoFACode = async () => {
        if (code && code.length === 6 && user) {
            try {
                const { payload } = await dispatch(verifyAsync({ user_id: user._id, token: code }));
                if (payload.code == '200') {
                    setCode('');
                    setTwoFAVisible(false);
                    return Alert.alert('Success', '2FA verified successfully', [{ text: 'OK' }]);
                }
                else {
                    setCode('');
                    return Alert.alert('Error', 'Please check your code and try again', [{ text: 'OK' }]);
                }
            } catch (error) {
                console.log('confirmTwoFACodeError', error);
            }

        }
    }

    const disableOTP = async () => {
        try {
            const { payload } = await dispatch(disableOTPAsync(userId))
            if (payload.code == '200' && payload.data.success) {
                return Alert.alert('Success', '2FA disabled successfully', [{ text: 'OK' }]);
            }
            return Alert.alert('Error', 'Please try again', [{ text: 'OK' }]);
        } catch (error) {
            console.log('disableOTPError', error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text text='Profile' style={styles.text} />
            <Button
                text='Logout'
                onPress={() => navigation.navigate('Login')}
                style={styles.button}
                textStyle={styles.buttonText}
            />
            {user.otp_enabled &&
                <View>
                    <Text text='2FA is enabled' style={styles.text} />
                    <Button
                        text='Disable 2FA'
                        onPress={disableOTP}
                        style={styles.button}
                        textStyle={styles.buttonText}
                    />
                </View>
            }
            {
                !user.otp_enabled &&
                <View>
                    <Button
                        text='Generate OTP Code'
                        onPress={generateOTP}
                        style={styles.button}
                        textStyle={styles.buttonText}
                    />
                    <Button
                        text='Verify 2FA Code'
                        onPress={() => setTwoFAVisible(true)}
                        style={styles.button}
                        textStyle={styles.buttonText} />
                </View>
            }

            <TwoFACode isVisible={twoFAVisible} setIsVisible={() => setTwoFAVisible(false)} confirmTwoFACode={confirmTwoFACode} setCode={setCode} />

        </SafeAreaView >
    )
}

export default Profile;
