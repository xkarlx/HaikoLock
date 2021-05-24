import React, { Component, useEffect,useState } from "react";
import {  SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { IconButton, Button, List, Avatar, Card, Paragraph, useTheme, Surface } from "react-native-paper";
import Icon  from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import { showMessage, hideMessage } from "react-native-flash-message";
import { writeNFCAction } from "../utils/NFCManager";
function LockScreen({navigation}){
    
    const historyState = useSelector(state=>state.history)
    const [reading,setReading] = useState(false)
    const {colors} = useTheme()
    const historySet = React.useMemo(()=>{
        if(historyState.selected != undefined){
            if(historyState.selected.history !="null" && historyState.selected.history !=undefined){
                return true
            }
            
        }
        return false
        },[historyState])
    

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
    
    async function openDoor(){
        setReading(true)
        let timeLimit = 10000; // 1 sec time limit
        let failureValue = null; // this is null for just an example.
        console.log("open door")
        let data = await fulfillWithTimeLimit(timeLimit, writeNFCAction(), failureValue);
        
        if(data == null){ //in case longTask doesn't fulfill within the time limit
            showMessage({
                message: "Can't find NFC",
                type: "danger",
                });
        }
        else{
            console.log(data)
        } 
        setReading(false)
        
        }

   

    return(
        
        <SafeAreaView
            style={{ flex: 1}}
        >  
            
            
            {historySet ?
                <View style={{padding:10,flex:1}}>
                    <Card style={{backgroundColor:"white"}}>
                        <Card.Title  style={{color:"black"}} title="NFC Data"></Card.Title>
                        <Card.Content style={{flexDirection:"row",justifyContent:"space-between"}}>
                            <Paragraph style={{color:"black"}}>KEY:</Paragraph>
                            <Paragraph style={{color:"black"}}>{historyState.selected.history.key}</Paragraph>
                        </Card.Content>
                        <Card.Content style={{flexDirection:"row",justifyContent:"space-between"}}>
                            <Paragraph style={{color:"black"}}>Data:</Paragraph>
                            <Paragraph style={{color:"black"}}>{historyState.selected.history.readDate}</Paragraph>
                        </Card.Content>   
                    
                    </Card>
                    <View style={{flex:1, justifyContent:"center",alignItems:"center"}}>
                        
                            <IconButton size={125} disabled={reading} onPress={()=>openDoor()}  style={{backgroundColor:colors.accent,elevation:10}}  icon={(props)=><Icon {...props} color={colors.primary} name="lock"></Icon>}>

                            </IconButton>
                     
                    </View>
                </View>
            :
            <View style={{padding:10,flex:1,justifyContent: 'center',}}>
                <Card style={{backgroundColor:"white"}}>
                    <Card.Title  style={{color:"black"}} title="No data available"></Card.Title>
                    <Card.Content>
                        <Button mode="contained"  onPress={()=>navigation.navigate("Read")}>READ KEY</Button>
                    </Card.Content>
                
                </Card>
            </View>
            }
           

        
        </SafeAreaView>
       
    )

}

export default LockScreen;