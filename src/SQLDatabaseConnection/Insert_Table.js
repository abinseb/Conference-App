
import { Group_list_load, event_Data_Load, user_data_load, workshop_data_load } from "../API_Communication/Load_data";
import * as SQLite from 'expo-sqlite';
const db =  SQLite.openDatabaseAsync('Event.db');

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