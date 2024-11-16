import React, { useContext } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text, ImageBackground } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CartContext from '../services/CartContext';

const CustomTabBar = (props) => {
    const { state, descriptors, navigation, parentNavigation } = props;
    const insets = useSafeAreaInsets();
    const { cart } = useContext(CartContext);

    return (
        <View style={[styles.shadowContainer, { paddingBottom: insets.bottom }]}>
            <View style={styles.imageWrapper}>
                <ImageBackground
                    source={require('../../assets/bottombar.png')}
                    style={styles.tabBarContainer}
                    resizeMode="stretch"
                >
                    {state.routes.map((route, index) => {
                        const { options } = descriptors[route.key];
                        const isFocused = state.index === index;
                        const onPress = () => {
                            if (route.name === 'CartPlaceholder') {
                                parentNavigation.navigate('Cart');
                                return;
                            }

                            const event = navigation.emit({
                                type: 'tabPress',
                                target: route.key,
                                canPreventDefault: true,
                            });

                            if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate(route.name);
                            }
                        };

                        const onLongPress = () => {
                            navigation.emit({
                                type: 'tabLongPress',
                                target: route.key,
                            });
                        };

                        let iconSource;
                        if (route.name === 'Home') {
                            iconSource = require('../../assets/home.png');
                        } else if (route.name === 'Favorites') {
                            iconSource = require('../../assets/heart.png');
                        } else if (route.name === 'CartPlaceholder') {
                            iconSource = require('../../assets/add-to-cart.png');
                        } else if (route.name === 'Notifications') {
                            iconSource = require('../../assets/orders.png');
                        } else if (route.name === 'Profile') {
                            iconSource = require('../../assets/user.png');
                        }

                        const isCart = route.name === 'CartPlaceholder';

                        return (
                            <TouchableOpacity
                                key={route.key}
                                accessibilityRole="button"
                                accessibilityState={isFocused ? { selected: true } : {}}
                                accessibilityLabel={options.tabBarAccessibilityLabel}
                                testID={options.tabBarTestID}
                                onPress={onPress}
                                onLongPress={onLongPress}
                                style={isCart ? styles.cartButton : styles.tabButton}
                            >
                                <Image
                                    source={iconSource}
                                    style={[styles.icon, isFocused && styles.focusedIcon, isCart && styles.cartIcon]}
                                />
                                {isCart && cart.length > 0 && (
                                    <View style={styles.badgeContainer}>
                                        <Text style={styles.badgeText}>{cart.length}</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        );
                    })}
                </ImageBackground>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    shadowContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        backgroundColor: 'transparent',
    },
    imageWrapper: {
        width: '100%',
        height: 90,
        alignItems: 'center',
    },
    tabBarContainer: {
        flexDirection: 'row',
        height: 90,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 10,
    },
    tabButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cartButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -60,
        elevation: 20,
        shadowColor: '#0D6EFD',
    },
    icon: {
        width: 24,
        height: 24,
        tintColor: 'gray',
    },
    focusedIcon: {
        tintColor: '#007AFF',
    },
    cartIcon: {
        tintColor: '#fff',
    },
    badgeContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: '#EB4335',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default CustomTabBar;
