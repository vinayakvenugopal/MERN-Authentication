import asyncHandler from 'express-async-handler'
import Admin from '../models/adminModel'
import generateAdminToken from '../utils/generateAdminToken'


//@desc Auth admin/set token
//route POST /api/admin/auth
//@access Public

const authAdmin = asyncHandler(async(req,res) =>{
    console.log(req.body);
    const {email,password} = req.body
    const admin = await Admin.findOne({email})
    if(admin.password === password){
        generateToken(res,admin._id)
        res.status(201).json({
            _id:admin._id,
            email:admin.email,
        })
    }else{
        res.status(401)
        throw new Error('Invalid Email or Password')
    }

})


export{
    authAdmin
}