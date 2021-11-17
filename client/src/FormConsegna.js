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
            <Row className="justify-content-center"> {
                props.show ? <>
                    <Button onClick={() => {props.setShow(false); props.setStato(props.bVal1)}} className="cns-button">{props.bDes1}</Button>
                    <Button onClick={() => {props.setShow(false); props.setStato(props.bVal2)}} className="res-button">{props.bDes2}</Button>
                </>
                : <>
                    <Button onClick={() => {setScanning(false); props.setColli([]); props.setShow(true)}} className="prev-button">{FrecciaSx} Indietro</Button>
                    <Button onClick={() => props.colli.length ? props.setMap(true) : props.setMessage({msg: 'Non è stato inserito alcun collo', type: 'danger'})} className="next-button">Avanti {FrecciaDx}</Button>
                    <Scanner onDetected={scanHandle} />
                    <Button onClick={() => setScanning(true)} variant="light" className={`scan-button ${scanning && "invisible"}`}>Nuova scansione</Button>
                    <Table className="scan-table">
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
                </>
            } </Row>
            <img className="logo" src={logo} alt={"logo"}/>
        </Container>
    </>);
}

export default FormConsegna;