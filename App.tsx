import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootNavigator from './src/Navigation/RootNavigator';
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import {loadCart} from './src/store/slices/cartSlice';
import { useEffect } from 'react';
export default function App() {

  useEffect(() => {
    store.dispatch(loadCart());
  }, []);

  return (
    <Provider store={store}>
    <SafeAreaProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
    </SafeAreaProvider>
    </Provider>
  );
}