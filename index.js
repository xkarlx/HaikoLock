import 'react-native-gesture-handler';
import {
    AppRegistry,
  } from 'react-native';
import HadikoLock from "./App"
  import { name as appName } from "./app.json";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
AppRegistry.registerComponent(appName, () => HadikoLock);

export default HadikoLock;