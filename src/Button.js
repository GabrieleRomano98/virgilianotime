import Button from 'react-bootstrap/Button';
import {useState} from 'react'
import InputForm from './InputForm';
import dayjs from 'dayjs'

function ButtonCircle(props) {
const [show, setShow] = useState(false);
const [name, setName] = useState('');
const [privato, setPrivato] = useState(false);
const [important, setImportant] = useState(false);
const [date, setDate] = useState(dayjs());
const [time, setTime] = useState('');

    return (
<>
           
    <Button className="btn-circle rounded-circle" variant="secondary" onClick = {() => setShow(true)}>
        +
    </Button>

    <InputForm name={name} date={date} time={time} privato={privato} important={important} setName={setName} setDate={setDate} setTime={setTime} setPrivato={setPrivato} setImportant={setImportant} show={show} setShow={setShow} updateList={task => {props.addTask(task)}} title={'Add a new task'} label={'Add task'}></InputForm>  

</>
    );
}

export default ButtonCircle;