import React, { useEffect, useState } from 'react'
import Base from '../components/Base';
import AddPost from '../components/AddPost';
import { Container } from 'reactstrap';
import { getCurrentUserDetails } from '../auth';
import { loadPostUserWise,deletePostService } from '../services/post-service';
import { getSpaceUntilMaxLength } from '@testing-library/user-event/dist/utils';
import { toast } from 'react-toastify';
import Post from '../components/Post';

const UserDashboard = () => {





  
const[user,setUser]=useState({})
const[posts,setPosts]=useState([])

useEffect(()=>{

  console.log(getCurrentUserDetails());
setUser(getCurrentUserDetails())
loadPostData()

},[])

function loadPostData(){
  loadPostUserWise(getCurrentUserDetails().id).then(data=>{
    console.log(data);
    setPosts([...data])
    
     }).catch(error=>{
      console.log(error)
      toast.error("error in loadin page")
     })
}






  return (
   <>
   <Base>
   
   <Container>
   <AddPost />

   </Container>
   </Base>
   </>
  )
}

export default UserDashboard;
