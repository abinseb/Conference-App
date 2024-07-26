import axios from "axios";

import { URL_Connection,eventID } from "../connection/Url_connection";
import { getEventId } from "../AsyncStorage/StoreUserCredentials";


// fetch url
const url = URL_Connection();

// fetch eventId
const eventid = eventID();

export const userVerification=async(userID,workshopName,token)=>{
    const event_id = await getEventId();
    console.log("eventidddd",event_id);
    try {
        console.log(userID, workshopName, event_id,token);
        const response = await axios.post(`${url}/volunter/verify`, {
            "eventid":event_id,
            "workshop": workshopName,
            "userid": userID
        },{
            headers:{
                Authoriztion:token,
            },
        });
    
        console.log(response.data);
        return response.data.verification;  // Return the value
    
    } catch (error) {
        console.log("Error", error.response.status);
        return error.response.status
    }
    
}




export const unverify_user=async(userid,worshopname,token)=>{
    const event_id = await getEventId();
    try{
        console.log("dtaaaa",userid,worshopname);
        const response = await axios.post(`${url}/volunter/unverify`,{
            "eventid":event_id,
            "workshop" : worshopname,
            "userid" : userid
        },{
            headers:{
                Authoriztion:token,
            },
        });
        console.log("out",response.data);
        return await response.data.verification;
    }
    catch(errr){
        console.error("error in unverification",errr.response.status);
        return errr.response.status;
    }
}

// http://localhost:3000/volunter/sync

export const sync_OfflineData_verification=async(offlineData)=>{
    const event_id = await getEventId();
    try{
      const response = await axios.post(`${url}/volunter/sync`,{
            "event" : event_id,
            "data" :offlineData,
        });
        console.log(response.data);
        return response.data;
    }
    catch(errr){
        console.log("Error in syncing",errr);
    }
}