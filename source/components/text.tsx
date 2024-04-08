import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextStyle, ViewStyle, StyleProp } from 'react-native';

interface CustomTextProps {
    text: string | any;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<TextStyle>;
}

const CustomText = ({ text, containerStyle, style }: CustomTextProps) => {
    const [state, setState] = useState(text);

    useEffect(() => {
        setState(text);
    }, [text]);

    return (
        <View style={[styles.container, containerStyle]}>
            <Text style={[styles.text, style]}>{state}</Text>
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
    },
});

export default CustomText;