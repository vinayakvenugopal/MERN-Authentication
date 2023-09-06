import { useState,useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import {useDispatch,useSelector} from 'react-redux'
import { FormContainer } from "../../components/FormContainer";
import { useAdminLoginMutation } from "../../slices/adminApiSlice";
import { setCredentials } from "../../slices/adminAuthSlice";
import {toast} from 'react-toastify'



export const AdminLoginScreen = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useAdminLoginMutation();

  const { adminInfo } = useSelector( (state) => state.adminAuth );

  // useEffect( () => {

  //   if(adminInfo) {

  //     navigate('/admin/get-user');

  //   }

  // }, [] );

  const submitHandler = async (e) => {

    e.preventDefault();

    try {
      
      const responseFromApiCall = await login( { email, password } ).unwrap();

      dispatch( setCredentials( { ...responseFromApiCall } ) );
      
      navigate('/admin/get-user');

    }catch(err){

      toast.error( err?.data?.message || err?.error );

    }

  };

  return (
    <FormContainer>
      <h1>Admin Sign In</h1>

      <Form onSubmit={submitHandler}>
            <Form.Group className="my-2" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" className="mt-3"> Sign In </Button>
      </Form>

      {/* { isLoading && <> <Loader/> </>} */}
      
    </FormContainer>
  );
};

export default AdminLoginScreen;