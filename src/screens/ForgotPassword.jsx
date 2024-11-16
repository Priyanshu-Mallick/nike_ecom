// screens/ForgotPassword.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import CustomTextField from '../components/CustomTextField';
import PrimaryButton from '../components/PrimaryButton';
import { ScreenHeight } from 'react-native-elements/dist/helpers';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomDialog from '../components/CustomDialogue';

export default function ForgotPassword({ navigation }) {
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(null);
    const [dialogVisible, setDialogVisible] = useState(false);

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleForgotPassword = () => {
        const isEmailValid = validateEmail(email);

        setEmailValid(isEmailValid);

        if (isEmailValid) {
            setDialogVisible(true);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <View style={styles.backButtonContainer}>
                    <Ionicons name="arrow-back" size={24} color="#2B2B2B" />
                </View>
            </TouchableOpacity>
            <Text style={styles.header}>Forgot Password</Text>
            <View style={styles.subHeaderContainer}>
                <Text style={styles.subHeader}>Enter your Email account to reset</Text>
                <Text style={styles.subHeader}>your password</Text>
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

            <PrimaryButton
                onPress={handleForgotPassword}
                title="Reset Password"
                backgroundColor="#0D6EFD"
                textColor="#FFFFFF"
                marginTop={20}
            />

            <CustomDialog
                visible={dialogVisible}
                onClose={() => setDialogVisible(false)}
                icon={require('../../assets/email.png')}
                title="Check Your Email"
                message="We have sent a password recovery code to your email."
            />

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
});
