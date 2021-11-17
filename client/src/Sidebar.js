import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';

function SideBar(){

    return(
    
  <ListGroup  variant = "flush" className="col-md-2 col-lg-2 d-md-block collapse bg-light flex-column">
    
    <Link to="/tasks"><ListGroup.Item className="bg-light">All</ListGroup.Item></Link>
    <Link to="/Important"><ListGroup.Item className="bg-light">Important</ListGroup.Item></Link>
    <Link to="Today"><ListGroup.Item className="bg-light">Today</ListGroup.Item></Link>
    <Link to="/Next7Days"><ListGroup.Item className="bg-light">Next 7 Days</ListGroup.Item></Link>
    <Link to="/Private"><ListGroup.Item className="bg-light">Private</ListGroup.Item></Link>
    
  </ListGroup>
  
    );
}

export default SideBar;