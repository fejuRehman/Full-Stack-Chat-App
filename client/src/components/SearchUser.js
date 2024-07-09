import React, { useCallback, useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import Loading from './Loading';
import UserSearchCard from './UserSearchCard';
import {toast} from 'react-toastify'
import axios from 'axios'
import { IoCloseSharp } from "react-icons/io5";
const SearchUser = ({onClose}) => {

  const [searchUser,setSearchUser]=useState([])
  const [loading,setLoading]=useState(false)
  const [search,setSearch]=useState("")

  const handleSearchUser = useCallback(async () => {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/search-user`;
    try {
      setLoading(true);
      const response = await axios.post(URL, {
        search: search
      });
      setLoading(false);
      setSearchUser(response.data.data);
    } catch (err) {
      toast.error(err?.response?.data?.message);
      setLoading(false); // Make sure to set loading to false in case of an error
    }
  }, [search]);

  useEffect(() => {
    handleSearchUser();
  }, [handleSearchUser]);

  console.log("seachUser",searchUser)

  return (

    <div className='fixed top-0 bottom-0 left-0 right-0 bg-slate-700 bg-opacity-40 p-2 z-10'>
        <div className='w-full max-w-lg mx-auto mt-10'>

            {/* input search user  */}
            <div className='bg-white h-14 rounded overflow-hidden flex '>
                  <input
                   type='text'
                   placeholder='Search user by name,email....'
                   className='w-full outline-none py-1 px-4 h-full'
                   value={search}
                   onChange={(e)=>setSearch(e.target.value)}
                  />

                  <div className='h-14 w-14 flex justify-center items-center cursor-pointer'>
                     <IoSearch size={25} />
                  </div>
            </div>

            {/* display search user  */}
            <div className='bg-white mt-2  w-full p-4 rounded'>
                  {/* no user found  */}
                  {
                     searchUser.length===0 && !loading && (
                         <p className='text-center text-slate-500'> No user found</p>
                     )
                  }

                  {
                     loading && (
                         <p><Loading/></p>
                     )
                  }

                  {
                      searchUser.length !==0 && !loading && (
                         searchUser.map((user,index)=>{
                              return (
                                 <UserSearchCard key={user._id} user={user} onClose={onClose} />
                              )
                         })
                      )
                  }

            </div>
        </div>

        <div className='absolute top-0 right-0 text-2xl p-2 lg:text-4xl hover:text-white' onClick={onClose}>
             <button>              
              <IoCloseSharp size={25} />
             </button>
        </div>
    </div>
  )
}

export default SearchUser