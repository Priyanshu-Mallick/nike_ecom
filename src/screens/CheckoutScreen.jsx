import React, { useState, useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';
// import RazorpayCheckout from 'react-native-razorpay';
import CartContext from '../services/CartContext';
import PrimaryButton from '../components/PrimaryButton';
import CustomDialog from '../components/CustomDialogue';

const CheckoutScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { subtotal, deliveryCost, totalCost } = route.params;
    const selectedAddress = route.params?.selectedAddress || "1082 Airport Road, Bhubaneeswar";
    const { dispatch } = useContext(CartContext);

    const [modalVisible, setModalVisible] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('COD');

    const handleCheckout = () => {
        // if (paymentMethod === 'Online') {
        //     const options = {
        //         description: 'Order Payment',
        //         image: 'https://your-logo-url.png',
        //         currency: 'INR',
        //         key: 'rzp_test_xCxaVcA8pJzyiT', // Your Razorpay Key ID
        //         amount: totalCost * 100, // Razorpay accepts amount in paise
        //         name: 'NIKE',
        //         prefill: {
        //             email: 'priyanshumallick@gmail.com',
        //             contact: '+919937991865',
        //             name: 'Priyanshu Mallick'
        //         },
        //         theme: { color: '#007AFF' }
        //     };
        //     RazorpayCheckout.open(options).then((data) => {
        //         // Handle successful payment here
        //         Alert.alert(`Success: ${data.razorpay_payment_id}`);
        //         dispatch({ type: 'CLEAR_CART' });
        //         setModalVisible(true);
        //     }).catch((error) => {
        //         // Handle failed payment here
        //         console.log(`${error.code} | ${error.description}`);
        //         Alert.alert(`Error: ${error.code} | ${error.description}`);
        //     });
        // } else {
        dispatch({ type: 'CLEAR_CART' });
        setModalVisible(true);
        // }
    };

    const handleBackToShopping = () => {
        setModalVisible(false);
        navigation.navigate('BottomTabs');
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#2B2B2B" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Checkout</Text>
                <View style={{ width: 40 }} />
            </View>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Contact Information</Text>
                    <View style={styles.infoRow}>
                        <Ionicons name="mail-outline" size={24} color="#2B2B2B" />
                        <Text style={styles.infoText}>priyanshumallick@gmail.com</Text>
                        <Ionicons name="pencil-outline" size={24} color="#2B2B2B" />
                    </View>
                    <View style={styles.infoRow}>
                        <Ionicons name="call-outline" size={24} color="#2B2B2B" />
                        <Text style={styles.infoText}>+91-9937991865</Text>
                        <Ionicons name="pencil-outline" size={24} color="#2B2B2B" />
                    </View>
                    <Text style={styles.sectionTitle}>Address</Text>
                    <Text style={styles.infoText}>{selectedAddress}</Text>
                    <TouchableOpacity style={styles.mapContainer} onPress={() => navigation.navigate('MapScreen', { subtotal, deliveryCost, totalCost })}>
                        <Image source={require('../../assets/map.png')} style={styles.mapImage} />
                        <Text style={styles.mapText}>Choose Address in Map</Text>
                    </TouchableOpacity>

                    <Text style={styles.sectionTitle}>Payment Method</Text>
                    <View style={styles.paymentMethodContainer}>
                        <View style={styles.radioOption}>
                            <RadioButton
                                value="COD"
                                status={paymentMethod === 'COD' ? 'checked' : 'unchecked'}
                                onPress={() => setPaymentMethod('COD')}
                                color="#007AFF"
                            />
                            <Text style={styles.radioText}>COD</Text>
                        </View>
                        <View style={styles.radioOption}>
                            <RadioButton
                                value="Online"
                                status={paymentMethod === 'Online' ? 'checked' : 'unchecked'}
                                onPress={() => setPaymentMethod('Online')}
                                color="#007AFF"
                            />
                            <Text style={styles.radioText}>Online Payment</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.summaryContainer}>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryText}>Subtotal:</Text>
                    <Text style={styles.summaryText}>₹{subtotal}</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryText}>Delivery:</Text>
                    <Text style={styles.summaryText}>₹{deliveryCost}</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.totalText}>Total Cost:</Text>
                    <Text style={styles.totalText}>₹{totalCost}</Text>
                </View>
                <PrimaryButton
                    title="Checkout"
                    onPress={handleCheckout}
                    backgroundColor="#007AFF"
                    textColor="#FFFFFF"
                />
            </View>
            <CustomDialog
                visible={modalVisible}
                onClose={handleBackToShopping}
                icon={require('../../assets/confirmation.png')}
                title="Order Placed"
                message="Your order has been placed successfully!"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F9',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 30,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2B2B2B',
        textAlign: 'center',
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2B2B2B',
        marginVertical: 10,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    infoText: {
        flex: 1,
        fontSize: 16,
        color: '#2B2B2B',
        marginLeft: 10,
    },
    mapContainer: {
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        overflow: 'hidden',
    },
    mapImage: {
        width: '100%',
        height: 150,
    },
    mapText: {
        position: 'absolute',
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
    paymentRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    paymentIcon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    paymentMethodContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioText: {
        fontSize: 16,
        color: '#2B2B2B',
        marginLeft: 5,
    },
    summaryContainer: {
        padding: 20,
        borderTopWidth: 1,
        borderColor: '#ddd',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#F7F7F9',
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    summaryText: {
        fontSize: 16,
        color: '#2B2B2B',
    },
    totalText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2B2B2B',
        marginBottom: 20,
    },
});

export default CheckoutScreen;
