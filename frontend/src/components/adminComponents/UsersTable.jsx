import React, { useState } from 'react'
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import {Button,Modal,Form as BootstrapForm} from 'react-bootstrap'
import { useGetUserDataMutation } from '../../slices/adminApiSlice'
import { useAdminUpdateUserMutation } from '../../slices/adminApiSlice';
import { toast } from "react-toastify";
import { useDeleteUserDataMutation } from '../../slices/adminApiSlice';
const PROFILE_IMAGE_DIR_PATH = 'http://localhost:5000/UserProfileImages/'

export const UsersTable = ({users}) => {
  console.log(users);
      const [searchQuery, setSearchQuery] = useState("");
    const [userIdToUpdate,setUserIdToUpdate] = useState('')
    const [userNameToUpdate,setUserNameToUpdate] = useState('')
    const [userEmailToUpdate,setUserEmailToUpdate] = useState('')
    const [showUpdateModal,setShowUpdateModal] = useState(false)


    const [showRegisterModal,setShowURegisterModal] = useState(true)
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
      };
    
      const filteredUsers = users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const [updateUserByAdmin, { isLoading:isUpdating }] = useAdminUpdateUserMutation();
    const [deleteUserByAdmin ] = useDeleteUserDataMutation();

     

    const handleOpenUpdateModal = (user)=>{

        setUserIdToUpdate(user._id)
        setUserNameToUpdate(user.name);
        setUserEmailToUpdate(user.email);
        setShowUpdateModal(true)
    }

    const handleDelete = async(user)=>{
        try{
        console.log(user._id);
        const responseFromApiCall = await deleteUserByAdmin({
            userId:user._id
        })
        console.log(responseFromApiCall);
        toast.success("User Deleted Succesfully")
    } catch (err) {
        toast.error(err?.data?.message || err?.error);
      }
    }

    const handleUpdate = async () => {
        try {
            console.log(userIdToUpdate);
          const responseFromApiCall = await updateUserByAdmin({
            userId: userIdToUpdate,
            name: userNameToUpdate,
            email: userEmailToUpdate
          });
          toast.success("User Updated Successfully.");
          setUserIdToUpdate(null); // Clear the user ID to update
          setShowUpdateModal(false); // Close the update modal   
    
        } catch (err) {
          toast.error(err?.data?.message || err?.error);
        }
      }
  return (
    <>
     <BootstrapForm>
        <BootstrapForm.Group className="mt-3" controlId="exampleForm.ControlInput1">
          <BootstrapForm.Label>Search users:</BootstrapForm.Label>
          <BootstrapForm.Control
            style={{ width: "500px" }}
            value={searchQuery}
            type="text"
            placeholder="Enter Name or email........"
            onChange={handleSearch}
          />
        </BootstrapForm.Group>
      </BootstrapForm>
    <MDBTable align='middle'>
    <MDBTableHead>
      <tr>
        <th scope='col'>Name</th>
        <th scope='col'>Email</th>
        <th scope='col'>Edit</th>
        <th scope='col'>Delete</th>
      </tr>
    </MDBTableHead>
    <MDBTableBody>
    {filteredUsers.map((item, index) => (
      
      
      <tr key={index}>
        <td>
          <div className='d-flex align-items-center'>
            <img
              src={PROFILE_IMAGE_DIR_PATH+item.profileImageName}
              alt={item.name}
              style={{ width: '45px', height: '45px' }}
              className='rounded-circle'
            />
            <div className='ms-3'>
              <p className='fw-bold mb-1'>{item.name}</p>
            </div>
          </div>
        </td>
        <td>
          <p className='fw-normal mb-1'>{item.email}</p>
          </td>
          <td>
          <Button color='link' size='sm'
             onClick={() => handleOpenUpdateModal(item)}
           >
            Edit
          </Button>
        </td>
        <td>
          <Button color='link'size='sm'
             onClick={() => handleDelete(item)}
           >
            Delete
          </Button>
        </td>
       

      
      </tr>
      ))}
    </MDBTableBody>
  </MDBTable> 

<Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
<Modal.Header closeButton>
  <Modal.Title>Update User</Modal.Title>
</Modal.Header>
<Modal.Body>
  <BootstrapForm>
    <BootstrapForm.Group controlId="name">
      <BootstrapForm.Label>Name</BootstrapForm.Label>
      <BootstrapForm.Control
        type="text"
        value={userNameToUpdate}
        onChange={(e) =>
            setUserNameToUpdate(e.target.value)
        }
      />
    </BootstrapForm.Group>
    <BootstrapForm.Group controlId="email">
      <BootstrapForm.Label>Email</BootstrapForm.Label>
      <BootstrapForm.Control
        type="email"
        value={userEmailToUpdate}
        onChange={(e) =>
            setUserEmailToUpdate(e.target.value)
        }
      />
    </BootstrapForm.Group>
  </BootstrapForm>
</Modal.Body>
<Modal.Footer>
  <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
    Cancel
  </Button>
  <Button variant="primary"
   onClick={handleUpdate} disabled={isUpdating}
   >
    {isUpdating ? "Updating..." : "Update"}
  </Button>
</Modal.Footer>
</Modal>



<Modal show={showRegisterModal} onHide={() => setShowURegisterModal(false)}>
<Modal.Header closeButton>
  <Modal.Title>Register New User</Modal.Title>
</Modal.Header>
<Modal.Body>
  <BootstrapForm>
    <BootstrapForm.Group controlId="name">
      <BootstrapForm.Label>Name</BootstrapForm.Label>
      <BootstrapForm.Control
        type="text"
        value={name}
        onChange={(e) =>
            setName(e.target.value)
        }
      />
    </BootstrapForm.Group>
    <BootstrapForm.Group controlId="email">
      <BootstrapForm.Label>Email</BootstrapForm.Label>
      <BootstrapForm.Control
        type="email"
        value={email}
        onChange={(e) =>
            setEmail(e.target.value)
        }
      />
    </BootstrapForm.Group>

    <BootstrapForm.Group controlId="email">
      <BootstrapForm.Label>Password</BootstrapForm.Label>
      <BootstrapForm.Control
        type="password"
        value={password}
        onChange={(e) =>
            setPassword(e.target.value)
        }
      />
    </BootstrapForm.Group>
  </BootstrapForm>
</Modal.Body>
<Modal.Footer>
  <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
    Cancel
  </Button>
  <Button variant="primary"
   onClick={handleUpdate} disabled={isUpdating}
   >
    {isUpdating ? "Updating..." : "Update"}
  </Button>
</Modal.Footer>
</Modal>

</>
  )
}
