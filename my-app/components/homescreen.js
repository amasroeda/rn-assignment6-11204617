import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, SafeAreaView, Image, StatusBar, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PRODUCTS = [
  { id: '1', name: 'Office Wear', description: 'reversible angora cardigan', image: require('../assets/dress1.png'), price: '120$' },
  { id: '2', name: 'Black', description: 'reversible angora cardigan', image: require('../assets/dress2.png'), price: '120$' },
  { id: '3', name: 'Church Wear', description: 'reversible angora cardigan', image: require('../assets/dress3.png'), price: '120$' },
  { id: '4', name: 'Lamerei', description: 'reversible angora cardigan', image: require('../assets/dress4.png'), price: '120$' },
  { id: '5', name: '21WN', description: 'reversible angora cardigan', image: require('../assets/dress5.png'), price: '120$' },
  { id: '6', name: 'Lopo', description: 'reversible angora cardigan', image: require('../assets/dress6.png'), price: '120$' },
  { id: '7', name: '21WN', description: 'reversible angora cardigan', image: require('../assets/dress7.png'), price: '120$' },
  { id: '8', name: 'Lame', description: 'reversible angora cardigan', image: require('../assets/dress3.png'), price: '120$' },
];

const HomeScreen = ({ navigation }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const storedCart = await AsyncStorage.getItem('cart');
        if (storedCart) setCart(JSON.parse(storedCart));
      } catch (error) {
        console.error('Failed to load cart from storage');
      }
    };

    loadCart();
  }, []);

  const addToCart = async (product) => {
    const newCartItem = { ...product, cartId: `${product.id}-${Date.now()}` };
    const newCart = [...cart, newCartItem];
    setCart(newCart);
    await AsyncStorage.setItem('cart', JSON.stringify(newCart));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <FlatList
        data={PRODUCTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.product}>
            <Image source={item.image} style={styles.image} />
            <TouchableOpacity onPress={() => addToCart(item)}>
              <Image source={require('../assets/add_circle.png')} style={styles.addToCartImage} />
            </TouchableOpacity>
            <Text>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text>{item.price}</Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <>
            <View style={styles.header}>
              <Image source={require('../assets/Menu.png')} style={styles.menu} />
              <Image source={require('../assets/Logo.png')} style={styles.logo} />
              <View style={styles.innerHeader}>
                <Image source={require('../assets/Search.png')} style={styles.search} />
                <Image source={require('../assets/shoppingBag.png')} style={styles.shoppingBag} />
              </View>
            </View>
            <View style={styles.sectionHeading}>
              <Text style={styles.ourStory}>O U R   S T O R Y</Text>
              <View style={styles.icons}>
                <View style={styles.imageWrapper}>
                  <Image source={require('../assets/Listview.png')} style={styles.listView} />
                </View>
                <View style={styles.imageWrapper}>
                  <Image source={require('../assets/Filter.png')} style={styles.filter} />
                </View>
              </View>
            </View>
          </>
        )}
        ListFooterComponent={() => (
          <Button title="Go to Cart" onPress={() => navigation.navigate('Cart')} />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  product: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
  },
  sectionHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
  },
  ourStory: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  imageWrapper: {
    marginHorizontal: 8,
  },
  icons: {
    flexDirection: 'row',
  },
  image: {
    width: 50,
    height: 50,
  },
  addToCartImage: {
    width: 30,
    height: 30,
  },
});

export default HomeScreen;
