import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Location from 'expo-location';
import { useNavigation, useRoute } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const MapScreen = () => {
    const [location, setLocation] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const navigation = useNavigation();
    const route = useRoute();
    const { subtotal, deliveryCost, totalCost } = route.params;

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    const handleSelectLocation = (event) => {
        setSelectedLocation({
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude,
        });
    };

    const handleConfirmLocation = () => {
        if (selectedLocation) {
            // Reverse geocoding to get the address from latitude and longitude
            Location.reverseGeocodeAsync({
                latitude: selectedLocation.latitude,
                longitude: selectedLocation.longitude,
            }).then((res) => {
                const address = res[0];
                const formattedAddress = `${address.street}, ${address.city}, ${address.region}, ${address.postalCode}, ${address.country}`;
                navigation.navigate('Checkout', { selectedAddress: formattedAddress, subtotal, deliveryCost, totalCost });
            });
        }
    };

    return (
        <View style={styles.container}>
            {location && (
                <MapView
                    style={styles.map}
                    onPress={handleSelectLocation}
                    initialRegion={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    {selectedLocation && (
                        <Marker
                            coordinate={selectedLocation}
                            title="Selected Location"
                        />
                    )}
                </MapView>
            )}
            <GooglePlacesAutocomplete
                placeholder="Search"
                onPress={(data, details = null) => {
                    const location = details.geometry.location;
                    setSelectedLocation({
                        latitude: location.lat,
                        longitude: location.lng,
                    });
                }}
                query={{
                    key: 'YOUR_GOOGLE_API_KEY',
                    language: 'en',
                }}
                styles={{
                    container: {
                        position: 'absolute',
                        width: '90%',
                        zIndex: 1,
                        top: 40,
                        alignSelf: 'center',
                    },
                    listView: { backgroundColor: 'white' },
                }}
                fetchDetails={true}
            />
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmLocation}>
                <Text style={styles.confirmButtonText}>Confirm Location</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    confirmButton: {
        position: 'absolute',
        bottom: 20,
        left: '50%',
        transform: [{ translateX: -75 }],
        backgroundColor: '#007AFF',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    confirmButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MapScreen;
