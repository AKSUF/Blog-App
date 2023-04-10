import React, { useState } from 'react'
import { Button, Card, CardBody, Container, Form, Input, Label } from 'reactstrap'
import { loadAllCategories } from '../services/category-service'
import { useEffect } from 'react'
import JoditEditor from 'jodit-react';
import { useRef } from 'react';
import { createPosts, uploadimage, uploadPostImage } from '../services/post-service';
import { getCurrentUserDetails } from '../auth';
import { toast } from 'react-toastify';

 const AddPost = () => {

  const editor = useRef(null)
  // const [content, setContent] = useState('')
  const [category, setCategory]=useState([])
  const [user, setUser] = useState(undefined)

  const [post, setPost] = useState({
    title:'',
    content:'',
    categoryId:''
  })
const [image,setImage]=useState(null)

  // const config ={
  //   placeholder:"Start Typing..."
  // }

useEffect(() => {
  setUser(getCurrentUserDetails())
  loadAllCategories().then((data)=>{
    console.log(data);
    setCategory(data)
  }).catch(error=>{
    console.log(error);
  })
}, [])

// field Changed function
const fieldChanged =(event)=>{
  setPost({...post,[event.target.name]:event.target.value})
}
const contentFieldChanged =(data)=>{
  setPost({...post,'content':data})
}

// create Post function
const createPost=(event)=>{
  event.preventDefault();
  // console.log(post);
  if(post.title.trim()===''){
    toast.error("Title is Required")
    return
  }
  if(post.content.trim()===''){
    toast.error("Content is Required")
    return
  }

  if(post.categoryId.trim()===''){
    toast.error("Select some Category is Required")
    return
  }





  // submit the form on surver
  post['userId'] = user.id
  createPosts(post).then(data => {

   uploadPostImage(image,data.postId).then(data=>{
    toast.success("Image Uploaded !!")

}).catch(error=>{
  console.log(error)
  toast.error("Image is not uploaded")
})


   toast.success("Post Created")
     console.log(post);
  }).catch((error)=>{
    toast.error("Post not created due to some error !! ")
     console.log(error);
  })
}

//handiling file change image

const handleFileChange=(event)=>{
console.log(event.target.files)
setImage(event.target.files[0])

}



  return (
    <div className='wrapper'>
        <Card className='shadow-lg mt-5'>
          <CardBody>
            {/* {JSON.stringify(post)} */}
            <h3>What's going on your mind</h3>
            <Form onSubmit={createPost}>
              <div className=' my-3'>
                <Label for='title'>Post Title:</Label>
                <Input type='text'
                 id='title'
                 name='title'
                 placeholder='Enter here'
                 className='rounded-0'
                 onChange={fieldChanged}/>
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
                //  config={config}
                 onChange={contentFieldChanged} />
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
                 placeholder='Enter here'
                 className='rounded-0'
                 onChange={fieldChanged}
                 defaultValue={0}>
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
                <Button type='submit' color='primary'>Create Post</Button>
              </Container>
            </Form>
          </CardBody>
        </Card>
    </div>
  )
}
export default AddPost




// What is React JS? => React is javaScript Linbrary to manage in front-end-applications JavaScript LibrearyFront-end LibrearyUse for created single pageuse to create very useful applications