import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveZoneId=async(eventid)=>{
    try{
        await AsyncStorage.setItem('zone',eventid);
    }
    catch(err){
        console.error(err);
    }
}

export const getEventId=async()=>{
    try{
        const EventId = await AsyncStorage.getItem('EventId');
        console.log(EventId)
        return await EventId;
    }
    catch(err){
        console.error(err);
    }
}

export const removeEventId =async()=>{
    try{
       
        await AsyncStorage.removeItem('EventId');
    }
    catch(err){
        console.log(err);
    }
}
// To save user data (username and , token)
export const saveUserData = async(username,token)=>{
    try{
        const userData = JSON.stringify({username,token});
        await AsyncStorage.setItem('userData',userData);
    }
    catch(error){
        console.error('Error in user data saving',error);
    }
};

// To retrive user data
export const getUserData =async()=>{
    try{
        const userData = await AsyncStorage.getItem('userData');
        if(userData !== null){
            const parsedUserData = JSON.parse(userData);

            // return user name annd token seperately
            const {username,token} = parsedUserData;
            console.log("user credentials in asyncstorage",parsedUserData);
            return {username , token};
        }
        else{
            console.log("username and token are null");
            
            return { username: null, token: null };
        }
    }
    catch(error){
        console.error('Error retriving user Data',error);
    }
};

// To remove user data
export const removeUserData =async()=>{
    try{
        await AsyncStorage.removeItem('userData');
    }
    catch(error){
        console.error('Error removing user data:', error);
    }
}