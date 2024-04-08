import { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TextInput, Text, Button } from '.';
import colors from '../theme/colors';

type TwoFACodeProps = {
    isVisible: Boolean;
    setIsVisible: () => void;
    confirmTwoFACode: () => void;
    setCode: (code: string) => void;
}

const { width, height } = Dimensions.get('window');

const TwoFACode = ({ isVisible, setIsVisible, confirmTwoFACode, setCode }: TwoFACodeProps) => {

    if (!isVisible) return;
    return (
        <View style={styles.container}>
            <Button text='x' onPress={setIsVisible} style={styles.closeButton} textStyle={styles.closeButtonText} />
            <Text text='Write your 2FA code!' style={styles.text} />
            <TextInput onChangeText={(e: string) => setCode(e)} placeholder='2FA Code' style={styles.textInput} containerStyle={styles.inputContainer} maxLength={6} />
            <Button onPress={confirmTwoFACode} text='Submit' style={styles.button} textStyle={styles.buttonText} />
        </View>
    )
}

export default TwoFACode;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: height / 3,
        height: height / 3,
        width: width - 30,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderRadius: 10,
        padding: 20,
        justifyContent: 'space-between',
        borderColor: colors.red,
        borderWidth: 5
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 20,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    closeButtonText: {
        color: colors.white,
        fontSize: 35,
    },
    text: {
        alignSelf: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        color: colors.white
    },
    inputContainer: {
        backgroundColor: colors.white,
        borderRadius: 10,
        width: '45%',
        alignSelf: 'center'
    },
    textInput: {
        padding: 20,
        color: colors.gray,
        fontSize: 25
    },
    button: {
        height: 70,
        backgroundColor: colors.red,
        width: width - 100,
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
        alignSelf: 'center'
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10,
        color: 'white',
    }
})