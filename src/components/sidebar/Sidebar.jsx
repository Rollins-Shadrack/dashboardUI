import React,{useContext, useEffect, useState} from 'react'
import './sidebar.scss'
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DarkModeContext } from '../../context/darkModeContext';
import MenuIcon from '@mui/icons-material/Menu';
import SubtitlesRoundedIcon from '@mui/icons-material/SubtitlesRounded';
import PermPhoneMsgRoundedIcon from '@mui/icons-material/PermPhoneMsgRounded';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import CalculateRoundedIcon from '@mui/icons-material/CalculateRounded';
import { useMediaQuery } from '@mui/material';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import WarehouseRoundedIcon from '@mui/icons-material/WarehouseRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import {useDispatch, useSelector} from 'react-redux'
import { useLogoutMutation } from '../../state/usersApiSlice';
import { logout } from '../../state/authSlice';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import AirIcon from '@mui/icons-material/Air';



const Sidebar = () => {
    const [showText, setShowText] = useState(true);
    const { dispatch } = useContext(DarkModeContext);
    const [showMenu, setShowMenu] = useState(false);
    const [showMenu2, setShowMenu2] = useState(false);
    const location = useLocation();
    const {userInfo} = useSelector(state => state.auth)
  const isStatsPage = location.pathname === '/stats';

  const isMediumScreen = useMediaQuery('(min-width: 576px) and (max-width: 991.98px)');
  const isSmallScreen = useMediaQuery('(max-width: 575.98px)');
    const shouldHideDiv = isSmallScreen || isMediumScreen;

  const toggleText = () => {
    setShowText((prevShowText) => !prevShowText);
  };
  const ToggleMenu = () =>{
    setShowMenu(!showMenu)
  }
  const ToggleMenu2 = () =>{
    setShowMenu2(!showMenu2)
  }
  
  
  useEffect(() => {
    if (isMediumScreen || isSmallScreen) {
      setShowText(false);
    } else {
      setShowText(true);
    }
  }, [isMediumScreen, isSmallScreen]);

  const LogOutdispatch = useDispatch()
  const navigate = useNavigate()

  const [logoutApiCall] = useLogoutMutation()

  const logoutHandler = async()=>{
    try{

        await logoutApiCall().unwrap()
        LogOutdispatch(logout())
        navigate('/')

    }catch(error){
    console.log(error)
    }
  }
  return (
    <div className={`sidebar ${!showText ? 'small' : ''}`}>
        <div className="top">
        {showText && <Link to='/dashboard' style={{textDecoration:"none", margin:"10px"}}>
            <span className="logo">GlobeFlight</span>
            </Link>}
            <MenuIcon style={{color:'#6439ff'}} onClick={toggleText} />
        </div>
        <hr />
        <div className="center">
            <ul>
                <li>
                    <Link to='/dashboard' style={{textDecoration:"none"}}>
                    <DashboardIcon className="icon" />
                    {showText && <span>Dashboard</span>}
                    </Link>
                </li>
                <li>
                <div onClick={ToggleMenu} style={{ cursor: 'pointer' }}>
                    <SubtitlesRoundedIcon className="icon" />
                    {showText &&<span>Departments</span>}
                    {showMenu ? <ArrowDropUpRoundedIcon style={{color:'#7451f8', fontSize:'35px'}}/> : <ArrowDropDownRoundedIcon style={{color:'#7451f8', fontSize:'35px'}}/>}
                </div>
                {showMenu && (
                    <ul className='dropDown'>
                    <li>
                        <Link to='/sales' style={{ textDecoration: 'none' }}>
                            <OnlinePredictionIcon className='icon'/>
                        <span>Sales</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/customer-care' style={{ textDecoration: 'none' }}>
                            <PermPhoneMsgRoundedIcon className='icon'/> &nbsp;
                            <span>Customer&nbsp;Service</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/operations' style={{ textDecoration: 'none' }}>
                            <InsightsRoundedIcon className='icon'/>
                        <span>Operations</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/finance' style={{ textDecoration: 'none' }}>
                            <CalculateRoundedIcon className='icon'/>
                        <span>Finance</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/warehouse' style={{ textDecoration: 'none' }}>
                            <WarehouseRoundedIcon className='icon'/>
                        <span>WareHouse</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/management' style={{ textDecoration: 'none' }}>
                            <ManageAccountsIcon className='icon'/>
                        <span>Management</span>
                        </Link>
                    </li>
                    </ul>
                )}
                </li>
                <li>
                <Link to='/sales/dump'  style={{textDecoration:"none"}}>
                    <WarehouseRoundedIcon className="icon"/> 
                    {showText &&<span>New Dump</span>}
                    </Link> 
                </li>
                <li>
                <Link to='/users' style={{textDecoration:"none"}}>
                    <PersonOutlineIcon className="icon" />
                    {showText &&<span>Users</span>}
                </Link>
                </li>
                <li>
                    <Link to='/sales/orders/list' style={{ textDecoration: 'none' }}>
                        <StoreIcon className='icon'/>
                        {showText &&<span>Orders</span>}
                    </Link>
                </li>
                <li>
                    <Link to='/sales/orders/dump' style={{ textDecoration: 'none' }}>
                        <StoreIcon className='icon'/>
                        {showText &&<span>Dumps</span>}
                    </Link>
                </li>
                <li>
                <Link to='/delivery' style={{ textDecoration: 'none' }}>
                    <LocalShippingIcon className="icon" />
                    {showText &&<span>Delivery</span>}
                    </Link>
                </li>
                <p className="title">USEFUL</p>
                {(userInfo.department === 'Finance' || userInfo.department === 'Management') && <li>
                <Link to='/stats' style={{textDecoration:"none"}}>
                    <InsertChartIcon className="icon" />
                    {showText &&<span>Stats</span>}
                    </Link>
                </li>}
                <li>
                <Link to='/chat' style={{textDecoration:"none"}}>
                    <MessageRoundedIcon className="icon" />
                    {showText &&<span>Chat</span>}
                    </Link>
                </li>
                <li>
                <Link to='/calender' style={{textDecoration:"none"}}>
                    <EditCalendarIcon className="icon" />
                    {showText &&<span>Calender</span>}
                    </Link>
                </li>
                {/* <li>
                    <NotificationsNoneIcon className="icon" />
                    {showText &&<span>Notifications</span>}
                </li> */}
                <li>
                    {isStatsPage && (<>
                        <Link to='/predictions' style={{textDecoration:"none"}}>
                    <OnlinePredictionIcon className="icon"/>
                    {showText &&<span>Predictions</span>}
                    </Link>
                    </>)}
                </li>
                {/* <p className="title">SERVICE</p>
                <li>
                    <SettingsSystemDaydreamOutlinedIcon className="icon" />
                    {showText &&<span>System Health</span>}
                </li>
                <li>
                    <PsychologyOutlinedIcon className="icon" />
                    {showText &&<span>Logs</span>}
                </li>
                <li>
                    <SettingsApplicationsIcon className="icon" />
                    {showText &&<span>Settings</span>}
                </li> */}
                <p className="title">USER</p>
                <li>
                    <Link to='/profile' style={{textDecoration:"none"}}>
                    <AccountCircleOutlinedIcon className="icon" />
                    {showText &&<span>Profile</span>}
                    </Link>
                </li>
                <li>
                    <Link to='/management/leave' style={{textDecoration:"none"}}>
                        <AirIcon className="icon"/>
                        {showText &&<span>Leave</span>}
                    </Link>
                </li>
                <li onClick={logoutHandler}>
                    <ExitToAppIcon className="icon" />
                    {showText &&<span>LogOut</span>}
                </li>
            </ul>
        </div>
        <div className="bottom">
            <div className="colorOptions" onClick={()=> dispatch({type:'LIGHT'})}></div>
            <div className="colorOptions " onClick={()=> dispatch({type:'DARK'})}></div>
        </div>
    </div>
  )
}

export default Sidebar