import { useState, useEffect } from 'react';
import './login.scss'
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import {Button,Col, Form} from 'react-bootstrap'
import { useLoginMutation } from '../../state/usersApiSlice';
import { setCredentials } from '../../state/authSlice';
import {toast} from 'react-toastify'
import Loader from '../../components/Loader';
import TypingText from '../../components/TypingText';
import logo from '../../static/globeflight.png'

const Login = () => {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [text, setText] = useState(["Explore our dashboard and find revenue, profit, expenses.",
  "Empower your business decisions with valuable insights.",
  "Unlock data, spot trends, optimize strategies for success."]);

  const navigate = useNavigate()
  const dispatch = useDispatch();


  const [login, {isLoading}] = useLoginMutation()

  const {userInfo} = useSelector(state => state.auth);

  useEffect(() =>{

    if(userInfo){
      navigate('/dashboard')
    }
  },[navigate, userInfo])

  const handleSubmit = async(event) => {
    event.preventDefault()
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    try{
      const res = await login({email, password}).unwrap()
      dispatch(setCredentials({...res}))
      navigate('/dashboard')
    }catch(err){
      toast.error(err?.data?.message || err?.message)
    }

    setValidated(true);
  };
  return (
    <div className='login'>
    <div className="right">
      <div className="text-center">
      <img src={logo} className='img-fluid' style={{width:'200px', height:'150px'}}alt="" />
      </div>
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
    <h1 style={{fontSize:'23px', marginTop:'20px'}}>Employee Dashboard</h1>
    <h1 className="text-center">Sign In</h1>
      <Form.Group  controlId='validationCustom01'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control required type='email' className='input' placeholder='Email Address' value={email}
            onChange={(e) => setEmail(e.target.value)}/>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>
      <Form.Group  controlId="validationCustom02">
          <Form.Label>Password </Form.Label>
          <Form.Control required className='input' type="password"placeholder="Password"value={password}
            onChange={(e) => setPassword(e.target.value)}/>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>
      {isLoading && <Loader/>}
  <Button variant='info'  type="submit">{isLoading ?  <Loader/> : 'Sign In'}</Button>
  </Form>
  <TypingText className="typetext" texts={text}/>
    </div>
  </div>
  )
}

export default Login