import React, { useContext, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import CartContext from '../services/CartContext';

const ProductDetailsScreen = ({ route }) => {
    const { image, title, price } = route.params;
    const navigation = useNavigation();
    const { cart, dispatch } = useContext(CartContext);
    const [inCart, setInCart] = useState(cart.some(item => item.id === route.params.id));

    const handleAddToCart = () => {
        if (inCart) {
            navigation.navigate('Cart');
        } else {
            dispatch({ type: 'ADD_TO_CART', payload: { ...route.params } });
            setInCart(true);
        }
    };

    const cartItemCount = cart.length;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#2B2B2B" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Sneaker Shop</Text>
                <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Cart')}>
                    <Ionicons name="cart" size={24} color="#2B2B2B" />
                    {cartItemCount > 0 && (
                        <View style={styles.cartBadge}>
                            <Text style={styles.cartBadgeText}>{cartItemCount}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>
            <View style={styles.featuresContainer}>
                <Text style={styles.productTitle}>{title}</Text>
                <Text style={styles.productCategory}>Men's Shoes</Text>
                <Text style={styles.productPrice}>₹{price}</Text>
            </View>
            <Image source={image} style={styles.productImage} />
            <View style={styles.detailsContainer}>
                <View style={styles.thumbnailContainer}>
                    <Image source={image} style={styles.thumbnail} />
                    <Image source={image} style={styles.thumbnail} />
                    <Image source={image} style={styles.thumbnail} />
                </View>
                <Text style={styles.productDescription}>
                    The Max Air 270 Unit Delivers Unrivaled, All-Day Comfort. The Sleek, Running-Inspired Design Roots You To Everything Nike...
                </Text>
                <TouchableOpacity>
                    <Text style={styles.readMore}>Read More</Text>
                </TouchableOpacity>
                <View style={styles.actionContainer}>
                    <TouchableOpacity style={styles.wishlistButton}>
                        <Ionicons name="heart-outline" size={24} color="#2B2B2B" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
                        <Ionicons name={inCart ? "checkmark" : "cart-outline"} size={24} color="#FFFFFF" />
                        <Text style={styles.addToCartButtonText}>{inCart ? "Go to Cart" : "Add to Cart"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 30
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F7F7F9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2B2B2B',
    },
    cartButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F7F7F9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cartBadge: {
        position: 'absolute',
        top: -7,
        right: -2,
        backgroundColor: '#EB4335',
        borderRadius: 10,
        paddingHorizontal: 5,
        paddingVertical: 1,
    },
    cartBadgeText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: 'bold',
    },
    productImage: {
        width: '100%',
        height: 300,
        resizeMode: 'contain',
    },
    featuresContainer: {
        paddingLeft: 20,
    },
    detailsContainer: {
        padding: 20,
    },
    productTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2B2B2B',
    },
    productCategory: {
        fontSize: 16,
        color: '#707070',
        marginVertical: 5,
    },
    productPrice: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2B2B2B',
        marginVertical: 5,
    },
    thumbnailContainer: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    thumbnail: {
        width: 60,
        height: 60,
        borderRadius: 10,
        marginRight: 10,
    },
    productDescription: {
        fontSize: 16,
        color: '#707070',
        marginVertical: 10,
    },
    readMore: {
        fontSize: 16,
        color: '#007AFF',
        marginVertical: 10,
    },
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginVertical: 20,
    },
    wishlistButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#F7F7F9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addToCartButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#007AFF',
        borderRadius: 15,
        paddingVertical: 15,
        paddingHorizontal: 60,
    },
    addToCartButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
});

export default ProductDetailsScreen;
