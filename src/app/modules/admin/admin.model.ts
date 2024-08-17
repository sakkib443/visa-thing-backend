import { model, Schema } from 'mongoose';
import { AdminModel, IAdmin } from './admin.interface';



const AdminSchema = new Schema<IAdmin>({

    id:{
        type:String,
        required:true,
    },
     mobileNo:{
      type:String,
      required:true,
      unique:true,
    },
    name: {
        type: {
          firstName: {
            type: String,
            required: true,
          },
          lastName: {
            type: String,
            required: true,
          },
        },
        required: true,
      },
      profileImage:{
        type:String,
        required:true,
      },
      email:{
        type:String,
        required:true,
        unique:true,
      },
      address:{
        type:String,
        required:true,
      },
      
},
{
  timestamps:true,
}
);


export const Admin = model<IAdmin, AdminModel>('Admin',AdminSchema);