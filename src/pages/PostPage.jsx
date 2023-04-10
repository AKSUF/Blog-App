import { useEffect, useState } from "react"
import { useParams,Link} from "react-router-dom"
import { toast } from "react-toastify"
import { Container, Row,Col, Card, CardBody,CardText,Input,Button} from "reactstrap"
import Base from "../components/Base"
import { createComment, loadPost } from "../services/post-service"
import { BASE_URL } from "../services/helper"
import { isLoggedIn } from "../auth"
const PostPage=()=>{

const{postId}=useParams()
const[post,setPost]=useState(null)
const[comment,setComment]=useState({
    content:''
})
useEffect(()=>{
    // load post of post Id
loadPost(postId).then(data=>{
    console.log(data);
    setPost(data)
}).catch(error=>{
    console.log(error)
   toast.error("error in loadingpage")
})



},[])



const printDate=(numbers)=>{
    return new Date(numbers).toLocaleString()
}

const submitPost=()=>{
if(!isLoggedIn()){
    toast.error("You need to login first")
    return
}

    if(comment.content.trim()===''){
        return
    }
    createComment(comment,post.postId).then(data=>{

console.log(data)

toast.success("Comment is sumitted succesfully")
setPost({
    ...post,
  comments:[...post.comments,data.data]
})


    }).catch(error=>{
      
        console.log(error)
        toast.error("Comment is not submitted")
    })
}


    return(
    <Base>
    <div>
      <Container className="mt-4">

      <Link to="/">
Home
</Link>
<Row>
<Col md={{size:12}}>


<Card className="mt-3 ps-2">
    <CardBody>
        <CardText>
     {
       (post)&&(
<CardBody>
<CardText>
<span className="text-muted">
{post.category.categoryTitle}
</span>
</CardText>

<h6>
Posted By{post.user.name} on <span>{printDate(post.addedDate)}</span>
</h6>
<h2>
        {post.title}
    </h2>

    {/* <div className="image-containe mt-3 container text-center" style={{maxwidth:'50%'}}>
    <img className="img-fluid" src={BASE_URL+`/post/image`+post.imageName} alt="Imagefgdf"/>

</div> */}
<div className="image-container  mt-4 shadow  " style={{ maxWidth: '50%' }}>
                                            <img className="img-fluid" src={BASE_URL + '/post/image/' + post.imageName} alt="" />
                                        </div>




<CardText dangerouslySetInnerHTML={{__html:post.content.substring(0,30)}}>
                 
                 </CardText>





</CardBody>



       ) 
     }
        </CardText>





    </CardBody>
</Card>

</Col>

</Row>

<Row>

<Col md={{size:8,offset:2}}>

<h3>
    Comments({post?post.comments.length:0})
{
    post && post.comments.map((c,index)=>(
<Card className="mt-2" key={index}>
    <CardBody>
        <CardText>
{c.content}
        </CardText>
    </CardBody>
</Card>
    )
    )
   
}
<Card className="mt-2 shadow">
    <CardBody>
<Input value={comment.content} type="textarea" placeholder="Enter comment here" onChange={(event)=>setComment({content:event.target.value})}>


</Input>
<Button onClick={submitPost} className="mt-2" color="primary">Submit</Button>
    </CardBody>
</Card>

</h3>

</Col>
</Row>


      </Container>
    </div>
    </Base>
    
    
    )
}
export default PostPage