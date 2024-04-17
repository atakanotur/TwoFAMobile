import React from 'react';
import { View, Text, StyleSheet, TextStyle, ViewStyle, StyleProp } from 'react-native';
import { responsiveFontSize } from '../theme/responsiveFontSize';

interface CustomTextProps {
    text: string | any;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<TextStyle>;
}

const CustomText = ({ text, containerStyle, style }: CustomTextProps) => {
    return (
        <View style={[styles.container, containerStyle]}>
            <Text style={[styles.text, style]}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'black',
        fontSize: responsiveFontSize(18),
    },
});

export default CustomText;