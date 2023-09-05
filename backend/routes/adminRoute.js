import express from 'express'
const router = express.Router();
import { protect } from '../middleware/adminAuthMiddleware.js';


import {
    authAdmin,
}from '../controllers/adminController.js'


router.post('/auth',authAdmin)





 export default router