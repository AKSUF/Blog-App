    import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from "reactstrap";
    import Base from "../components/Base";
   
import { useState } from "react";
import { useEffect } from "react";
import { signUp } from "../services/user-service";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




    const Signup = () =>{
      const [data, setData] = useState({
        name:'',
        email:'',
        password:'',
        about:''
      })
      const [error, setError] = useState({
        errors:{},
        isError:false
      })

      useEffect(()=>{
        console.log(data);
      },[data])

      // handle Change
      const handleChange=(event,property)=>{
       setData({...data, [property]:event.target.value})
    

      }
        // submit form
        const submitForm = (event)=>{
          event.preventDefault();
          if(error.isError){
            toast.error("Form data is invalid, Correct all details");
            return;
          }
          console.log(data);
  
  
          //data validate
  
          // call server api for sending data
          signUp(data).then((res)=>{
            console.log(res);
            console.log("success log");
            toast.success("User is registerd successfully !!"+res.id)
          }).catch((error)=>{
            console.log(error);
            console.log("Error Log");
            // handle errors in proper way
            setError({
              errors:error,
              isError:true
            })
          });
        }
        return(
          <Base>  
          <Container>
            <Row>
              {JSON.stringify(data)}
              <Col sm={{size:6,offset:3}}>
              <Card className="mt-5 "  color="dark" inverse >
            <CardHeader  color="light" outline>
            <h3> Fil Informatio to register</h3>
            </CardHeader>
            <CardBody >
              <Form onSubmit={submitForm}>
                {/* Name Fleid */}
                <FormGroup>
                  <Label for="name">Enter Name</Label>
                  <Input 
                  onChange={(e)=>handleChange(e,'name')}
                  type="text"
                  id="name"
                  value={data.name}
                  invalid ={ error.errors?.response?.data?.name ? true : false }
                  placeholder="Enter here"/>
                  <FormFeedback>
                    {   error.errors?.response?.data?.name }
                  </FormFeedback>
                </FormGroup>


                {/* Email Fleid */}
                <FormGroup>
                  <Label for="email">Enter Email</Label>
                  <Input type="email" 
                  id="email"
                  onChange={(e)=>handleChange(e,'email')}
                  value={data.email}
                  invalid ={ error.errors?.response?.data?.email ? true : false }
                  placeholder="Enter here"/>
                   <FormFeedback>
                    {   error.errors?.response?.data?.email }
                  </FormFeedback>
                </FormGroup>
                {/* Password Fleid */}
                <FormGroup>
                  <Label for="password">Enter Password</Label>
                  <Input type="password" 
                  id="password"
                  onChange={(e)=>handleChange(e,'password')}
                  value={data.password}
                  invalid ={ error.errors?.response?.data?.password ? true : false }
                  placeholder="Enter Password"/>
                   <FormFeedback>
                    {   error.errors?.response?.data?.password }
                  </FormFeedback>
                </FormGroup>
                <FormGroup>
        <Label for="about">
          About
        </Label>
        <Input
          id="about"
          name="text"
          onChange={(e)=>handleChange(e,'about')}
          value={data.about}
          invalid ={ error.errors?.response?.data?.about ? true : false }
          type="textarea"
        />
         <FormFeedback>
                    {   error.errors?.response?.data?.about }
                  </FormFeedback>
      </FormGroup>
      <Container className="text-center">
        <Button color="primary" >Register</Button>
      </Container>
              </Form>
            </CardBody>
          </Card>
              </Col>
            </Row>

          </Container>
          </Base>
        )
    }
    export default Signup;