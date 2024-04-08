import { Alert, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from './styles';
import { Text, Button, ControlledInput } from '../../../components';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerAsync } from '../../../store/auth';
import { useAppDispatch } from '../../../hooks';

const schema = z.object({
    email: z.string().email(),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    phoneNumber: z.string().min(10),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});

type FormFields = z.infer<typeof schema>;

const Register = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const dispatch = useAppDispatch();
    const {
        handleSubmit,
        control,

    } = useForm<FormFields>({
        defaultValues: {
            email: 'canotur@live.com',
            firstName: 'test',
            lastName: 'test',
            phoneNumber: '5555555555',
            password: '12345678',
            confirmPassword: '12345678',
        },
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: any) => {
        try {
            const { payload } = await dispatch(registerAsync({
                email: data.email,
                first_name: data.firstName,
                last_name: data.lastName,
                password: data.password,
                phone_number: data.phoneNumber,
                roles: ['6602bde726851a5f946b66cc']
            }));
            if (payload && payload.data.success) {
                return navigation.navigate('Login');
            }
        } catch (error) {
            console.log('registerError', error);
            return Alert.alert('Register Failed!', 'Please check your email or password and try again', [{ text: 'OK' }]);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Button text="←" style={styles.backButtonContainer} textStyle={styles.backButton} onPress={() => navigation.goBack()} />
                <Text text='Create Account' style={styles.headerText} containerStyle={styles.headerTextContainer} />
            </View>
            <View style={styles.inputContainer}>
                <ControlledInput control={control} name="email" placeholder="Email" />
                <ControlledInput control={control} name="firstName" placeholder="First Name" />
                <ControlledInput control={control} name="lastName" placeholder="Last Name" />
                <ControlledInput control={control} name="phoneNumber" placeholder="Phone Number" />
                <ControlledInput control={control} name="password" placeholder="Password" secureTextEntry={true} />
                <ControlledInput control={control} name="confirmPassword" placeholder="Confirm Password" secureTextEntry={true} />
            </View>
            <Button onPress={handleSubmit(onSubmit)} text='Register' style={styles.registerButton} textStyle={styles.registerButtonText} />
        </SafeAreaView>
    )
}

export default Register;