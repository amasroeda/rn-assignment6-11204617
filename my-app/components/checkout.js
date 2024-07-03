import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, Image, StatusBar, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = () => {
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

  const removeFromCart = async (product) => {
    const newCart = cart.filter((item) => item.cartId !== product.cartId);
    setCart(newCart);
    await AsyncStorage.setItem('cart', JSON.stringify(newCart));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <FlatList
        data={cart}
        keyExtractor={(item) => item.cartId}
        renderItem={({ item }) => (
          <View style={styles.product}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.inner}>
              <Text style={styles.name}>{item.name} </Text>
              <Text style={styles.description}>{item.description} </Text>
              <Text style={styles.price}>{item.price} </Text>
            </View>
              <TouchableOpacity onPress={() => removeFromCart(item)}>
              <Image source={require('../assets/remove.png')} style={styles.remove} />
            </TouchableOpacity>
          </View>
        )}
        ListHeaderComponent={() => (
          <View>
            <View style={styles.header}>
              <Image source={require('../assets/Logo.png')} style={styles.logo} />
              <Image source={require('../assets/Search.png')} style={styles.search} />
            </View>
            <View>
              <Text style={styles.text}>C H E C K O U T</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 22,
  },
  header: {
    marginLeft: 90,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    height: 41,
    width: 100,
    marginLeft: 27
  },
  search: {
    height: 25,
    width: 25
  },
  text:{
    marginVertical: 30,
    textAlign:'center',
    fontSize: 20,
    textDecorationLine: 'underline',
  },
  inner:{
    gap: 5
  },
  product: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  image: {
    width: 120,
    height: 160,
  },
  remove: {
    width: 25,
    height: 25,
    transform: [{ translateX: -70 }, { translateY: 90 }],
  },
  name:{
    fontSize: 15,
    marginTop: 24
  },
  description:{
    color : '#555555',
    fontSize: 13,
  },
  price:{
    color: '#DD8560',
    fontSize: 14,
  },
});

export default CartScreen;
