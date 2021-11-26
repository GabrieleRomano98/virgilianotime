import 'bootstrap/dist/css/bootstrap.min.css';
import { FaLeaf } from "react-icons/fa";
import './App.css';
import { Button, Container, Row } from 'react-bootstrap';
import { FrecciaSx } from './icons'
import { useState } from 'react';
import Home from './Home';
import Partenza from './Partenza';
import Arrivo from './Arrivo.js';

function App() {
	const [show, setShow] = useState('Home');
	const [risultato, setRisultato] = useState();
	const [code, setCode] = useState();

  	return (
		<Container fluid className='Title'>

			<Row className="bg-success justify-content-center">
				<h1>Virgiliano Time <FaLeaf/></h1>
			</Row>
			
			{ show === 'Home' ? <Home setShow={setShow} setCode={setCode}/>

			: show === 'Arrivo' ?

				<Row className="justify-content-center m-5">
					<Arrivo setRisultato={setRisultato} setShow={setShow}/>
				</Row>

			: show === 'Partenza' ? <Partenza code={code} setShow={setShow}/>
			
			:
			<Row className="justify-content-center m-5">
				<div className="mb-4 text-box">Risultato: {risultato}"</div>
				<Button className="fixed-bottom general-button mb-4 ml-2" size="lg" onClick={() => setShow('Home')}>{FrecciaSx} Indietro</Button>
			</Row>

			}

		</Container>
  );
}

export default App;