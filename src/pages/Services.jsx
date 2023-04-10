import Base from "../components/Base";
import userContext from "../context/useContext";

const Services = () => {
const user=userContext(userContext)


    return ( 
    
    <Base >
        <h1> This is service Page </h1>
        <h1>Welcome{user.name}</h1>
        
        
         </Base>
    )
}

export default Services;