import React, { Component, useEffect } from "react";
import {  SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { IconButton, Button, List, Avatar } from "react-native-paper";
import Icon  from "react-native-vector-icons/MaterialCommunityIcons";


function LockScreen({navigation}){

    return(
        <KeyboardAwareScrollView>
        <SafeAreaView
            style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', width: "100%" }}
        >  
            <Text>Hello world</Text>
        
        </SafeAreaView>
        </KeyboardAwareScrollView>
    )

}

export default LockScreen;