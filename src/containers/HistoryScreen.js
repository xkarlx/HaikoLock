import React, { Component, useEffect } from "react";
import {StyleSheet,  SafeAreaView, Text, TouchableOpacity, View, KeyboardAvoidingView, TextInput } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, Card,List, Paragraph } from "react-native-paper";
import Icon  from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";

import { deleteCompleteHistory } from "../redux/actions/historyAction";


function HistoryScreen({navigation}){

    const historyState = useSelector(state=>state.history)
    const dispatch = useDispatch()

    console.log(historyState);
    historyState.data.forEach(element=>console.log(element))
    return (
        <SafeAreaView style={{flex: 1}}>
            <KeyboardAwareScrollView style={{flex: 1}}>

                <View style={{padding:10}}>

                    <Card >
                        <Card.Title title="Overview" ></Card.Title>
                        {historyState.data.length>0 ?
                        <Card.Content>
                            
                            {historyState.data.map((element)=>{
                              return  <List.Item key={element._id}
                                title={"KEY: "+element.key}
                                description={element.readDate.toString()}
                                right={(props)=>{return element.selected ? <Icon  name="star"></Icon> : <Icon name="star-outline"></Icon>}}
                              />
                            })}
                            
                        </Card.Content>
                      :
                        <Card.Content>
                          <Paragraph>No data provided</Paragraph>
                        </Card.Content>
                      }
                    </Card>
                    
                </View>
               
            </KeyboardAwareScrollView>
            <View style={{position:"absolute",bottom:0,width:"100%",padding:10,backgroundColor:"white"}}>
                   
                   <Button onPress={()=>dispatch(deleteCompleteHistory())} mode="contained">Delete ALL</Button>
               </View>
        </SafeAreaView>
      );

}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
  });
export default HistoryScreen;