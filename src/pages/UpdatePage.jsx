import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Base from '../components/Base'
import userContext from '../context/useContext'
import { useContext } from 'react'
import { loadPost,updatePost as doUpdatePost } from '../services/post-service'
import { toast } from 'react-toastify'
import { createPosts, uploadimage, uploadPostImage } from '../services/post-service';
import { Button, Card, CardBody, Container, Form, Input, Label } from 'reactstrap'
import { loadAllCategories } from '../services/category-service'
import JoditEditor from 'jodit-react'

import { useRef } from 'react';
function UpdatePage() {

    const editor = useRef(null)
    const {blogId}=useParams()
    const [category, setCategory]=useState([])
    const [image, setImage]=useState([])


const[post,setPost]=useState(null)
useEffect(()=>{

    loadAllCategories().then((data) => {
        console.log(data)
        setCategory(data)
    }).catch(error => {
        console.log(error)
    })




//load the blog from database
loadPost(blogId).then(data=>{
    console.log(data)
    setPost({...data,catagoryId:data.category.catagoryId})
}
    ).catch(error=>{
        console.log(error)
        toast.error("error in loading the blog")
    })


},[])

// useEffect(()=>{
//     loadAllCategories().then((data)=>{
//         console.log(data);
//         setCategory(data)
//       }).catch(error=>{
//         console.log(error);
//       })

// },[])



const handleChange=(event,fieldName)=>{

    setPost({
        ...post,
        [fieldName]:event.target.value
    })
}





    const updatePost=(event)=>{
       // event.preventDefault()
        console.log(post)
        doUpdatePost({...post,category:{categoryId:post.catagoryId}},post.postId).then(res=>{
            uploadPostImage(image,res.postId).then(data=>{
                toast.success("Image Uploaded !!")
            console.log(data)
            }).catch(error=>{
              console.log(error)
              toast.error("Image is not uploaded")
            })

            console.log(res)
            toast.success("Post Updated")
        }).catch(error=>{
            console.log(error)
            toast.error("Post is not updated")
        })
    }



    const handleFileChange=(event)=>{
        console.log(event.target.files)
        setImage(event.target.files[0])
        
        }

        const updateHtml=()=>{
return(
    <>
    <div className='wrapper'>
       
    <Card className='shadow-lg mt-5'>
      <CardBody>
      
        <h3>What's going on your mind</h3>
        <Form onSubmit={updatePost}>
          <div className=' my-3'>
            <Label for='title'>Post Title:</Label>
            <Input type='text'
             id='title'
             name='title'
             value={post.title}
             placeholder='Enter here'
             className='rounded-0'
             onChange={(event)=>handleChange(event,'title')}/>
          </div>

          <div className=' my-3'>
            <Label for='context'>Post Context:</Label>
            {/* <Input type='textarea'
             id='context'
             name='context'
             placeholder='Enter here'
             className='rounded-0'
             style={{height:'200px'}}/> */}

             <JoditEditor ref={editor}
             value={post.content}
            //  <JoditEditor ref={editor}
            //  value={post.content}
            // //  config={config}
            //  onChange={contentFieldChanged} />
            onChange={newContent=>setPost({...post,content:newContent})}/>
          </div>
{/* //file upload or image */}

<div className="mt-3">
<Label for="image">Upload Image</Label>


<Input id="image" type="file" multiple onChange={handleFileChange}/>


</div>




          <div className=' my-3'>
            <Label for='category'>Post Category:</Label>
            <Input type='select'
             id='category'
             name='categoryId'
            //  value={post.category.categoryId}
             placeholder='Enter here'
             className='rounded-0'
             onChange={(event)=>handleChange(event,'categoryId')}
            //  onChange={fieldChanged}
      value={post.catagoryId}
             >
              <option disabled value={0}>-- Select Category</option>
           {
            category.map((category)=>(
              <option value={category.categoryId} key={category.categoryId}>
                {category.categoryTitle}
              </option>
            ))
           }
             </Input>
             
          </div>
          <Container className='text-center'>
            <Button type='submit' color='primary'>Update Post</Button>
          </Container>
        </Form>
      </CardBody>
    </Card>
</div>


<div>
 
    </div>


</>


)


    
}
    return (
      <Base>

<Container>
{post && updateHtml()}
</Container>

      </Base>
    )
}

export default UpdatePage
