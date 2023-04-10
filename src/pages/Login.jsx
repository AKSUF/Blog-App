import { CardHeader, Col, Container,Row, Card, CardBody, Form, FormGroup, Label, Input, Button } from "reactstrap";
import Base from "../components/Base";
import { useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../services/user-service";
import { doLogin } from "../auth";
import { useNavigate } from "react-router-dom";
import userContext from "../context/useContext";
import user from "../context/useContext";
const Login = () =>{
    const navigate = useNavigate();

    const [loginDetails, setLoginDetails] = useState({
        username:'',
        password:''
    })

    const handleChange = (event, field)=>{
        let actualValue = event.target.value;
        setLoginDetails({
            ...loginDetails,[field]:actualValue
        })
    }

    const handleFormSubmit =(event)=>{
        event.preventDefault();
        console.log(loginDetails);
        //Validation
        if(loginDetails.username.trim()===''){
            toast.error("User Name is required")
        }else if(loginDetails.password.trim()===''){
            toast.error("Password is required")
        }

        // submit the data to server to generate token
        loginUser(loginDetails).then((data)=>{
            console.log(data);

            // save the data to localStorage
            doLogin(data,()=>{
                console.log("Login details is saved to localStorage");
                // redirect to user dashboard page

                navigate("/user/dashboard")

            })

            toast.success("Login sucess")
        }).catch(error=>{
            console.log(error);
            if(error.response.status===401 || error.response.status===404){
                toast.error(error.response.data.message)
            }else{ 
                 toast.error("Something went wrong on server")
                }
          
        })
    }
    return(
       <Base>
        <Container>
            <Row className="mt-5">
                <Col sm = {{size:6, offset:3}}>
                <Card>
                    <CardHeader>
                        <h3>Login Here</h3>
                    </CardHeader>
                    <CardBody>

                        <Form onSubmit={handleFormSubmit}>
                            {/* Email field */}
                            <FormGroup>
                                <Label for="email" placeholder="Enter Email" ></Label>
                                <Input type="email"
                                value={loginDetails.username}
                                onChange={(e)=> handleChange(e, 'username')}

                                 id="email"/>
                            </FormGroup>
                            {/* Password field */}
                            <FormGroup>
                                <Label for="password" placeholder="Enter Password" ></Label>
                                <Input type="password"
                                 value={loginDetails.password}
                                 onChange={(e)=> handleChange(e, 'password')}
                                id="password"/>
                            </FormGroup>
                            <Container className="text-center">
                                <Button color="secondary">Login</Button>
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
export default Login;