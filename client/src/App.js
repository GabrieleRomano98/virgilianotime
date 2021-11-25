import 'bootstrap/dist/css/bootstrap.min.css';
import { FaLeaf } from "react-icons/fa";
import { BiRun } from "react-icons/bi";
import { GiFinishLine, GiPistolGun } from "react-icons/gi";
import './App.css';
import { Button, Container, Row } from 'react-bootstrap';
import {FrecciaSx } from './icons'
import { useState } from 'react';
import API from './API';
import Arrivo from './Camera.js';
import logo from './logo.png'

function App() {
	const [show, setShow] = useState('Home');
	const [risultato, setRisultato] = useState();
	const [partito, setPartito] = useState(false);
	const [code, setCode] = useState();

	const partenza = () => {
		setShow('Partenza'); 
		const newCode = Math.floor(Math.random(1)*10000);
		setCode(newCode);
		API.addSession(newCode);
	}

  	return (
		<Container fluid className='Title'>

			<Row className="bg-success justify-content-center">
				<h1>Virgiliano Time <FaLeaf/></h1>
			</Row>
			
			{ show === 'Home' ? <>

				<Row className="justify-content-center m-4">
					<Button className="main-button general-button" onClick={partenza}>Partenza <BiRun/></Button>
				</Row>
				<Row className="justify-content-center">
					<Button className="main-button general-button" onClick={() => setShow('Arrivo')}>Arrivo <GiFinishLine/></Button>
				</Row></>

			: show === 'Arrivo' ?

				<Row className="justify-content-center m-5">
					<Arrivo setRisultato={setRisultato} setShow={setShow}/>
				</Row>

			: show === 'Partenza' ?

				<Row className="justify-content-center m-5">
					<div className="mb-4 text-box">Codice sessione da inserire all'arrivo: {code}</div>
					{!partito ? <Button className="main-button general-button" onClick={() => {API.addTime(code); setPartito(true);}}>Start <GiPistolGun/></Button>
					: <div className="mb-4 text-box">Partito! Il risultato sarà visibile all'arivo</div>}
					<Button className="fixed-bottom general-button mb-4 ml-2" size="lg" onClick={() => {setShow('Home'); setPartito(false);}}>{FrecciaSx} Indietro</Button>
				</Row>
			
			:

			<Row className="justify-content-center m-5">
				<div className="mb-4 text-box">Risultato: {risultato}"</div>
				<Button className="fixed-bottom general-button mb-4 ml-2" size="lg" onClick={() => setShow('Home')}>{FrecciaSx} Indietro</Button>
			</Row>

			}

			{ show === 'Home' && 
				<Row className="justify-content-center">
					<img className="logo" src={logo} alt={"logo"}/>
				</Row>
			}

		</Container>
  );
}

export default App;