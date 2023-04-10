import React, { useState } from 'react'
import { useEffect } from "react";
import { loadAllPost } from '../services/post-service';
import { Col, Row, Pagination, PaginationItem, PaginationLink, Container } from 'reactstrap';
import Post from './Post';
import { toast } from 'react-toastify';
import InfiniteScroll from 'react-infinite-scroll-component';
import { deletePostService } from '../services/post-service';
function NewFeed() {

   

    const [postContent, setPostContent] = useState({
        content:[],
        totalPages:'',
        totalElements:'',
        pageSize:'',
        lastPage:false,
        pageNumber:''
    })
     
const[currentPage,setCurrenPage]=useState(0)

    useEffect(() => {

changePage(currentPage)






        // load all the posts from server
        // loadAllPost(0,5).then((data)=>{
        //     console.log(data);
        //     setPostContent(data)
        // }).catch(error=>{
        //     console.log(error);
        // })
      
        
      }, [currentPage])

const changePage=(pageNumber=0,pageSize=5)=>{


if(pageNumber>postContent.pageNumber && postContent.lastPage){
   return 
}


if(pageNumber<postContent.pageNumber && postContent.pageNumber===0){
    return 
 }






// if(pageNumber>postContent.pageNumber && postContent.lastPage){
// return
// }

//     if(postContent.lastPage){
//         return
//     }


    loadAllPost(pageNumber,pageSize).then(data=>{

        setPostContent({
            content:[...postContent.content,...data.content],

            totalPages:data.totalPages,
            totalElements:data.totalElements,
            pageSize:data.pageSize,
            lastPage:data.lastPage,
            pageNumber:data.pageNumber




        })
        console.log(data)
        window.scroll(0,0)

    }).catch(error=>{
        console.log(error)
    })

}








const changPageInfinite=()=>{
    console.log("page changed")
    setPostContent(setCurrenPage(currentPage+1))

}



// //fuction to delete

// function deletePost(post){
//     console.log(post)
  
//     deletePostService(post.postId).then(res=>{
//       console.log(res)
//       toast.success("Post deleted successfully")
//    let newPostContent=postContent.content.filter(p=>p.postId!=post.postId)
//       setPostContent({...postContent,content:newPostContent})

//     }).catch(error=>{
//       console.log(error)
//       toast.error("User can not be deleted")
//     })





  return (
    <div>
       <div className="container-fluid">
        <Row>
            <Col md={{size:12}}>
                <h1>Blogs Count ({postContent?.totalElements})</h1>
               {/* {
               postContent.content.map((post)=>(
                <Post post={post} key={post.postId}/>
               ))} */}

<InfiniteScroll dataLength={postContent.content.length} 
next={changPageInfinite} 
hasMore={postContent.lastPage}  
 loader={<h4>Loading...</h4>} 
 endMessage={
    <p style={{ textAlign: 'center' }}>
      <b>Yay! You have seen it all</b>
    </p>
  } >

{
               postContent.content.map((post)=>(
                <Post   post={post} key={post.postId}/>
               ))}
</InfiniteScroll>

{/* <Container className='text-center mt-3'>

    
<Pagination size="lg">
                <PaginationItem onClick={()=>changePage(postContent.pageNumber-1)} disabled={postContent.pageNumber===0}>
                    <PaginationLink previous >
                        Previous
                    </PaginationLink>
                </PaginationItem>

           
                    {
                        [...Array(postContent.totalPages)].map((item, index)=>(
                            <PaginationItem onClick={()=>changePage(index)} active={index===postContent.pageNumber} key={index}>
                                <PaginationLink>

                                    {index+1}
                                </PaginationLink>
                            </PaginationItem>
                        ))
                    }
           

                <PaginationItem onClick={()=>changePage(postContent.pageNumber+1)} disabled={postContent.lastPage}>
                    <PaginationLink next>
                        Next
                    </PaginationLink>
                </PaginationItem>
               </Pagination>
</Container> */}
            
            </Col>

        </Row>
       </div>
    </div>
  )
}


export default NewFeed