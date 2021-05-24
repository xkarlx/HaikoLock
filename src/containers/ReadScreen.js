import React, { Component, useEffect, useState } from "react";
import {  SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { IconButton, Button, List, Avatar, Card, Paragraph, Switch } from "react-native-paper";
import Icon  from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch } from "react-redux";


import { showMessage, hideMessage } from "react-native-flash-message";
import { createHistory } from "../redux/actions/historyAction";
import { readNFCAction } from "../utils/NFCManager";

function ReadScreen({navigation}){

    const [state,setState] =useState()
    const dispatch = useDispatch()

    
    async function fulfillWithTimeLimit(timeLimit, task, failureValue){
        let timeout;
        const timeoutPromise = new Promise((resolve, reject) => {
            timeout = setTimeout(() => {
                resolve(failureValue);
            },timeLimit)
        });
        const response = await Promise.race([task.then(res=>res), timeoutPromise]);
        if(timeout){ //the code works without this but let's be safe and clean up the timeout
            clearTimeout(timeout);
        }
    
        return response;
    }
    
    async function readNFC(){
        let timeLimit = 10000; // 1 sec time limit
        let failureValue = null; // this is null for just an example.
        let data = await fulfillWithTimeLimit(timeLimit, readNFCAction(), failureValue);
        
        if(data == null){ //in case longTask doesn't fulfill within the time limit
            showMessage({
                message: "Can't find NFC",
                type: "danger",
              });
        }
        else{
            var today = new Date();
            setState({key:data.id,readDate:today,selected:true});
        }  
     }
  
    
    function save(){
        dispatch(createHistory(state))
        showMessage({
            message: "Data saved",
            type: "success",
          });
        setState(undefined)
    }
    
    const onToggleSwitch = () => setState({...state,selected:!state.selected});

    function seed(){
        var today = new Date();
        setState({key:String(Math.random()),readDate:today,selected:true});
    }

    return(
      
        <SafeAreaView
            style={{ flex: 1 }}
        >  
        <View style={{padding:10}}>
            {state &&
                <Card style={{backgroundColor:"white"}}>
                    <Card.Title  style={{color:"black"}} title="NFC Data"></Card.Title>
                    <Card.Content style={{flexDirection:"row",justifyContent:"space-between"}}>
                        <Paragraph style={{color:"black"}}>KEY:</Paragraph>
                        <Paragraph style={{color:"black"}}>{state.key}</Paragraph>
                    </Card.Content>
                    <Card.Content style={{flexDirection:"row",justifyContent:"space-between"}}>
                        <Paragraph style={{color:"black"}}>Data:</Paragraph>
                        <Paragraph style={{color:"black"}}>{state.readDate.toUTCString()}</Paragraph>
                    </Card.Content>
                    <Card.Content style={{flexDirection:"row",justifyContent:"space-between"}}>
                    <Paragraph style={{color:"black"}}>Selected</Paragraph>
                            <Switch value={state.selected} onValueChange={onToggleSwitch} />
                    </Card.Content>
                    
                   
                </Card>
            }

            <View>
                <Button onPress={()=>seed()}>Add</Button>

            </View>
           
        </View>
       
           <View style={{position:"absolute",bottom:0,width:"100%",padding:10,backgroundColor:"white"}}>
                {state==undefined ?
                <Button onPress={()=>readNFC()} mode="contained">Read</Button>
                    :
                <Button onPress={()=>save()} mode="contained">Save</Button>
                }

            </View>
        </SafeAreaView>
       
    )

}

export default ReadScreen;