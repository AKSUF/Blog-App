
import { Col, Container, Row } from "reactstrap";
import Base from "../components/Base";
import NewFeed from "../components/NewFeed";
import CategorySideMenu from "../components/CategorySideMenu";

const HomePage = () => {
    return (
        
        <Base >
   <Container>  
      <Row>
      <Col md={{size:2}} className="pt-5">
       <CategorySideMenu/>
        </Col>
        <Col md={{size:10}}>
        <NewFeed/>
        </Col>
      </Row>
      </Container>
    

         </Base>



      
    )
}
export default HomePage;