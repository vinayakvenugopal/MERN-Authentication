import {Navigate,Outlet} from 'react-router-dom'
import { useSelector } from 'react-redux'
import React from 'react'

const AdminPrivateRoute = () => {
const {userInfo} = useSelector((state)=>state.adminAuth)
  return  userInfo?<Outlet/>:<Navigate to='admin/login' replace/>
}

export default AdminPrivateRoute
