// screens/SignIn.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomTextField from '../components/CustomTextField';
import PrimaryButton from '../components/PrimaryButton';
import { ScreenHeight } from 'react-native-elements/dist/helpers';
import { Button, Input } from 'react-native-elements';
import { someHelper } from 'react-native-elements/dist/helpers';


export default function SignIn({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailValid, setEmailValid] = useState(null);
    const [passwordValid, setPasswordValid] = useState(null);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSignIn = () => {
        const isEmailValid = validateEmail(email);
        const isPasswordValid = password.length >= 8;
        setEmailValid(isEmailValid);
        setPasswordValid(isPasswordValid);

        if (isEmailValid && isPasswordValid) {
            navigation.navigate('BottomTabs');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Hello Again!</Text>
            <View style={styles.subHeaderContainer}>
                <Text style={styles.subHeader}>Fill Your Details Or Continue With</Text>
                <Text style={styles.subHeader}>Social Media</Text>
            </View>
            <Text style={styles.label}>Email Address</Text>
            <CustomTextField
                value={email}
                onChangeText={setEmail}
                placeholder="xyz@gmail.com"
                onBlur={() => setEmailValid(validateEmail(email))}
                isValid={emailValid}
                showIcon={email.length > 0}
                iconName={emailValid === null ? null : emailValid ? "checkmark-circle" : "alert-circle"}
            />
            {emailValid === false && <Text style={styles.errorText}>Please enter a valid email address</Text>}

            <Text style={styles.label}>Password</Text>
            <CustomTextField
                value={password}
                onChangeText={setPassword}
                placeholder="********"
                secureTextEntry={!passwordVisible}
                onBlur={() => setPasswordValid(password.length >= 8)}
                isValid={passwordValid}
                showIcon={true}
                iconName={passwordVisible ? "eye" : "eye-off"}
                onIconPress={() => setPasswordVisible(!passwordVisible)}
            />
            {passwordValid === false && <Text style={styles.errorText}>Password must be at least 8 characters</Text>}

            <Text style={styles.recoveryText} onPress={() => navigation.navigate('ForgotPassword')}>Recovery Password</Text>
            <PrimaryButton
                onPress={handleSignIn}
                title="Sign In"
                backgroundColor="#0D6EFD"
                textColor="#FFFFFF"
                marginTop={10}
            />
            <PrimaryButton
                onPress={() => { }}
                icon={require('../../assets/Google.png')}
                title="Sign In With Google"
                backgroundColor="#F7F7F9"
                textColor="#2B2B2B"
                marginTop={25}
            />
            <Text style={styles.footerText}>
                New User?{' '}
                <Text onPress={() => navigation.navigate('SignUp')} style={styles.footerLink}>
                    Create Account
                </Text>
            </Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingTop: ScreenHeight * 0.1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#2B2B2B',
        textAlign: 'center',
        marginTop: 40,
        marginBottom: 10,
    },
    subHeaderContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    subHeader: {
        fontSize: 16,
        color: '#707B81',
        textAlign: 'center',
        marginBottom: 5,
    },
    label: {
        fontSize: 16,
        color: '#2B2B2B',
        marginBottom: 5,
    },
    errorText: {
        color: '#EB4335',
        marginBottom: 10,
    },
    recoveryText: {
        color: '#707B81',
        textAlign: 'right',
        marginBottom: 20,
    },
    footerText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#6A6A6A',
        marginTop: ScreenHeight * 0.15,
        marginBottom: 20
    },
    footerLink: {
        color: '#1A1D1E',
        fontWeight: 'bold',
    },
});
