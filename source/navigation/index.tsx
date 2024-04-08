import * as React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    LoginScreen,
    ProfileScreen,
    RegisterScreen
} from '../screens';
import colors from '../theme/colors';

const RootStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const TabStack = createBottomTabNavigator();

const AuthNavigator = () => {
    return (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
            <AuthStack.Screen name="Login" component={LoginScreen} />
            <AuthStack.Screen name="Register" component={RegisterScreen} />
        </AuthStack.Navigator>
    )
}

const ProfileNavigator = () => {
    return (
        <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
            <ProfileStack.Screen name="ProfileMain" component={ProfileScreen} />
        </ProfileStack.Navigator>
    )
}

const TabNavigator = () => {
    return (
        <TabStack.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                headerTitle: 'TwoFA',
                headerBackgroundContainerStyle: { borderWidth: 0 },
                tabBarIcon: () => {
                    return <Text>{route.name}</Text>;
                },
                tabBarStyle: { backgroundColor: colors.red, paddingTop: 10 },
                tabBarLabelStyle: { color: colors.white },
            })}>
            <TabStack.Screen name="Profile" component={ProfileNavigator} />
        </TabStack.Navigator>
    );
};

const RootNavigator = () => {
    return (
        <RootStack.Navigator>
            <RootStack.Screen name="Auth" component={AuthNavigator} options={{ headerShown: false }} />
            <RootStack.Screen name="Tab" component={TabNavigator} options={{ headerShown: false }} />
        </RootStack.Navigator>
    )
}

export default () => (
    <NavigationContainer>
        <RootNavigator />
    </NavigationContainer>
)
