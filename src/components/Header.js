import React from "react"
import { TouchableOpacity } from "react-native";
import { Appbar,Avatar, Title, useTheme, withTheme } from "react-native-paper";
import  Icon  from "react-native-vector-icons/MaterialCommunityIcons";

const Header = ({ scene, previous, navigation}) => {
    const { options } = scene.descriptor;

    const title =
      options.headerTitle !== undefined
        ? options.headerTitle
        : options.title !== undefined
        ? options.title
        : scene.route.name;

    
  
    return (
      <Appbar.Header >
        { /*previous ? (
          <Appbar.BackAction
            onPress={navigation.goBack}
            
          />
        ) : (
          <Appbar.Action
            onPress={() => {navigation.toggleDrawer()}}
            icon={props =>  <Icon {...props}                             
                  name="format-list-bulleted"
                  
                />}
          />               
            
        )*/}
        <Appbar.Content
           title={title} 
           titleStyle={{textAlign: 'center'}}
        />
        {options.headerRight &&
          <Appbar.Action icon={"dots-vertical"} onPress={options.headerRight} />
        }
        {options.headerRightIcon && 
          <Appbar.Action icon={options.headerRightIcon.icon} onPress={options.headerRightIcon.function} />
        }
      </Appbar.Header>
    );
  };

  export default Header;