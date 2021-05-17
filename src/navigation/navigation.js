import React, { Component, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { DrawerActions, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { useDispatch } from "react-redux";


import HistoryScreen from "../containers/HistoryScreen";
import LockScreen from "../containers/LockScreen";
import ReadScreen from "../containers/ReadScreen"
import { getHistory } from "../redux/actions/historyAction";





function Navigation() {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();
 
  const dispatch=useDispatch()

  function HistoryStack({ navigation }) {
    return (
      <Stack.Navigator>
         <Stack.Screen
          name="History"
          component={HistoryScreen}
          
        />       
       
      </Stack.Navigator>
    );
  }

  function LockStack({ navigation }) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Lock"
          component={LockScreen}          
        />
      </Stack.Navigator>
    );
  }

  function ReadStack({ navigation }) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Read NFC"
          component={ReadScreen}          
        />
      </Stack.Navigator>
    );
  }


  

  function TabNavigator(props) {
    return (
      <Tab.Navigator
        screenOptions={(props) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            var route = props.route;
            if (route.name === "Lock") {
              iconName = focused ? "lock-open" : "lock-open-outline";
            } else if (route.name === "Read") {
              iconName = focused ? "eye" : "eye-outline";
            } else if (route.name === "History") {
              iconName = focused ? "format-list-bulleted" : "format-list-bulleted";
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "red",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen name="Lock" component={LockStack} />
        <Tab.Screen name="Read" component={ReadStack} />
        <Tab.Screen name="History" component={HistoryStack} />
      </Tab.Navigator>
    );
  }

  useEffect( ()=>{
    dispatch(getHistory())

  },[])
    

  return (
    <NavigationContainer>
      <TabNavigator></TabNavigator>
    </NavigationContainer>
  );
}

export default Navigation;
