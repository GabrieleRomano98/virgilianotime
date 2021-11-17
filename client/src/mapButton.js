import Button from 'react-bootstrap/Button';
import {  useState } from 'react';
import { FrecciaSx } from './icons'
import { Container, Row } from 'react-bootstrap';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import dayjs from 'dayjs';
//npm install --save react-google-maps

const MapComponent = withScriptjs(withGoogleMap((props) => {

    const [position, setPosition] = useState({lat: 42, lng: 13});
    const [visible, setVisible] = useState(false);

    const positionHandle = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude,}); setVisible(true);},
                () => {/*Non ci sono le autorizzazioni*/}
            );
        } else {
            //Non ci sono le autorizzazioni
        }
    };

    const confirmHandle = () => {
        if(visible) {
            props.setShow(true);
            props.setColli([]);
            props.setMap(false); 
            props.inviaColli(props.colli, position.lat, position.lng, dayjs().format('YYYY-MM-DD HH:mm'), props.stato)
        }
        else
            props.setMessage({msg: 'È necessario fornire la posizione', type: 'danger'});
    }

    return(
        <Container>
            <Row className="">
            </Row>
            <Row>
                <GoogleMap defaultZoom={6} center={position}>
                    <Marker visible={visible} position={position} />
                </GoogleMap>
            </Row>
            
            <Row className="justify-content-center">
                <Button className='pos-button' onClick={positionHandle}>Mostra posizione</Button>
                <Button className='pos-button' onClick={confirmHandle}>Conferma</Button>
                <Button className='pos-button' onClick={() => props.setMap(false)}>{FrecciaSx} Indietro</Button>
            </Row>
        </Container>
    );
}))

export default MapComponent;