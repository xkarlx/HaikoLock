import React, { Component, useEffect, useRef, useState } from "react";
import {StyleSheet,  SafeAreaView, Text, TouchableOpacity, View, KeyboardAvoidingView, TextInput, RefreshControl } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, Card,List, Paragraph, Title, useTheme } from "react-native-paper";
import Icon  from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import RBSheet from "react-native-raw-bottom-sheet";
import { deleteCompleteHistory, deleteHistory, getHistory, setHistoryAsSelected } from "../redux/actions/historyAction";
import { Colors } from "react-native/Libraries/NewAppScreen";


function HistoryScreen({navigation}){

    const historyState = useSelector(state=>state.history)
    const [selectedID, setSelectedID] = useState(undefined);
    const refRBSheet = useRef();

    const {colors} = useTheme()
    const dispatch = useDispatch()

    function popUpMenu(element) {
    
      setSelectedID(element._id);
      refRBSheet.current.open()
  }

  function selectHistoryButton(){
    dispatch(setHistoryAsSelected(selectedID))
    refRBSheet.current.close()
  }

  function deleteHistoryButton(){
  
    dispatch(deleteHistory(selectedID))
    refRBSheet.current.close()
  }

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
      setRefreshing(true);     
      dispatch(getHistory());
      setRefreshing(false);
  }, []);

  useEffect(() => {
    const reload = navigation.addListener("focus", onRefresh);

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return reload;
}, [navigation]);


function selectedElement(element){
 
  if(historyState.selected!=undefined){
    if(historyState.selected.history != "null" && historyState.selected.history!=undefined){
      
      if(historyState.selected.history._id == element._id){
        return true
      }
    }
  } 
  return false
}

    return (
        <SafeAreaView style={{flex: 1}}>
            <KeyboardAwareScrollView style={{flex: 1}} refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
                  <RBSheet
                            ref={refRBSheet}
                            closeOnDragDown={true}
                            closeOnPressMask={true}
                            height={175}
                            customStyles={{
                                wrapper: {
                                    backgroundColor: "transparent"
                                },
                                draggableIcon: {
                                    backgroundColor: "#000"
                                }
                            }}
                        >
                            <View style={{ flex: 1, alignItems: "flex-start" }}>
                                <Card style={{ flex: 1, padding: 0, width: '100%' }}>
                                    <Card.Content>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: '100%' }}>
                                            <Title style={{}}>Preferences</Title>
                                        </View>
                                    </Card.Content>

                                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: "flex-start", alignItems: "flex-start" }} >
                                        <TouchableOpacity style={{ flex: 1, flexDirection: 'row', justifyContent: "flex-start", alignItems: "flex-start", width:"100%"}} onPress={() => selectHistoryButton()}>
                                            <Icon style={{ fontSize: 18, margin: 15, marginLeft: 45, color: 'black' }} name="star" > </Icon>
                                            <Text style={{ fontSize: 16, margin: 12, color: 'black' }}>Set as selected</Text>
                                        </TouchableOpacity>                                       
                                        <TouchableOpacity style={{ flex: 1, flexDirection: 'row', justifyContent: "flex-start", alignItems: "flex-start", width:"100%" }} onPress={() => deleteHistoryButton()}>
                                            <Icon style={{ fontSize: 18, margin: 15, marginLeft: 45, color: 'red' }} name="delete-outline" > </Icon>
                                            <Text style={{ fontSize: 16, margin: 12, color: 'red' }}>Delete</Text>
                                        </TouchableOpacity>
                                    </View>
                                </Card>
                            </View>
                        </RBSheet>

                <View style={{padding:10}}>

                    <Card >
                        <Card.Title title="Overview" ></Card.Title>
                        {historyState.data.length>0 ?
                        <Card.Content>
                            
                            {historyState.data.map((element)=>{
                             
                              return  <List.Item key={element._id}
                                title={"KEY: "+element.key}
                                titleStyle={selectedElement(element) ? {color:colors.primary,fontWeight:"bold"}:{}                             
                                }
                                description={element.readDate.toString()}
                                right={(props)=><TouchableOpacity onPress={() => popUpMenu(element)}>
                                                  <Icon style={{ fontSize: 25, alignSelf: "center", margin: 15, color: 'grey' }} name="dots-vertical"></Icon>
                                              </TouchableOpacity>}
                              />
                            })
                            
                            }
                            
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