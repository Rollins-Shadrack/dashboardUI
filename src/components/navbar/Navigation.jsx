import React,{useContext, useEffect, useState} from 'react'
import './navbar.scss'
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from '../../context/darkModeContext';
import { Button, Container, Form, Nav, Navbar} from 'react-bootstrap'
import {useSelector,useDispatch} from 'react-redux' 
import {AppContext} from '../../context/appContext'


const Navigation = () => {
  const { dispatch, darkMode} = useContext(DarkModeContext);
  const {userInfo}  = useSelector(state => state.auth)
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);

  const ToggleNotificationMenu = () =>{
    setShowNotificationMenu(!showNotificationMenu)
  }
  const department = userInfo.department;




  return ( 
    <>
      <Navbar expand="lg" className={darkMode ? "navigation darkmode " : "navigation "} >
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" className='toggleButton' />
        <Navbar.Collapse id="navbarScroll">
        <Form className="d-flex search">
            <Form.Control
              type="search"
              placeholder="Search..."
              className="me-2 input"
              aria-label="Search"
            />
            <Button variant="outline-success"><SearchOutlinedIcon /></Button>
          </Form>
          <Nav
            className="ms-auto my-2 my-lg-0"
          >
            <Nav.Link className='item' href="#action1">
              <LanguageOutlinedIcon className="icon" />
              English
            </Nav.Link>
            <Nav.Link className='item'>
              <DarkModeOutlinedIcon className="icon" onClick={()=> dispatch({type:'TOGGLE'})} />
            </Nav.Link>
            <Nav.Link className='item'>
            <FullscreenExitOutlinedIcon className="icon" />
            </Nav.Link>
            {/* <Nav.Link className='item'>
            <NotificationsNoneOutlinedIcon className="icon" onClick={ToggleNotificationMenu}/>
            <div className="counter"></div>
            </Nav.Link> */}
            <Nav.Link className='item'>
            <ListOutlinedIcon className="icon" />
            </Nav.Link>

            <Nav.Link href="/profile">
              <img
                src={userInfo.image ? `https://globeflightapi.onrender.com/${userInfo.image}` : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'}
                alt=""
                className="avatar"
              />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    {/* {showNotificationMenu &&(
      <ul className="dropDown">
        {userInfo (({_id: date, notificationByDate}, idx) =>(
          <li key={idx}>
            {notificationByDate?.map(({message, time, from}, msgInx) =>(
              <div key={msgInx} style={{marginTop:'5px'}}>
                <p style={{float:'right', fontSize:'10px', marginBottom:"10px", display:'flex', flexDirection:'column'}}><span>{date}</span> <span>{time}</span> </p>
                <p style={{fontSize:'13px'}}>{message}</p>
              </div>
            ))}
          </li>
        ))}
      </ul>
    )} */}
    </>
  )
}

export default Navigation