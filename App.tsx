import {NavigationContainer} from '@react-navigation/native';
import {CartProvider} from './src/context/CartContext';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootNavigator from './src/Navigation/RootNavigator';

export default function App() {


  return (
    <SafeAreaProvider>
      <CartProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </CartProvider>
    </SafeAreaProvider>
  );
}