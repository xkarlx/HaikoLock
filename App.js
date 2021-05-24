import 'react-native-gesture-handler';
import * as React from 'react';
import { Text, View } from 'react-native';

import { Provider } from 'react-redux'
import rootReducer from './src/redux/reducers/rootReducer'
import { applyMiddleware, createStore } from 'redux'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Navigation from './src/navigation/navigation';
import thunk from 'redux-thunk';

import { Provider as PaperProvider } from 'react-native-paper';
import FlashMessage from 'react-native-flash-message';

import themeApp from "./src/styles/theme"
import GeneralStatusBarColor from './src/components/GeneralStatusBarColor';
import SplashScreen from 'react-native-splash-screen';

export default function HadikoLock() {

  const store = createStore(rootReducer,applyMiddleware(thunk))

  React.useEffect(()=>{
    SplashScreen.hide()

  },[])

  return (
    
    <Provider store={store}>
      <PaperProvider theme={themeApp}>
      <GeneralStatusBarColor backgroundColor={themeApp.colors.primary}
              barStyle="light-content"/>
      <SafeAreaProvider>
        <View style={{ flex: 1 }}>
          <Navigation></Navigation>
          <FlashMessage position="top" />
        </View>
      </SafeAreaProvider>
      </PaperProvider>
    </Provider>
 
  );
}