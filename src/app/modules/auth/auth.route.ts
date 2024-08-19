
import  express  from 'express';

import { AuthControllers } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();




router.post('/login',validateRequest(AuthValidation.loginValidationSchema), AuthControllers.loginUser);

router.post('/change-password',auth(USER_ROLE.superAdmin,USER_ROLE.admin),AuthControllers.changePassword)


router.post('/refresh-token',AuthControllers.refreshToken);

router.post('/forget-password',AuthControllers.forgetPassword);

router.post('/reset-password',AuthControllers.resetPassword);  



export const AuthRoutes= router;