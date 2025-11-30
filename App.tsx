import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CartProvider, cartSelectors, useCart} from './src/context/CartContext';
import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import ProductDetailsScreen from './src/screens/ProductDetails/ProductDetailsScreen';
import CartScreen from './src/screens/CartScreen';
import CartReviewScreen from './src/screens/CartReviewScreen';
import ConfirmationScreen from './src/screens/ConfirmationScreen';
import CategoriesScreen from './src/screens/CategoriesScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {EvilIcons} from '@react-native-vector-icons/evil-icons';
import {hp} from './src/utils/responsive';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {

  function HomeStack() {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="HomeMain"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetailsScreen}
          options={{title: 'Product Details'}}
        />
      </Stack.Navigator>
    );
  }
  function CartStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="CartMain"
          component={CartScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CartReview"
          component={CartReviewScreen}
          options={{title: 'Review Order'}}
        />
        <Stack.Screen
          name="Confirmation"
          component={ConfirmationScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  }
  function Tabs() {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarShowLabel: true,
          tabBarActiveTintColor: '#000',
          tabBarInactiveTintColor: '#777',
          tabBarIcon: ({color, size}) => {
            let iconName = '';
            if (route.name === 'Home') iconName = 'archive';
            else if (route.name === 'Categories') iconName = 'navicon';
            else if (route.name === 'Cart') iconName = 'cart';
            else if (route.name === 'Profile') iconName = 'user';
             return <EvilIcons name={iconName} size={30} />;
          },
          tabBarActiveBackgroundColor: '#feee00',
          tabBarStyle: {height: hp(6)},
        })}>
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Categories" component={CategoriesScreen} />
        <Tab.Screen name="Cart" component={CartStack} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    );
  }
  return (
    <SafeAreaProvider>
      <CartProvider>
        <NavigationContainer>
          <Tabs />
        </NavigationContainer>
      </CartProvider>
    </SafeAreaProvider>
  );
}
