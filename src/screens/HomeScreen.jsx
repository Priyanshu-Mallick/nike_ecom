import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, FlatList, TouchableOpacity, Animated, Dimensions } from 'react-native';
import PopularShoeCard from '../components/PopularShoeCard';
import DrawerContent from '../components/DrawerContent';
import { ScreenHeight, ScreenWidth } from 'react-native-elements/dist/helpers';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const popularShoesData = [
    {
        id: '1',
        image: require('../../assets/nike-jordan.png'),
        title: 'Nike Jordan',
        price: '3020.00',
        isFavorite: false,
    },
    {
        id: '2',
        image: require('../../assets/nike-jordan.png'),
        title: 'Nike Air Max',
        price: '7520.00',
        isFavorite: false,
    },
    {
        id: '3',
        image: require('../../assets/nike-jordan.png'),
        title: 'Nike Air Max',
        price: '7520.00',
        isFavorite: false,
    },
    {
        id: '4',
        image: require('../../assets/nike-jordan.png'),
        title: 'Nike Air Max',
        price: '7520.00',
        isFavorite: false,
    },
];

export default function HomeScreen() {
    const [numColumns, setNumColumns] = useState(2);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const drawerAnim = useState(new Animated.Value(0))[0];
    const navigation = useNavigation();

    const toggleDrawer = () => {
        const toValue = drawerOpen ? 0 : 1;
        Animated.timing(drawerAnim, {
            toValue,
            duration: 300,
            useNativeDriver: true,
        }).start();
        setDrawerOpen(!drawerOpen);
    };

    const toggleColumns = () => {
        setNumColumns((prevNumColumns) => (prevNumColumns === 2 ? 1 : 2));
    };

    const drawerTranslateX = drawerAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [-width * 0.6, 0],
    });

    const screenTranslateX = drawerAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, width * 0.6],
    });

    const screenScale = drawerAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0.8],
    });

    const screenRotate = drawerAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '0deg'],
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.drawer, { transform: [{ translateX: drawerTranslateX }] }]}>
                <DrawerContent drawerAnim={drawerAnim} toggleDrawer={toggleDrawer} />
            </Animated.View>
            <Animated.View style={[styles.screen, { transform: [{ translateX: screenTranslateX }, { scale: screenScale }, { rotateZ: screenRotate }] }]}>
                <FlatList
                    data={popularShoesData}
                    keyExtractor={(item) => item.id}
                    key={numColumns}
                    numColumns={numColumns}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <>
                            <View style={styles.header}>
                                <TouchableOpacity onPress={toggleDrawer}>
                                    <Image source={require('../../assets/menu.png')} style={styles.menuIcon} />
                                </TouchableOpacity>
                                <Text style={styles.headerTitle}>Explore</Text>
                                <TouchableOpacity>
                                    <Image source={require('../../assets/notification.png')} style={styles.notificationIcon} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.searchContainer}>
                                <TextInput style={styles.searchInput} placeholder="Looking for shoes" />
                                <TouchableOpacity style={styles.filterButton} onPress={toggleColumns}>
                                    <Image source={require('../../assets/filter.png')} style={styles.filterIcon} />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.categoryLabel}>Select Category</Text>
                            <View style={styles.categoryContainer}>
                                <TouchableOpacity style={[styles.categoryButton, styles.activeCategory]}>
                                    <Text style={styles.categoryText}>All Shoes</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.categoryButton}>
                                    <Text style={styles.categoryText}>Outdoor</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.categoryButton}>
                                    <Text style={styles.categoryText}>Tennis</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>Popular Shoes</Text>
                                <TouchableOpacity>
                                    <Text style={styles.seeAll}>See all</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    }
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', item)}>
                            <PopularShoeCard
                                id={item.id}
                                image={item.image}
                                title={item.title}
                                price={item.price}
                                isFavorite={item.isFavorite}
                                numColumns={numColumns}
                            />
                        </TouchableOpacity>
                    )}
                    ListFooterComponent={
                        <>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>New Arrivals</Text>
                                <TouchableOpacity>
                                    <Text style={styles.seeAll}>See all</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.newArrivalsContainer}>
                                <Image source={require('../../assets/nike-jordan.png')} style={styles.newArrivalsImage} />
                            </View>
                        </>
                    }
                />
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    drawer: {
        position: 'absolute',
        width: '60%',
        height: '100%',
        backgroundColor: '#007AFF',
        zIndex: 1000,
    },
    screen: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: ScreenHeight * 0.05,
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    menuIcon: {
        width: 24,
        height: 24,
    },
    notificationIcon: {
        width: 24,
        height: 24,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#2B2B2B',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 20,
        marginHorizontal: 20,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        padding: 10,
    },
    filterButton: {
        backgroundColor: '#007AFF',
        borderRadius: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    filterIcon: {
        width: 24,
        height: 24,
        tintColor: '#FFFFFF',
    },
    categoryLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2B2B2B',
        marginBottom: 10,
        marginHorizontal: 20,
    },
    categoryContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        marginHorizontal: 20,
    },
    categoryButton: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        marginRight: 10,
    },
    activeCategory: {
        backgroundColor: '#007AFF',
    },
    categoryText: {
        color: '#2B2B2B',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        marginHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2B2B2B',
    },
    seeAll: {
        color: '#007AFF',
    },
    newArrivalsContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    newArrivalsImage: {
        width: ScreenWidth * 0.9,
        height: 150,
        borderRadius: 10,
    },
});
