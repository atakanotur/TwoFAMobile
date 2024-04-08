import React from 'react';
import { View, TextInput, TextStyle, ViewStyle, StyleSheet } from 'react-native';
import { TextInputProps } from 'react-native';

interface OwnProps {
    label?: string;
    containerStyle?: ViewStyle;
    placeholder?: string;
    style?: TextStyle;
    selectionColor?: TextStyle;
    placeholderTextColor?: TextStyle;
    onChangeText?: any;
    value?: string;
    secureTextEntry?: boolean;
}

export type CustomInputProps = OwnProps & TextInputProps;

const CustomInput = (props: CustomInputProps) => {
    const {
        containerStyle,
        placeholder,
        style,
        selectionColor,
        placeholderTextColor,
        onChangeText,
        value,
        secureTextEntry
    } = props;
    return (
        <View style={[styles.containerStyle, containerStyle]}>
            <TextInput
                placeholder={placeholder}
                onChangeText={e => onChangeText(e)}
                style={[styles.inputStyle, style]}
                selectionColor={selectionColor}
                placeholderTextColor={placeholderTextColor}
                value={value}
                secureTextEntry={secureTextEntry}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputStyle: {
        flex: 1,
    },
});

export default CustomInput;