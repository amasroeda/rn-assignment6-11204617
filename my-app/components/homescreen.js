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
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.product}>
            <Image source={item.image} style={styles.image} />
            <TouchableOpacity onPress={() => addToCart(item)}>
              <Image source={require('../assets/add_circle.png')} style={styles.addCircle} />
            </TouchableOpacity>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.price}>{item.price}</Text>
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
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Cart')}>
            <Text style={styles.buttonText}>Go to Cart</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 22,
  },
  product: {
    marginBottom: 16,
  },
  image:{
    width: 155,
    marginRight: 20,
  },
  addCircle:{
    transform: [{ translateX: 125 }, { translateY: -30 }],
  },
  name:{
    fontSize: 15,
    marginTop: -16
  },
  description:{
    color : '#555555',
    fontSize: 11,
  },
  price:{
    color: '#DD8560',
    fontSize: 14,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menu: {
    height: 30,
    width: 20
  },
  logo: {
    height: 41,
    width: 100,
    marginLeft: 27
  },
  innerHeader:{
    display: 'flex',
    flexDirection: 'row',
    gap: 9,
  },
  search: {
    height: 25,
    width: 25
  },
  shoppingBag: {
    height: 25,
    width: 25
  },
  sectionHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 30,
    alignItems: 'center'
  },
  ourStory: {
    fontSize: 20,
  },
  imageWrapper:{
    backgroundColor:'#E8E8E8',
    padding: 10,
    borderRadius: 40,
},
  icons: {
    flexDirection: 'row',
    gap: 10,
  },
  addToCartImage: {
    width: 30,
    height: 30,
  },
  button:{
    color: 'black',
    backgroundColor:'#E8E8E8',
    padding: 10,
  },
  buttonText:{
     textAlign: 'center'
  }
});

export default HomeScreen;
