import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function SplashScreen({ navigation }) {
    useEffect(() => {
        const prepare = async () => {
            await new Promise(resolve => setTimeout(resolve, 2000));
            navigation.replace('Welcome');
        };

        prepare();
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/logo.png')} style={styles.image} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#007AFF',
    },
    image: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
});
