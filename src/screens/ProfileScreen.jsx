// screens/ProfileScreen.js
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import CustomTextField from '../components/CustomTextField';
import PrimaryButton from '../components/PrimaryButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';

const ProfileScreen = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [location, setLocation] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');
    const [isFirstNameValid, setIsFirstNameValid] = useState(null);
    const [isLastNameValid, setIsLastNameValid] = useState(null);
    const [isLocationValid, setIsLocationValid] = useState(null);
    const [isMobileNumberValid, setIsMobileNumberValid] = useState(null);
    const [isEmailValid, setIsEmailValid] = useState(null);

    const navigation = useNavigation();

    const validateField = (field, setFieldValid) => {
        if (field.trim() !== '') {
            setFieldValid(true);
        } else {
            setFieldValid(false);
        }
    };

    const validateEmail = (email, setFieldValid) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email)) {
            setFieldValid(true);
        } else {
            setFieldValid(false);
        }
    };

    const getCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission to access location was denied');
            setIsLocationValid(false);
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        let address = await Location.reverseGeocodeAsync(location.coords);

        if (address.length > 0) {
            let formattedAddress = `${address[0].formattedAddress}`;
            setLocation(formattedAddress);
            setIsLocationValid(true);
        } else {
            setLocation(`Lat: ${location.coords.latitude}, Lon: ${location.coords.longitude}`);
            setIsLocationValid(true);
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <View style={styles.backButtonContainer}>
                        <Ionicons name="arrow-back" size={24} color="#2B2B2B" />
                    </View>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Profile</Text>
                <TouchableOpacity>
                    <Text style={styles.doneButton}>Done</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.profileContainer}>
                <Image source={require('../../assets/profile.jpg')} style={styles.profileImage} />
                <Text style={styles.profileName}>Priyanshu Mallick</Text>
                <TouchableOpacity>
                    <Text style={styles.changeProfilePicture}>Change Profile Picture</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.label}>First Name</Text>
                <CustomTextField
                    value={firstName}
                    onChangeText={setFirstName}
                    placeholder="xxxxxxxxxx"
                    onBlur={() => validateField(firstName, setIsFirstNameValid)}
                    isValid={isFirstNameValid}
                    showIcon={isFirstNameValid}
                    iconName="checkmark"
                />
                {isFirstNameValid === false && <Text style={styles.errorText}>Field can't be empty</Text>}

                <Text style={styles.label}>xxxxxxxxxx</Text>
                <CustomTextField
                    value={lastName}
                    onChangeText={setLastName}
                    placeholder="Oyiboke"
                    onBlur={() => validateField(lastName, setIsLastNameValid)}
                    isValid={isLastNameValid}
                    showIcon={isLastNameValid}
                    iconName="checkmark"
                />
                {isLastNameValid === false && <Text style={styles.errorText}>Field can't be empty</Text>}

                <Text style={styles.label}>Email</Text>
                <CustomTextField
                    value={email}
                    onChangeText={setEmail}
                    placeholder="example@example.com"
                    onBlur={() => validateEmail(email, setIsEmailValid)}
                    isValid={isEmailValid}
                    showIcon={isEmailValid}
                    iconName="checkmark"
                />
                {isEmailValid === false && <Text style={styles.errorText}>Please enter a valid email</Text>}

                <Text style={styles.label}>Mobile Number</Text>
                <CustomTextField
                    value={mobileNumber}
                    onChangeText={setMobileNumber}
                    placeholder="811-732-5298"
                    onBlur={() => validateField(mobileNumber, setIsMobileNumberValid)}
                    isValid={isMobileNumberValid}
                    showIcon={isMobileNumberValid}
                    iconName="checkmark"
                    keyboardType="numeric"
                    maxLength={10}
                />
                {isMobileNumberValid === false && <Text style={styles.errorText}>Field can't be empty</Text>}

                <Text style={styles.label}>Location</Text>
                <CustomTextField
                    value={location}
                    onChangeText={setLocation}
                    placeholder="India"
                    isValid={isLocationValid}
                    showIcon={isLocationValid}
                    iconName="checkmark"
                    leftIconName="locate"
                    onLeftIconPress={getCurrentLocation}
                />
                {isLocationValid === false && <Text style={styles.errorText}>Field can't be empty</Text>}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    contentContainer: {
        marginTop: 40,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    backButtonContainer: {
        width: 40,
        height: 40,
        borderRadius: 30,
        backgroundColor: '#F7F7F9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2B2B2B',
    },
    doneButton: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007AFF',
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2B2B2B',
        marginBottom: 5,
    },
    changeProfilePicture: {
        fontSize: 14,
        color: '#007AFF',
    },
    formContainer: {
        flex: 1,
    },
    label: {
        fontSize: 14,
        color: '#2B2B2B',
        marginBottom: 5,
    },
    errorText: {
        fontSize: 12,
        color: '#EB4335',
        marginBottom: 10,
    },
});

export default ProfileScreen;
