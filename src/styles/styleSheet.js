

import themeApp from "./theme";
import  {StyleSheet, Platform, StatusBar} from "react-native"

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const styles = StyleSheet.create({
    
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: themeApp.colors.accent
    },
    statusBar: {
      height: STATUSBAR_HEIGHT
      }

  });

export default styles

