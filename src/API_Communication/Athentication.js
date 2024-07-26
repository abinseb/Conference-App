import axios from "axios";
import { URL_Connection } from "../connection/Url_connection";

const url = URL_Connection();
export const authenticate_Volunteer=async(username,password)=>{
    try{
        const authResponse = await axios.post(`${url}/auth/login`,{
            "email" : username,
            "password" : password
        })
        console.log("response authResponse",authResponse.data);
        return authResponse.data;
    }
    catch(err){
        console.log("Error in authentication",err);
    }
}