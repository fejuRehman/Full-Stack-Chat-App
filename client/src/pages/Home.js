import React, { useEffect } from 'react'
import { Outlet ,useLocation,useNavigate} from 'react-router-dom'
import axios from 'axios'
import {useDispatch, useSelector} from "react-redux"
import { logout, setOnlineUser, setSocketConnection, setUser } from '../redux/userSlice'
import Sidebar from '../components/Sidebar'
import logo from "../assets/logo.png"
import io from "socket.io-client"

const Home = () => {
  
  const user = useSelector(state => state.user)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const location=useLocation()
  console.log("current user details",user)

  
  const fetchUserDetails=async()=>{
       try{
        const URL = `${process.env.REACT_APP_BACKEND_URL}/api/user-details`

        const responseData=await fetch(URL,{
              method:"GET",
              credentials:true
        })
        // const response=await axios({
        //     url:URL,
        //     withCredentials:true
        // })
        
        const response=await responseData.json();
        console.log("fetch user details: ",response);
        dispatch(setUser(response?.data?.data))

        if(response.data.data.logout){
             dispatch(logout())
             console.log("cannot get user details " ,response?.data?.data)
             navigate('/email')
        } 

       }
       catch(err){
           console.log("error" ,err);
       }
  }

  useEffect(()=>{
     fetchUserDetails()
  },[])

  
  // socket connection 

 useEffect(()=>{
     const socketConnection=io("https://chat-app-y050.onrender.com",{
         auth: {
             token:localStorage.getItem('token')
         }
     })
     
     socketConnection.on('onlineUser',(data)=>{
         console.log(data)
         dispatch(setOnlineUser(data))

     });

     dispatch(setSocketConnection(socketConnection))



     return ()=>{
         
         socketConnection.disconnect()
     }
 })




   const basePath=location.pathname==='/'
  
  return (
    <div className='grid lg:grid-cols-[300px,1fr] h-screen max-h-screen'>
        <section className={`bg-white ${!basePath && "hidden" } lg:block`}>
           <Sidebar/>
        </section>

        {/* message component  */}
        <section className={`${basePath && "hidden"}`}>
             <Outlet/>
        </section>

        <div className={`items-center justify-center flex-col gap-2 hidden ${!basePath ? "hidden" : "lg:flex"}`}>
            <div className=''>
               <img src={logo}
                width={250} 
                alt={logo}
                />
            </div>
            <p className='text-lg mt-3 text-slate-500'>Select user to send message</p>
        </div>

    </div>


  )
}

export default Home