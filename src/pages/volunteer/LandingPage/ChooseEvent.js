import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image , Alert ,BackHandler} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { EvilIcons, Entypo, AntDesign } from '@expo/vector-icons';
import { loadAllEventData } from "../../../API_Communication/Load_data";
import {  getUserData, saveZoneId } from "../../../AsyncStorage/StoreUserCredentials";

const ChooseEvent = ({navigation}) => {
  const [selectedZone, setSelectedZone] = useState("");
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    // const EntryCheck=async()=>{
    //   console.log("hello");
    //   const {username ,token} =await getUserData();
    //   console.log("display status",username,token);
    // }
    // EntryCheck()
    // loadEventData();
  }, []);

  const loadEventData = async () => {
    console.log("evettttttttttloadddd");
    const {username,token} = await getUserData();
    console.log("tokenfetch",token,"name",username);
    if(token === null){
        const eventListData = await loadAllEventData();
        console.log("elseeeeeeee");
        const transformedData = eventListData.map(event => ({
          key: event.id,
          value: event.title,
          disabled: false,
        }));
        console.log(transformedData)
        setEventList(transformedData);
    }
    else{
     navigation.replace("home");
    }
  // };
}

  const handleSelectEvent =async (val) => {
    alert(val);
    // selectedZone(val);
    saveZoneId(val);
    navigationToNext('Login');

  };

  const navigationToNext=(path)=>{
    navigation.navigate(path);
  }

const zone = [
  {
    key:'calicut',
          value: 'calicut',
          disabled: false,
  },
  {
    key: 'cochin',
          value: 'cochin',
          disabled: false,
  }
  ,{
    key: 'trivandrum',
          value: 'Trivandrum',
          disabled: false,
  }
]


  // avoid backnvigation
  const handleBacknavigation = () => {
    Alert.alert(
        "Exit App",
        "Do you want to exit?",
        [
            {
                text: "No",
                onPress: () => {
                    navigation.navigate("entrypage");
                },
                style: 'cancel'
            },
            {
                text: "Yes",
                onPress: () => {
                    BackHandler.exitApp();
                }
            }
        ],
        { cancelable: false }
    );
    return true;
};

useEffect(() => {
    const backhandler = BackHandler.addEventListener(
        "hardwareBackPress",
        handleBacknavigation
    );
    return () => {
        backhandler.remove();
    }
}, [navigation]);



  return (
    <View style={styles.container}>
      <View style={styles.image_View}>
        <Image style={styles.image_style} source={require('../../../images/LOGO_ICTAK-ENG-ALT-White-Text.png')} />
      </View>
      <View style={styles.dropDownListContainer}>
        <Text style={styles.textTop}>Select the Zone</Text>
        <SelectList
          setSelected={(val)=>handleSelectEvent(val)}
          data={zone}
          // save="key"
          searchicon={<EvilIcons name="search" size={24} color="white" />}
          inputStyles={{ color: '#fff' }}
          boxStyles={{ borderWidth: 1, borderColor: '#fff' }}
          dropdownTextStyles={{ color: '#ffff' }}
          closeicon={<Entypo name="cross" size={24} color="white" />}
          arrowicon={<AntDesign name="down" size={24} color="white" />}
          searchPlaceholder={null}
          // onSelect={()=>handleSelectEvent(selected)}
        />
      </View>
    </View>
  );
}

export default ChooseEvent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#012E41',
  },
  image_View: {
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 0.4
  },
  image_style: {
    height: 80,
    width: 250
  },
  dropDownListContainer: {
    flex: 0.6,
    alignSelf: 'center',
    width: '100%',
    padding: 10
  },
  textTop: {
    color: '#fff',
    alignSelf: 'flex-start',
    paddingBottom: 6
  }
});
