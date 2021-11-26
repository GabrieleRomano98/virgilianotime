import { Button, Row } from 'react-bootstrap';
import { GiFinishLine } from "react-icons/gi";
import { BiRun } from "react-icons/bi";
import logo from './logo.png'
import API from './API';

function Home(props) {

	const partenza = () => {
		props.setShow('Partenza'); 
		const newCode = Math.floor(Math.random(1)*10000);
		props.setCode(newCode);
		API.addSession(newCode);
	}

    return (
        <>
            <Row className="justify-content-center m-4">
                <Button className="main-button general-button" onClick={partenza}>Partenza <BiRun/></Button>
            </Row>
            <Row className="justify-content-center">
                <Button className="main-button general-button" onClick={() => props.setShow('Arrivo')}>Arrivo <GiFinishLine/></Button>
            </Row>
            <Row className="justify-content-center">
                <img className="logo" src={logo} alt={"logo"}/>
            </Row> 
        </>
    );
}

export default Home;