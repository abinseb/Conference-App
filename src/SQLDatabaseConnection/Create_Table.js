import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('Event.db');




export const Create_user_table=async()=>{
   db.transaction((tx)=>{
      tx.executeSql(
         'CREATE TABLE IF NOT EXISTS user_table(_id TEXT PRIMARY KEY,name TEXT,mobile TEXT,email TEXT,groupid TEXT,Time TEXT)',
         [],
         ()=>console.log("user table created"),
         (error)=>console.log(error),

      )
   })

}




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
            'CREATE TABLE IF NOT EXISTS offline_table(id TEXT,zone TEXT);',
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