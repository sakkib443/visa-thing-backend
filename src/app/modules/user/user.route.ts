
import  express from 'express';
import { UserControler } from './user.controller';




const router = express.Router();

router.post('/create-admin',UserControler.createAdmin)



export const UserRoutes = router;