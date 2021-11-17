import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Nav, Col, Container, Row, Alert } from 'react-bootstrap';
import FormConsegna from './FormConsegna.js';
import ComponenteOperatore from './vistaOperatore.js';
import MapComponent from './mapButton.js';
import NavBar from './Navbar.js';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import API from './API';
import { LoginForm } from './LoginComponents';

const arrayRuoli = [ 'operatore', 'magazziniere', 'autista' ];
//const arrayStati = ['in magazzino', 'in consegna', 'consegnato', 'respinto'];

function App() {
  const [show, setShow] = useState(true);
  const [colli, setColli] = useState(['1', '2', '3', '4']);
  const [stato, setStato] = useState();
  const [map, setMap] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [ruolo, setRuolo] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false); // at the beginning, no user is logged in

  useEffect(()=> {
    const checkAuth = async() => {
      try {
        // here you have the user info, if already logged in
        // TODO: store them somewhere and use them, if needed
        const user = await API.getUserInfo();
        setLoggedIn(true);
        setRuolo(user.ruolo);
      } catch(err) {
        console.error(err.error);
      }
    };
    checkAuth();
  }, []);


  useEffect(()=> {
    const getColli = async () => {console.log(ruolo);
      if(loggedIn && ruolo === 0) {
        const colli = await API.getColli();
        setColli(colli);
      }
    };
    getColli()
      .catch(err => {
        setMessage({msg: "Impossibile caricare i dati! Ripropva più tardi...", type: 'danger'});
        console.error(err);
      });
  }, [loggedIn, ruolo]);

  const handleErrors = (err) => {
    if(err.errors)
      setMessage({msg: err.errors[0].msg + ': ' + err.errors[0].param, type: 'danger'});
    else
      setMessage({msg: err.error, type: 'danger'});
  }


  const doLogIn = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
      setLoggedIn(true);
      setMessage({msg: `Welcome, ${user.name}!`, type: 'success'});
      setRuolo(user.ruolo);
    } catch(err) {
      setMessage({msg: 'Incorrect uername and/or password', type: 'danger'});
    }
  }

  const doLogOut = async () => {
    await API.logOut();
    // clean up everything
    setLoggedIn(false);
    setRuolo(undefined);
    setColli([]);
  }

  return (
    <Router>
      <NavBar logged={loggedIn} logout={doLogOut} />
      <Container sm="auto" className="App">
        <Switch>

          <Row sm="auto" className="rowstyle">
            <Col sm="auto" md="10" lg="10">
              {message && <Alert variant={message.type} onClose={() => setMessage('')} dismissible>{message.msg}</Alert>}
              
              {!loggedIn ? <Redirect to="/login" /> :
                !loading ? <span>🕗 Please wait, loading... 🕗</span> :
                <Nav className = "px-md-4">

                  <Route exact path="/autista" render={() =>
                    !map ? 
                      <FormConsegna bDes1={'Consegnato'} bDes2={'Respinto'} bVal1={2} bVal2={3} show={show} setShow={setShow} colli={colli} setColli={setColli} setMap={setMap} setStato={setStato}  setMessage={setMessage}/>
                    :
                      <MapComponent 
                        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `400px`, width: '600px' }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        setMap={setMap}
                        inviaColli={API.inviaColli}
                        colli={colli}
                        stato={stato}
                        setColli={setColli}
                        setShow={setShow}
                        setMessage={setMessage}
                      />
                  } />

                  <Route exact path="/magazziniere" render={() =>
                    !map ? 
                      <FormConsegna bDes1={'In magazzino'} bDes2={'In consegna'} bVal1={0} bVal2={1} show={show} setShow={setShow} colli={colli} setColli={setColli} setMap={setMap} setStato={setStato} setMessage={setMessage}/>
                    :
                      <MapComponent 
                        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `400px`, width: '600px' }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        setMap={setMap}
                        inviaColli={API.inviaColli}
                        colli={colli}
                        stato={stato}
                        setColli={setColli}
                        setShow={setShow}
                        setMessage={setMessage}
                      />
                  } />

                  <Route exact path="/operatore" render={() =>
                    <ComponenteOperatore 
                      googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                      loadingElement={<div style={{ height: `100%` }} />}
                      containerElement={<div style={{ height: `400px`, width: '100%' }} />}
                      mapElement={<div style={{ height: `100%` }} />}
                      inviaColli={API.inviaColli}
                      colli={colli}
                      stato={stato}
                      setColli={setColli}
                      setMessage={setMessage}
                      />
                  }/>

                  <Route exact path="/undefined" render={() =>
                    {!ruolo && <Redirect to="/login"/>}
                  }/>

                </Nav>

              }

              <Route path="/login" render={() => 
                <>{loggedIn && arrayRuoli[ruolo]!==undefined ? <Redirect to = {'/' + arrayRuoli[ruolo]} /> : <LoginForm login={doLogIn} />}</>
              }/>

            </Col>
          </Row>

        </Switch>

      </Container>
    </Router>
  );
}

export default App;