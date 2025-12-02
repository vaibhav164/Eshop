import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {EvilIcons} from '@react-native-vector-icons/evil-icons';
import SearchScreen from '../screens/SearchScreen';
import ProductDetailsScreen from '../screens/ProductDetails/ProductDetailsScreen';
import CartScreen from '../screens/CartScreen';
import CartReviewScreen from '../screens/CartReviewScreen';
import ConfirmationScreen from '../screens/ConfirmationScreen';
import HomeScreen from '../screens/HomeScreen';
import { hp } from '../utils/responsive';
import CategoriesScreen from '../screens/CategoriesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function RootNavigator() {
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
            else if (route.name === 'Categories') iconName = 'apps';
            else if (route.name === 'Cart') iconName = 'cart-outline';
            else if (route.name === 'Profile') iconName = 'emoticon-excited-outline';
             return <MaterialDesignIcons name={iconName} size={25} />;
          },
          tabBarActiveBackgroundColor: '#feee00',
          tabBarStyle: {height: hp(6)},
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Categories" component={CategoriesScreen} />
        <Tab.Screen name="Cart" component={CartStack} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    );
  }
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="HomeMain"
          component={Tabs}
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

