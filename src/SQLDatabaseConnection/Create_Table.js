
import { workshop_data_load } from "../API_Communication/Load_data";
import * as SQLite from 'expo-sqlite';
const db =  SQLite.openDatabaseAsync('Event.db');

// create event_table
export const  Create_Event_Data_Table=()=>{
    db.transaction(tx=>{
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS event_table (id TEXT PRIMARY KEY ,title TEXT,description TEXT,host TEXT,date TEXT,venu TEXT,img TEXT);',
            [],
            ()=>console.log('Event table created'),
            error => console.error('Error event :',error)
        );
    });
}

// create workshops table
export const Create_Workshops_Table=()=>{
    db.transaction(tx=>{
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS workshop_table (id TEXT PRIMARY KEY ,title TEXT,description TEXT,venu TEXT,date TEXT,event TEXT,icon LONGTEXT);',
            [],
            ()=>console.log('Workshop table created'),
            error => console.error('Error workshop',error)
        );
    });
}


// create user table dynamicaly
export const Create_user_table=async()=>{
    const workshopData = await workshop_data_load();
    const workshoplist = await workshopData.map(item => item.title);
    console.log("workshopname******",workshoplist)
   await db.transaction(tx=>{
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS user_table(id TEXT PRIMARY KEY , name TEXT,mobile TEXT ,groupid TEXT , email TEXT,Time TEXT, ${workshoplist.map((workshop,index)=>`${workshop} TEXT`)})`,
            [],
            ()=>console.log("created user table****************************** "),
            (error)=> console.log("errorin creating usertable",error),
        );
    });
}

// create user table dynamicaly
// export const Create_user_table=async()=>{
//     const workshopData = await workshop_data_load();
//     const workshoplist = await workshopData.map(item => item.title);
//     console.log("workshopname******",workshoplist)
//    await db.transaction(tx=>{
//         tx.executeSql(
//             `CREATE TABLE IF NOT EXISTS user_table(id TEXT PRIMARY KEY , name TEXT,mobile TEXT ,groupid TEXT , email TEXT,Time TEXT,   ibm TEXT, google TEXT,github TEXT,dgshd TEXT,dgfgfhv TEXT,worksho12 TEXT,dbfdg TEXT,sdsd TEXT,dfdsfd TEXT)`,
//             [],
//             ()=>console.log("created user table****************************** "),
//             (error)=> console.log("errorin creating usertable",error),
//         );
//     });
// }
// export const Create_user_table = async () => {
//     const workshopData = await workshop_data_load();
//     const workshoplist = await workshopData.map(item => item.title);
//     console.log("workshopname******", workshoplist);

//     await db.transaction(tx => {
//         // const workshopColumns = workshoplist.map(workshop => `${workshop} TEXT`).join(', ');
//         const createTableQuery = `
//             CREATE TABLE IF NOT EXISTS user_table(
//                 id TEXT PRIMARY KEY,
//                 name TEXT,
//                 mobile TEXT,
//                 groupid TEXT,
//                 email TEXT,
//                 Time TEXT,
//                 oracle TEXT,
                // ibm TEXT,
                // google TEXT,
                // github TEXT,
                // dgshd TEXT,
                // dgfgfhv TEXT,
                // worksho12 TEXT,
                // dbfdg TEXT,
                // sdsd TEXT,
                // dfdsfd TEXT,
                // github TEXT

//             )
//         `;

//         tx.executeSql(
//             createTableQuery,
//             [],
//             () => console.log("created user table****************************** "),
//             (error) => console.log("error in creating user table", error),
//         );
//     });
// };



// list the tables in the db
export const tableList=()=>{
  db.transaction(tx=>{
    tx.executeSql(
        'SELECT name FROM sqlite_master WHERE type=?;',
        ['table'],
        (_,{rows})=>{
            const data = rows._array;
            console.log(data);
        }
    )
  })
}



// offline verification table

export const create_Offline_table=()=>{
    db.transaction(tx=>{
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS offline_table(id TEXT,workshopName TEXT);',
            [],
            ()=>console.log("offline_table created"),
            (error)=>console.log(error),

        );
    });
}

// creating table for storing groups
export const create__group_table=()=>{
    db.transaction((tx)=>{
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS group_table (id TEXT PRIMARY KEY , name TEXT);',
            [],
            ()=>console.log('group table created'),
            (error)=> console.log("Error in creating group",error),
        );
    });
}