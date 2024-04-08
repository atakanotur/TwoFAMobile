import React from 'react';
import { TouchableOpacity, TextStyle, ViewStyle, StyleSheet } from 'react-native';
import Text from './text';

type CustomButtonProps = {
    text?: string;
    onPress: () => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
    textContainerStyle?: ViewStyle;
}

const CustomButton = ({
    text,
    onPress,
    style,
    textStyle,
    textContainerStyle,
}: CustomButtonProps) => {
    return (
        <TouchableOpacity style={[style, styles.buttonStyle]} onPress={() => onPress()}>
            <Text
                text={text}
                style={[styles.text, textStyle]}
                containerStyle={[styles.textContainer, textContainerStyle]}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonStyle: {
        justifyContent: 'center'
    },
    textContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {},
});

export default CustomButton;