import {  useState } from 'react';
import { iconGeol } from './icons'
import { Table, Container, Row, Col, Form, FormControl } from 'react-bootstrap';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
//npm install --save react-google-maps

const arrayStati = ['in magazzino', 'in consegna', 'consegnato', 'respinto']

const ComponenteOperatore = withScriptjs(withGoogleMap((props) => {

    const [position, setPosition] = useState({lat: 42, lng: 13});
    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState('');

    return(
        <Container fluid>
            <Col lg>
                <Row className="justify-content-center">
                    <GoogleMap defaultZoom={6} center={position}>
                        <Marker visible={visible} position={position} />
                    </GoogleMap>
                </Row>
            
                <Row className="justify-content-center">
                    <h1>Inserisci il codice</h1>
                    <span className="invisible">___</span>
                    <Form size="large" inline><FormControl onChange={event => setValue(event.target.value)} size="large" type="text" placeholder="Codice"  /></Form>
                </Row>
            
                <Row className="justify-content-center">
                    <Table>
                        <thead>
                            <tr>
                                <th>Codice</th>
                                <th>Stato</th>
                                <th>Posizione</th>
                                <th>Data</th>
                                <th>Utente</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.colli.filter(c => value === '' ? true : c.codice.indexOf(value) > -1).map(c =>
                                <tr>
                                    <td>{c.codice}</td>
                                    <td>{arrayStati[c.stato]}</td>
                                    <td><span style={{color: "blue", cursor: "pointer"}} onClick={() => {window.scrollTo({ top: 0, behavior: "smooth" });setVisible(true); setPosition({lat: c.lat, lng: c.lng})}}>{iconGeol} Mostra sulla mappa</span></td>
                                    <td>{c.Timestamp}</td>
                                    <td>{c.user}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Row>

            </Col>
        </Container>
    );
}))

export default ComponenteOperatore;