import React from 'react'
import { View, StyleSheet, Text, TextInput } from 'react-native'
import { Controller } from 'react-hook-form';
import colors from '../theme/colors';
import { responsiveFontSize } from '../theme/responsiveFontSize';

type Props = {
    control: any;
    name: string;
    placeholder: string;
    secureTextEntry?: boolean;
}

const FormInput = ({ control, name, placeholder, secureTextEntry, ...otherProps }: Props) => {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                <>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            style={styles.textInput}
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            placeholder={placeholder}
                            secureTextEntry={secureTextEntry}
                            {...otherProps}
                        />
                        {error && <Text style={styles.errorMessage}>
                            {error.message}
                        </Text>
                        }
                    </View>
                </>
            )}
        />
    )
}

export default FormInput;

const styles = StyleSheet.create({
    textInput: {
        fontSize: responsiveFontSize(22),
        color: colors.gray,
    },
    textInputContainer: {
        height: 60,
        marginBottom: 15,
        padding: 20,
        width: 300,
    },
    errorMessage: {
        color: colors.red
    },

})