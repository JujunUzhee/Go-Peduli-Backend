import mysql from 'mysql2/promise'
import 'dotenv/config'

const db = mysql.createPool({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE,
    port : process.env.PORT
})

const testConnection=async()=>{
    try{
        await db.getConnection()
        console.log("Database Connected");
    }catch(e){
        console.log("GAGAL")
    }
}

const query = async (query, value) => {
    try {
        const [result] = await db.query(query, value ?? []);
        return result;
    } catch (error) {
        console.error("Query Error:", error);
        throw error; 
    }
};


export {testConnection,query}