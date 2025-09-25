import mongoose , {connect} from "mongoose";
import {DB_name} from "../constant.js";
import dotenv from "dotenv";
dotenv.config();
const ConnectDb = async ()=>{
    try{
        let connection = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_name}`);
        console.log('mongodb connection sucess');
        
    }
    catch(error){
        console.log('error');
        }
}
export default ConnectDb