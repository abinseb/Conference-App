import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet,Image,Text,TouchableOpacity,ToastAndroid ,BackHandler} from 'react-native';
import { SafeAreaView,SafeAreaProvider } from "react-native-safe-area-context";
import { MaterialCommunityIcons,Ionicons,FontAwesome5,AntDesign } from '@expo/vector-icons';
import { Button } from "react-native-paper";
import { user_data_based_on_id } from "../../../API_Communication/Load_data";
import { useSelector } from "react-redux";
import { groupName_from_id, userDetailsBasedOnIDFromTable } from "../../../SQLDatabaseConnection/FetchDataFromTable";
import { userVerification } from "../../../API_Communication/Verification";
import { userVerification_Offline } from "../../../SQLDatabaseConnection/Update_Table";
const SingleUserVerification = ({route,navigation}) => {
  // params passing during navigation
  const {qrdata} = route.params;
  // workshopname fetch from redux
  const workshopname = useSelector((state)=>state.workshop.workshopName);
  // userdata store in a useState array
  const [user,setUser] = useState([]);
// token
const token = useSelector((state) => state.auth.token);

// group name
const [groupname,setGroupname] = useState('');
  // back navigation to scan
  const navigationToScan=(screename)=>{
    navigation.navigate(screename);
  }

  // workshopname
  const[worshopNamecapital,setWorkshopNamecapital] = useState('');

  const workshopValue = useRef('');

  useEffect(()=>{
    setWorkshopNamecapital(Capitalise(workshopname));
    userDataFetch();
  },[])
  // to capitalise
  function Capitalise(word) {
    return word.toUpperCase();
  }

  // fetch the user data based on id
  const userDataFetch=async()=>{
    try{
      console.log("userdata arryyaa__________",qrdata);
      const userData = await user_data_based_on_id(qrdata);
      console.log("userdataaa",userData);
     
          const singleUserData = await userData.data[0];
      
          //useref workshop value
          workshopValue.current= singleUserData.workshops[workshopname];
          console.log("workshopname",workshopValue.current)

        if(singleUserData.workshops[workshopname] != 0){
            const groupData = await groupName_from_id(singleUserData.group);
            setGroupname(groupData);
              console.log("groupdata",groupData);
            await setUser(singleUserData);
          }
          else{
            alert("Not Registered");
            navigationToScan();
          }
     
  
    }
    catch(error){
      console.error("catcherror",error)
      showToastNotificationOffline();
      const offlinedata = await userDetailsBasedOnIDFromTable(qrdata);
      console.log("offlinedata###########",offlinedata[0]);
          
        if(Number(offlinedata[0][workshopname]) != 0){
          workshopValue.current= (Number(offlinedata[0][workshopname]));
          setUser(offlinedata[0]);
          const groupdataname = await groupName_from_id(offlinedata[0].groupid);
          setGroupname(groupdataname);
          
        
          }

          else{
            alert("User Not Registered");
            navigationToScan();
          }
   
  }
    
  }
// notification 
function showToastNotificationOffline() {
  ToastAndroid.show("You are Offline", ToastAndroid.SHORT);
}

function showToastNotificationverification() {
  ToastAndroid.show("Verified", ToastAndroid.SHORT);
}
//
  // verification of user based on the workshop
  const handleVerification=async()=>{
    console.log("workshopname#######",workshopname);
    try{
      const verification = await userVerification(qrdata,workshopname,token);
     await console.log("kkkk",verification);
      if(verification === true ){
       showToastNotificationverification();
        navigationToScan(screen='ScanQRCode');
      }
      else if(verification === 403 ){
        alert("Your session has expired due to inactivity. Please log out and log back in to continue using the application")
        let screen = 'Profile'
        navigationToScan(screen);
      }
      else{
       
        alert('Verification Failed');
      }
    }
    catch(error){
      console.log("VerificationError",error);
     // alert("Offline verification Failed");
      userVerification_Offline(qrdata,workshopname);
      navigationToScan(screen='ScanQRCode');
    }
  }

  // avoid backnavigation

useEffect(()=>{
  const handleBackPress =()=>{
    navigationToScan(screen='ScanQRCode');
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    handleBackPress
  );

  return ()=>{
    backHandler.remove();
  };

},[]);
  return (
    <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
        
          <TouchableOpacity onPress={()=>{navigationToScan(screen = 'ScanQRCode')}} style={styles.touchable} >
            <View style={styles.backNavigationView}>
              <FontAwesome5 name="less-than" size={20} color="black" />
            </View>
          </TouchableOpacity>
               
     
        
        <View style={styles.innerBox}>
            {/* Content for innerBox */}
        </View>
        <View style={styles.innerBox2}>
            {/* Content for innerBox2 */}
        </View>
        
        <View style={styles.profileBox}>
            <View style={styles.nameTextTopView}>
                <Text style={styles.nameText}>{user.name} </Text>
                <Text style={styles.institusionText}>{groupname}</Text>
            </View> 
           <View style={{alignSelf:'center',alignItems:'center',paddingTop:20}}>
           <Text style={styles.workshopNameStyle}>{worshopNamecapital}</Text>
           </View>
            <View style={styles.tittleDetails}>
                <Text style={styles.TittleText}>Participant Details</Text>
            </View>
            <View style={styles.otherDetailsView}>
                <View style={styles.iconDataView}>
                <AntDesign name="idcard" size={20} color="black" />
                      <Text style={styles.dataStyle}>{qrdata}</Text>
                      
                  </View>
                <View style={styles.iconDataView}>
                    <MaterialCommunityIcons name="email-outline" size={20} color="black" />
                    <Text style={styles.dataStyle}>{user.email}</Text>
                </View>
                <View style={styles.iconDataView}>
                <Ionicons name="call-outline" size={20} color="black" />
                    <Text style={styles.dataStyle}>{user.mobile}</Text>
                </View>
                
            </View>
            {workshopValue.current === 2?
                 <View style={styles.buttonView}>
                  <Text style={{color:'#228b22',alignSelf:'center',fontSize:20}}>Verified</Text>
                  <Button mode="contained" onPress={navigationToScan} style={styles.customButtonBackToHome}>Back To Home</Button>

                  </View>
            :
            <View style={styles.buttonView}>
                <Button mode="contained" onPress={handleVerification} style={styles.customButton}>Verify</Button>

            </View>
         
            }

        </View> 
        <View style={styles.imageView}>
            <Image style={styles.imageStyle} source={require('./../../../images/icon2.png')} />
        </View>
    </SafeAreaView>
  </SafeAreaProvider>
  );
}

