import { Table } from 'react-bootstrap';
import { iconDelete, FrecciaDx, FrecciaSx } from './icons'
import {useState} from 'react'
import { Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Scanner from './Scanner.js'
import logo from './logo.jpeg'

function FormConsegna(props){
    const [scanning, setScanning] = useState(false);

    const scanHandle = scan => {
        if(scanning) {
            props.setColli(colli => [scan.codeResult.code, ...colli]);
            setScanning(false);
        }
    };
    
    return (<>
        <Container>
            { props.show ? 
                <Row className="justify-content-center">
                    <Button onClick={() => {props.setShow(false); props.setStato(props.bVal1)}} className="cns-button">{props.bDes1}</Button>
                    <Button onClick={() => {props.setShow(false); props.setStato(props.bVal2)}} className="res-button">{props.bDes2}</Button>
                </Row>
                : <>
                    <Row className="justify-content-around">
                        <Button  className="nav-button" onClick={() => {setScanning(false); props.setColli([]); props.setShow(true)}}>{FrecciaSx} Indietro</Button>
                        <Button  className="nav-button" onClick={() => props.colli.length ? props.setMap(true) : props.setMessage({msg: 'Non è stato inserito alcun collo', type: 'danger'})}>Avanti {FrecciaDx}</Button>
                    </Row>
                    <Row className="justify-content-center">
                        <Scanner onDetected={scanHandle} />
                        <Button onClick={() => setScanning(true)} variant="light" className={`scan-button ${scanning && "invisible"}`}>Nuova scansione</Button>
                    </Row>
                    <Row className="scan-table">
                        <Table >
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Codici letti</th>
                                    <th>Rimuovi codice</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.colli.map((c, i) =>
                                    <tr>
                                        <td>{i+1}</td>
                                        <td>{c}</td>
                                        <td><span onClick={() => props.setColli(colli => colli.filter((c, index) => i !== index))} >{iconDelete}</span></td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Row>
                </>
            }
            <Row className="justify-content-center">
                <img className="logo" src={logo} alt={"logo"}/>
            </Row>
        </Container>
    </>);
}

export default FormConsegna;