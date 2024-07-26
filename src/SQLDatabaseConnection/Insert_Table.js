
import { Group_list_load, event_Data_Load, user_data_load, workshop_data_load } from "../API_Communication/Load_data";
import * as SQLite from 'expo-sqlite';
const db =  SQLite.openDatabaseAsync('Event.db');

// insert data into event table
export const insertEventTable = async () => {
    try {
        const eventData = await event_Data_Load();
        console.log(eventData.title);

       await db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO event_table (id, title, description, host, date, venu) VALUES (?, ?, ?, ?, ?, ?);',
               [
                eventData._id,
                eventData.title,
                eventData.description,
                eventData.host,
                eventData.venu,
               ],
                () => console.log('Event inserted successfully'),
                (tx, error) => console.error('Error inserting event:', error)
            );
        });
    } catch (error) {
        console.error('Error loading event data:', error);
        
    }
};

export const insertWorkshopTable=async()=>{
    try{

        const workshopData = await workshop_data_load();
       
          await db.transaction((tx)=>{
                workshopData.forEach((element) => {
                    console.log("kkkk",element.title ,element._id,
                    element.title,
                    element.description,
                    element.venu,
                    element.date,
                    element.event,
                    );
                 tx.executeSql(
                    'INSERT INTO workshop_table (id,title,description,venu,date,event,icon) VALUES (?,?,?,?,?,?,?);',
                    [
                        element._id,
                        element.title,
                        element.description,
                        element.venu,
                        element.date,
                        element.event,
                        element.icon
                    ],
                    ()=>console.log("inerted workshop"),
                    (error)=>{
                        console.error("eror workshop insert error")
                        console.log(error)
                
                }
                )
            })
            
        });
    }
   catch(error){
    console.log("error loading workshop data",error);
   }
}


// insert to user table
export const insert_To_UserTable=async()=>{

    try{
        const userData = await user_data_load();
        
       await db.transaction((tx)=>{
            userData.forEach((user)=>{
                console.log("timestamp",userData.time_stamp)
               tx.executeSql(
                'INSERT INTO user_table (id,name,mobile,groupid,email,Time)VALUES(?,?,?,?,?,?);',
                [
                    user._id,
                    user.name,
                    user.mobile,
                    user.group,
                    user.email,
                    user.time_stamp
                ],
                ()=> console.log("insert partily to userTable"),
                (error)=> console.error("error in inserting_user_table",error)
               )
                
            })
        })

    }
    catch(err){
        console.log(err);
    }
}

// offline data insert

export const offline_dataInsert=(userid,workshop)=>{
    try{
        db.transaction((tx)=>{
            tx.executeSql(
                'INSERT INTO offline_table (id ,workshopName) VALUES (?,?);',
                [userid,workshop],
                ()=>console.log("Insert id and workshop offlinetble"),
                (error)=> console.error("Error in insertion",error)
            )
        })
    }
    catch(error){
    console.log("Error in inserting offline ",error)
    }
}

// insert data into group table
export const insert_group_table=async()=>{
    try{
        const groupData = await Group_list_load();

       await db.transaction((tx)=>{
           groupData.forEach((group)=>{
            tx.executeSql(
                'INSERT INTO group_table (id,name) VALUES (?,?);',
                [
                    group._id,
                    group.name
                ],
                ()=>console.log("insert data to group table"),
                (err)=> console.log("error in inserting",err)
            )
           })
        })
    }
    catch(err){
        console.log("Error in inserting",err);
    }
}