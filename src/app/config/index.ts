import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,

  bcrypt_salt_round: process.env.bycrypt_salt_rounds,
  default_admin_pass: process.env.default_admin_pass,
  default_manager_pass: process.env.default_manager_pass,

  jwt_access_token: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_token: process.env.JWT_REFRESH_SECRET,
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,

  reset_pass_ui_link: process.env.RESET_PASS_UI_LINK,
};
