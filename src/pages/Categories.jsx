import React, { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Base from '../components/Base'
import { Col, Container, Row} from "reactstrap";
import CategorySideMenu from '../components/CategorySideMenu';
import { loadPostCatagoryWise } from '../services/post-service';
import Post from '../components/Post';
function Categories() {

const[posts,setPosts]=useState([])

    const {categoryId}=useParams()

    useEffect(()=>{
        console.log(categoryId);
        loadPostCatagoryWise(categoryId).then(data=>{
setPosts([...data])
        }).catch(error=>{
            console.log(error)
            toast.error("error is loading post")
        })
        toast.success("Category is found")
    },[categoryId])
    return (
        <Base>
 
 <Container>  
      <Row>
      <Col md={{size:2}} className="pt-5">
       <CategorySideMenu/>
        </Col>
        <Col md={{size:10}}>
            <h1>Blog Count({posts.length})</h1>
       {
        posts && posts.map((post,index)=>{
return(


    <Post key={index} post={post} />
)

 

        })
       }

{posts.length <= 0 ? <h1>No post in this category</h1> : ''}
        </Col>
      </Row>
      </Container>
        </Base>
    )
}

export default Categories
