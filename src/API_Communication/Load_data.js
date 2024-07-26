import axios from "axios";
import { URL_Connection, eventID } from "../connection/Url_connection";
import { insertWorkshopTable, insert_To_UserTable } from "../SQLDatabaseConnection/Insert_Table";
import { Create_user_table } from "../SQLDatabaseConnection/Create_Table";
import { update_user_Table } from "../SQLDatabaseConnection/Update_Table";
import { event_id } from "../SQLDatabaseConnection/FetchDataFromTable";
import { getEventId } from "../AsyncStorage/StoreUserCredentials";

// fetch url 
const url = URL_Connection();

// fetch evetid
const eventId = getEventId();
// load event data from server
export const event_Data_Load=async()=>{
  const evnid = await getEventId();
  console.log("Eventdataaid",evnid);
  try {
    const response = await axios.get(`${url}/event/get/${evnid}`);
    console.log('Response:', response.data[0].title,`${url}/event/get/${eventId}`);
    return response.data[0];
  } catch (error) {
    console.log('Error:', error.response);
    throw error; // Re-throw the error if you want to handle it further
  }

}

// workshope data load
export const workshop_data_load=async()=>{
  const evnid = await getEventId();
  console.log("eventid",evnid)
  try{
    console.log("EventId",eventId._j);
    const response = await axios.get(`${url}/workshop/get/${evnid}`);
    // console.log("workshop response",response.data);
    const workshop = response.data;
    const workshopeName = workshop.map(item => item.title);
    console.log("workshopne name load",workshopeName);
    // await insertWorkshopTable(workshop);
    // await Create_user_table(workshopeName);
    return await workshop;
  }
  catch(error){
    console.log("catchEventId",eventId._j);
    console.error(`ErrorWorkshopdata ${url}/workshop/get/${eventId._j} :`,error);
    throw error;
  }
}

// workshop name and userdata
export const Data_for_Update_UserTable=async()=>{
  try{
    const workshopData = await workshop_data_load();
    const worksop =await workshopData.map(item => item.title);
    console.log("hii  hiii",worksop);

    const userData = await user_data_load();
    console.log("userdataforUpdation",userData);

    // update user Table
     await update_user_Table(userData,worksop);

  }
  catch(error){
    console.log(error);
  }
}
// load user data
export const user_data_load=async()=>{
  const evnid = await getEventId();
   try{
    const response = await axios.get(`${url}/participants/get/${evnid}`);
    const userData = response.data;
    // await insert_To_UserTable(userData);
    return await userData;
    
   }
   catch(error){
      console.log('Error :',error);
   } 
}


// load userdata based on userid and eventid
export const user_data_based_on_id =async(userId)=>{
  const evnid = await getEventId();
  try{
    const response = await axios.get(`${url}/participants/get/user/${evnid}/${userId}`);
    const singleUserData = response.data;
    console.log(singleUserData);
    return await singleUserData;
  }
  catch(err){
    console.log("error",err);
  }
}


// Group name list
export const Group_list_load=async()=>{
  const evnid = await getEventId();
    try{
        const response = await axios.get(`${url}/volunter/get/group/${evnid}`)
        const grouplist = response.data.group;
        console.log("__________list",grouplist);
        return await grouplist;
      
    }
    catch(error){
      console.error("Error in fetching dataa", error);
      throw error;
    }
}

// localhost:3000/volunter/getusergroup/6549f0527a62f323d043db53/655c3ddc1efe562dd9903413/oracle
// list the students based on the groups
export const List_userbasedOn_group=async(groupId,workshopName)=>{
  const evnid = await getEventId();
  try{
    console.log("grpid",groupId,"workshp",workshopName,"________",`${url}/volunter/getusergroup/${eventId._j}/${groupId}/${workshopName}`);
      const response = await axios.get(`${url}/volunter/getusergroup/${evnid}/${groupId}/${workshopName}`)
      const groupUser = response.data;
      console.log("list of user_basedOn group",groupUser);
      return await groupUser.data;
  }
  catch(error){
    console.error("Error in listing",error);
  }
}

// unverified user data based on group and workshop
export const list_verifiedUserData_basedOngroup=async(groupid,workshopname)=>{
  const evnid = await getEventId();
    const response = await axios.get(`${url}/volunter/getusergroup/unverify/${evnid}/${groupid}/${workshopname}`);
    const verifiedUser = response.data;
    console.log("verified user based on group",verifiedUser);
    return await verifiedUser.data;
 
}


// fetch the user id from the userdata
export const fetchThe_userId=async(emailOrMobile)=>{
  const evnid = await getEventId();
  try{
    const userId = await axios.get(`${url}/volunter/search/${evnid}/${emailOrMobile}`)
    const userdata = userId.data;
    console.log("userId",userdata.data);
    return userdata.data;

  }
  catch(error){
    console.log("Error in fetching",error);
  }
}



export const loadAllEventData=async()=>{
  
  try{
    const eventDataList = await axios.get(`${url}/get/event`)
    console.log(`${url}/get/event`)
    const eventData = eventDataList.data.data;
    // console.log("Event dataloaddddk",eventData);
    const eventList = eventData.map((event)=>({id:event._id,title:event.title}))
    // console.log("Dataaa",eventList);
    return await eventList;
  }
  catch(error){
    console.log(`${url}/get/event`)
    console.error("Error in load Data",error);
  }
}