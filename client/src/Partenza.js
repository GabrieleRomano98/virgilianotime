import { Row, Button, Spinner } from 'react-bootstrap';
import { GiPistolGun } from "react-icons/gi";
import sound from './startSound.mp3';
import { useState } from 'react';
import { FrecciaSx } from './icons'
import API from './API';

const startSound = new Audio(sound);

function Partenza(props) {
	const [partito, setPartito] = useState(false);
    const [pronti, setPronti] = useState(false);

    const start = () => {
        API.addTime(props.code);
        startSound.play();
        setPartito(true);
        setPronti(false);
    }

    const indietro = () => {
        props.setShow('Home');
        setPartito(false);
        setPronti(false);
    }

    return (
        <Row className="justify-content-center m-5">
            <div className="mb-4 text-box">Codice sessione da inserire all'arrivo: {props.code}</div>
            { !partito ? 
                <Button className="main-button general-button" onClick={() => {setTimeout(start, 2500); setPronti(true)}}>
                    {pronti? <Spinner animation="border" role="status"/>
                    : <>Start <GiPistolGun/></>}
        		</Button>
            : 
                <div className="mb-4 text-box">Partito! Il risultato sarà visibile all'arivo</div>}
            <Button className="fixed-bottom general-button mb-4 ml-2" size="lg" onClick={indietro}>{FrecciaSx} Indietro</Button>
        </Row>
    );
}

export default Partenza;