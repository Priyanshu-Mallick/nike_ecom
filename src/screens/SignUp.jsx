import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import CustomTextField from '../components/CustomTextField';
import PrimaryButton from '../components/PrimaryButton';
import { ScreenHeight } from 'react-native-elements/dist/helpers';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function SignUp({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailValid, setEmailValid] = useState(null);
    const [passwordValid, setPasswordValid] = useState(null);
    const [nameValid, setNameValid] = useState(null);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSignUp = () => {
        const isEmailValid = validateEmail(email);
        const isPasswordValid = password.length >= 8;
        const isNameValid = name.trim().length > 0;

        setEmailValid(isEmailValid);
        setPasswordValid(isPasswordValid);
        setNameValid(isNameValid);

        if (isEmailValid && isPasswordValid && isNameValid) {
            navigation.navigate('BottomTabs');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <View style={styles.backButtonContainer}>
                    <Ionicons name="arrow-back" size={24} color="#2B2B2B" />
                </View>
            </TouchableOpacity>
            <Text style={styles.header}>Register Account</Text>
            <View style={styles.subHeaderContainer}>
                <Text style={styles.subHeader}>Fill Your Details Or Continue With</Text>
                <Text style={styles.subHeader}>Social Media</Text>
            </View>
            <Text style={styles.label}>Your Name</Text>
            <CustomTextField
                value={name}
                onChangeText={setName}
                placeholder="Your Name"
                onBlur={() => setNameValid(name.trim().length > 0)}
                isValid={nameValid}
                showIcon={name.length > 0}
                iconName={nameValid === null ? null : nameValid ? "checkmark-circle" : "alert-circle"}
            />
            {nameValid === false && <Text style={styles.errorText}>Please enter your name</Text>}

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

            <PrimaryButton
                onPress={handleSignUp}
                title="Sign Up"
                backgroundColor="#0D6EFD"
                textColor="#FFFFFF"
                marginTop={20}
            />
            <PrimaryButton
                onPress={() => { }}
                icon={require('../../assets/Google.png')}
                title="Sign Up With Google"
                backgroundColor="#F7F7F9"
                textColor="#2B2B2B"
                marginTop={20}
            />
            <Text style={styles.footerText}>
                Already Have Account?{' '}
                <Text onPress={() => navigation.navigate('SignIn')} style={styles.footerLink}>
                    Log In
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
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 1,
    },
    backButtonContainer: {
        width: 50,
        height: 50,
        borderRadius: 30,
        backgroundColor: '#F7F7F9',
        justifyContent: 'center',
        alignItems: 'center',
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
    footerText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#6A6A6A',
        marginTop: ScreenHeight * 0.07,
        marginBottom: 20
    },
    footerLink: {
        color: '#1A1D1E',
        fontWeight: 'bold',
    },
});
