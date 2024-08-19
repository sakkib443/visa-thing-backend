import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';
import { TUser, UserModel } from './user.interface';
const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    mobileNo:{
      type:String,
      required:true,
      unique:true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangedAt:{
      type:Date,
     
  },
  admin:{
    type:Schema.Types.ObjectId,
    ref:"Admin",
  },
  user:{
    type:Schema.Types.ObjectId,
    ref:"User",
  },
    role: {
      type: String,
      enum: ['user', 'admin'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);


userSchema.pre('save', async function(next){
  const user = this;
  user.password = await bcrypt.hash(
      user.password,
      Number(config.bycrypt_salt_rounds)
  );
  if(!user.needsPasswordChange){
      user.passwordChangedAt = new Date();
  }
  next();
 })
 


userSchema.statics.isUserExist = async function (
  id?: string,
  mobileNo?: string
):Promise<TUser|null>{
 return await User.findOne(
     {
         $or:[{id},{mobileNo}]
     },
     {id:1,password:1,role:1,needPasswordChange:1,status:1,isDeleted:1}
 );
};


userSchema.statics.isPasswordMatched =  async function(
  plainTextPassword:string,
  hashedPassword:string,
):Promise<boolean>{
 return await bcrypt.compare(plainTextPassword,hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function(
  passwordChangedTimestamp:Date,
  jwtIssuedTimestamp:number,
){
  const passwordChangedTime = 
  new Date(passwordChangedTimestamp).getTime()/1000;
  return passwordChangedTime > jwtIssuedTimestamp; 
};







export const User = model<TUser,UserModel>('User', userSchema);