export default SingleUserVerification;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#012E41',
    justifyContent:'center',
    flex: 1,
  },
  innerBox: {
    backgroundColor: '#fff',
    height:'65%',
    width: '100%',
    borderLeftWidth: 70,
    borderTopLeftRadius: 400,
    position:'absolute',
    bottom:0,
    right:0,
    borderLeftColor: 'transparent',

  },
  innerBox2: {
    backgroundColor: '#fff',
    height: '40%',
    width: '20%', // Adjust the width as needed
    position: 'absolute', // Absolute positioning
    bottom: 0, // Align at the bottom
    left: 0, // Align at the left
    borderTopRightRadius:80,
  },
  profileBox:{
    backgroundColor:'#fff',
    height:'70%',
    width:'85%',
    alignSelf:'center',
    borderRadius:30,
    // borderWidth:1,
    elevation:5
  },
  imageView:{
    position:'absolute',
    top:'9%',
    alignSelf:'center',
  },
  imageStyle:{ 
    height:90,
    width:90
  },
  nameTextTopView:{
    alignItems:'center',
    paddingTop:'18%'

  },
  nameText:{
    fontWeight:'600',
    fontSize:22,
    
  },
  institusionText:{
    color:'#969595',
    fontSize:13,
    fontWeight:'600',
    paddingTop:10,
  },
  tittleDetails:{
    alignItems:'center',
    paddingTop:'5%'
  },
  
  otherDetailsView:{
    alignItems:'flex-start',
    paddingTop:20,
   
  },
  TittleText:{
    fontSize:16,
    fontWeight:'600'
  },
  iconDataView:{
    paddingLeft:'17%',
    flexDirection:'row',
    alignItems:'center',
    margin:10
  },
  dataStyle:{
    fontSize:17,
    fontWeight:'300',
    paddingLeft:10
  },
  buttonView:{
   alignSelf:'center',
   position:'absolute',
   bottom:100,
  },
  customButton:{
    width:170,
    backgroundColor:'#012E41'
  },

  backNavigationView:{
    
    height:40,
    width:40,
    backgroundColor:'#ffff',
    borderRadius:22,
    margin:'10%',
    marginTop:'35%',
    alignItems:'center',
    justifyContent:'center',
},

touchable:{
  top:0,
  position:'absolute',
},
workshopNameStyle:{
fontWeight:'900',
fontSize:20,
},
customButtonBackToHome:{
  width:170,
  backgroundColor:'#008000'
},
});
