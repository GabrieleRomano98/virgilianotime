import { Col, Form, Button, Alert } from 'react-bootstrap';
import dayjs from 'dayjs'
import {useState} from 'react'
import Modal from 'react-bootstrap/Modal'


function InputForm(props){
    const [code, setCode] = useState(props.code);
    const [ErrorMessage, setErrorMessage] = useState('');

    const handleSubmit = () => {
        if(!props.name)
            setErrorMessage("Enter a name for the task!");
        else if(dayjs(props.date).isBefore(dayjs(), 'day'))
            setErrorMessage("The date can't be a past date, insert it again!");
        else {
            setCode(code => code+1);
            const newTask = {name : props.name, date : props.date.format('YYYY-MM-DD HH:mm'), private: props.privato, important : props.important, code : code, completed: 0, user: 1};
            props.updateList(newTask);
            props.setShow(false);
            props.setDate(dayjs()); 
            props.setName(''); 
            props.setPrivato(false); 
            props.setImportant(false); 
            setErrorMessage(''); 
        }
    }

    return(
        
        <Modal show={props.show} onHide={() => {props.setShow(false);}}>

        <Modal.Header closeButton>
            <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            
            <Form>

            {ErrorMessage && <Alert variant='danger'>{ErrorMessage}</Alert>}
            
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type = 'string' placeholder='Task name' value = {props.name} onChange = {event => props.setName(event.target.value)}></Form.Control>
                </Form.Group>
                
                <Form.Row>
                    
                    <Form.Group as = {Col}>
                        <Form.Label>Important</Form.Label>
                        <Form.Check type = 'checkbox' checked = {props.important} onChange = {event => props.setImportant(event.target.checked)}></Form.Check>
                    </Form.Group>

                    <Form.Group as = {Col}>
                        <Form.Label>Private</Form.Label>
                        <Form.Check type = 'checkbox' checked = {props.privato} onChange = {event => props.setPrivato(event.target.checked)}></Form.Check>
                    </Form.Group>
                    
                    <Form.Group as = {Col}>
                        <Form.Label>Date</Form.Label>
                        <Form.Control type = 'date' value = {dayjs(props.date).format('YYYY-MM-DD')} onChange = {event => props.setDate(dayjs(event.target.value))}></Form.Control>
                    </Form.Group>
                    
                    <Form.Group as = {Col}>
                        <Form.Label>Time</Form.Label>
                        <Form.Control type = 'time' value = {props.time} onChange = {event => {props.setTime(event.target.value); props.setDate(old => old.minute(event.target.value.toString().substring(3, 5))); props.setDate(old => old.hour(event.target.value.toString().substring(0, 2)));}}></Form.Control>
                    </Form.Group>

                </Form.Row>

            </Form>

        </Modal.Body>

        <Modal.Footer>

            <Button variant="danger" onClick={() => {props.setShow(false);}}>
                Close
            </Button>

            <Button variant="success" onClick={() => { handleSubmit(); }}>
                {props.label}
            </Button>

        </Modal.Footer>
        </Modal>
);
}

export default InputForm;