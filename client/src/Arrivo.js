import React from "react";
import Canvas from "./Canvas";
import { Button, Form, Spinner } from 'react-bootstrap';
import {FrecciaSx } from './icons'
import API from './API.js'

const Arrivo = props => {

    var prvScore = -1, imgScore, bool = false;

    const [intervalId, setIntervalId] = React.useState(false);
    const [sessione, setSessione] = React.useState(false);
    const [trovata, setTrovata] = React.useState(false);
    const [message, setMessage] = React.useState(false);
    const [start, setStart] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [errMsg, setErrMsg] = React.useState('');

    let videoRef = React.createRef();

    const canvasDrow = async (ctx) => {
        if(!ctx || !start) return;
        try {
            ctx.globalCompositeOperation = "difference";
            ctx.drawImage(videoRef.current, 0, 0, 640, 480);
            const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
            imgScore = 0;
            for(var j = imageData.width*7/15; j< imageData.width*8/15; j++)
                for (var i = 0; i < imageData.height; i += 4) {
                    var r = imageData.data[j*imageData.width + i] / 3;
                    var g = imageData.data[j*imageData.width + i + 1] / 3;
                    var b = imageData.data[j*imageData.width + i + 2] / 3;
                    imgScore += r + g + b;
                }
            imgScore /= (0.1 * imageData.height * imageData.width/15);
            if(bool) imgScore = prvScore;
        }
        catch (e){console.log(e)}

        if(prvScore > 10 && imgScore > 10 && (imgScore-prvScore > 5 || prvScore-imgScore > 5)){
            clearInterval(intervalId);
            setIntervalId(false);
            const startTime = await API.getTime(Number(sessione));
            props.setRisultato(-1*Number(startTime.time)/1000);
            props.setShow('Risultato');
            prvScore = -1;
        }
        else if(!bool) prvScore = imgScore;
        bool = !bool;
    };

    const openCamera = () => {
        navigator.mediaDevices
        .getUserMedia({audio: false, video: { width: 640, height: 480 }})
        .then(stream => {
            videoRef.current.srcObject = stream; 
            if(!intervalId) setIntervalId(setInterval(canvasDrow, 50)); 
        })
        .catch(() => console.log('error'));
    };

    const verificaSessione = async () => {
        if(!sessione) {
            setMessage(true);
            setErrMsg('Inserisci il codice sessione!');
        }
        if(sessione.toLowerCase() === 'freddy'){
            setMessage(true);
            setErrMsg("Chi l'avrebbe mai detto!");
            return;
        }
        if(sessione.toLowerCase() === 'davide'){
            setMessage(true);
            setErrMsg("Porcu diavulu mortu!");
            return;
        }
        if(sessione.toLowerCase() === 'zack'){
            setMessage(true);
            setErrMsg("È lento!");
            return;
        }
        const res = await API.getSession(sessione);
        if(res) setTrovata(true);
        else {
            setMessage(true);
            setErrMsg('Codice sessione errato, riprova!');
        }
    }

    const registrazione = () => {
        setTimeout(() => {
            setStart(true);
            setLoading(false);
        }, 3000)
        setLoading(true);
    }

    const indietro = () => {
        clearInterval(intervalId);
        setIntervalId(false);
        setTimeout(props.setShow, 10, 'Home');
    }

    return(
        !trovata ? <>
            <div className="mb-4 text-box">Inserisci il codice sessione generato alla partenza</div>
            {message && <div className="mb-4 error-box">{errMsg}</div>}
            <Form.Control className="mb-3" placeholder={"Codice sessione"} onChange={event => setSessione(event.target.value)}/>
            <Button className="general-button mb-4 ml-2" size="lg" onClick={verificaSessione}>Invia</Button>
            <Button className="fixed-bottom general-button mb-4 ml-2" size="lg" onClick={indietro}>{FrecciaSx} Indietro</Button>
        </>
        : <>
            {!intervalId ? <Button className="general-button mb-4 ml-2" size="lg" onClick={openCamera}>Apri telecamera</Button>
            : loading ? <Spinner animation="border" role="status"/>
            : !start && <>
                <Button className="general-button mb-4 ml-2" size="lg" onClick={registrazione}>Inizia registrazione</Button>
                <div className="mb-4 text-box">Posiziona il telefono sul traguardo</div>
            </>}
            <video autoPlay ref={videoRef} />
            {intervalId && <div className="invisible-canvas"><Canvas running={intervalId} draw={canvasDrow} classeName="invisible-canvas"/></div>}
            <Button className="fixed-bottom general-button mb-4 ml-2" size="lg" onClick={indietro}>{FrecciaSx} Indietro</Button>
        </>
    );
}

export default Arrivo;