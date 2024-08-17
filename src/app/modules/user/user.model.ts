import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';
import { TUser } from './user.interface';
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
    passwordChangeAt:{
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
 givenPassword:string,
 savedPassword:string,
):Promise<boolean>{
 return await bcrypt.compare(givenPassword,savedPassword);
};


userSchema.methods.changedPasswordAfterJwtIssed = function(
 jwtTimestamp:number
){
 console.log({jwtTimestamp},"HELLO");
 
}

userSchema.pre('save', async function(next){
 const user = this;
 user.password = await bcrypt.hash(
     user.password,
     Number(config.bycrypt_salt_rounds)
 );
 if(!user.needsPasswordChange){
     user.passwordChangeAt = new Date();
 }
 next();
})


export const User = model<TUser>('User', userSchema);
