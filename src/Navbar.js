import { Col , Navbar } from 'react-bootstrap';
import { LogoutButton } from './LoginComponents';

function NavBar(props){

return(

<Navbar bg="secondary" variant="dark" expand="lg">
    
    <Col>
      <Navbar.Brand>
        <div style={{fontSize: "xx-large", fontFamily: "cursive"}}>I&T Tracking</div>
      </Navbar.Brand>
    </Col>
    
    <Col className="d-flex justify-content-end">
        { props.logged ? <>
          <LogoutButton logout = {props.logout}/>
          <svg style={{position: "relative", top: '11px'}} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
          </svg>
          </>:<></>
        }
    </Col>
                          
</Navbar>

    );
}

export default NavBar;