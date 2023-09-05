import express from 'express'
const router = express.Router();
import { protect } from '../middleware/adminAuthMiddleware.js';


import {
    authAdmin,
    logoutAdmin,
    getAllUser,
    updateUserData,
    deleteUser
}from '../controllers/adminController.js'


router.post('/auth',authAdmin)
router.post('/logout',logoutAdmin)
router.post('/get-user',getAllUser)
router.put('/update-user',updateUserData)
router.delete('/delete-user',deleteUser)





 export default router