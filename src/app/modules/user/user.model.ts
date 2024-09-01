import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interfase";
import config from "../../config";
import { user_role } from "./user.Constent";
import bcryptjs from "bcryptjs";

const UserSchema = new Schema<TUser, UserModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true, enum: Object.keys(user_role) },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    confirmPassword: {
      type: String,
      required: true,
      select: 0,
    },
    phone: { type: String },
    address: { type: String },
    termsAccepted: { type: Boolean },
  },
  { timestamps: true }
);

// hash password
UserSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcryptjs.hash(
    user.password,
    Number(config.bcrypt_salt_round)
  );
  next();
});
UserSchema.post("save", async function (doc, next) {
  doc.password = "";
  next();
});

UserSchema.statics.isUserExistsByCustomId = async function (email: string) {
  return await User.findOne({ email }).select("+password");
};
UserSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  heshTextPassword
) {
  return await bcryptjs.compare(plainTextPassword, heshTextPassword);
};
// Create and export the User model
// Create and export the User model
export const User = model<TUser, UserModel>("User", UserSchema);
