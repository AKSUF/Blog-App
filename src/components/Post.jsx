import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardText } from 'reactstrap'
import { getCurrentUserDetails, isLoggedIn } from '../auth'
import userContext from '../context/useContext'

function Post({post={id:-1, title:"This is default post title", content:"This is default post Content"},deletePost}) {
 
  const[user,setUser]=useState(null)
  const[login,setLogin]=useState(null)
  useEffect(()=>{
    setUser(getCurrentUserDetails())
    setLogin(isLoggedIn())
  },[])

  return (
    <div>
        <Card className='shadow mt-3'>
            <CardBody>
                <h1>{post.title}</h1>
                <CardText dangerouslySetInnerHTML={{__html:post.content.substring(0,30)}}>
                 
                </CardText>
                <div>
                  
                    <Link className='btn btn-secondary' to={'/postpage/'+post.postId}>Read More</Link>
{/* {isLoggedIn ? user.id===post.user.user?<Button color='danger' className='ms-2'>Delete</Button>:'':''} */}

{isLoggedIn && (user && user.id===post.user.id?<Button onClick={()=>deletePost(post)} color='danger' className='ms-2'>Delete</Button>:'')}
{isLoggedIn && (user && user.id===post.user.id?<Button tag={Link} to={`user/update-blog/${post.postId}`} color='warning' className='ms-2'>Update</Button>:'')}
                </div>
            </CardBody>
        </Card>
    </div>
  )
}

export default Post