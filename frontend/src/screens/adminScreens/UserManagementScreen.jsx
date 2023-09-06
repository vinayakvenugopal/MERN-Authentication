import React, { useEffect, useState } from 'react'
import { UsersTable } from '../../components/adminComponents/UsersTable'
import { useGetUserDataMutation } from '../../slices/adminApiSlice'
import { useAdminUpdateUserMutation } from '../../slices/adminApiSlice'

export const UserManagementScreen = () => {
  const [usersData, setUsersData] = useState([])

  const [userDataFromApi, { isLoading }] = useGetUserDataMutation();


  useEffect(() => {
    
    try {

      const fetchData = async () => {



        const responseFromApiCall = await userDataFromApi();

        const usersArray = responseFromApiCall.data;
  
        setUsersData(usersArray);

      };
  
      fetchData();

    } catch (error) {

      toast.error(error);

      console.error("Error fetching users:", error);

    }

  }, []);

  return (
    <>
        <UsersTable users={usersData}/>
    </>
  )
}
