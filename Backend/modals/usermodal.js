import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

let userschema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type:String,  
      required: true,
    },
  },
  { timestamps: true }
);
userschema.pre('save',async function(next){
    
    this.password = await bcrypt.hash(this.password,10)
    next()
})
userschema.methods.isPasswordcorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}


const User = mongoose.model("User",userschema)
export {User}