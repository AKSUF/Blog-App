import userContext from "../context/useContext";
import Base from "../components/Base";
import NewFeed from "../components/NewFeed";
const About = () => {
    return (
        
      <userContext.Consumer>


{
    (user)=>(

<Base >
        <h1> This is About Components </h1>
         <p> We are Buildin </p>
         <p> We are Buildin </p>

<h1>Welcome user:{user.name}</h1>
<NewFeed/>

         </Base>

    )
}

      </userContext.Consumer>



      
    )
}
export default About;