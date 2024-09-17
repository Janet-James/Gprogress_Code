// import { useState, useEffect } from "react";
import React, {useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar';

import { Link } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';

/* Images */
import Logo from './../../dist/images/Green-Logo.svg'
import UserImg from './../../dist/images/static/user.png'
import NavIcon from './../../dist/images/navigationicon.svg'


function App() {
  const [userId, setUserid] = useState(false);

  const navigate  = useNavigate ();

  useEffect(() => {
    // Check if user is already logged  in
    const storedUser = localStorage.getItem('User');
    if (storedUser) {
      setUserid(true); // Set username if logged in
    }
    
    
  }, []);

  

    const Logout = () => {
      localStorage.removeItem('User');
      localStorage.removeItem('isLoggedIn', false); // Remove user from localStorage on logout
      navigate('/login');
      window.location.reload()
    }

   //console.log(userId);

    

    return (
      <>
        <Navbar expand="lg" className="align-items-start">
          <Container fluid className="flex-column">
            <Navbar.Brand href="#"><img src={NavIcon} alt=""/></Navbar.Brand>
            <Navbar.Collapse id="navbarScroll" className="d-none">
              <Nav
                className="me-auto my-2 my-lg-0 flex-column"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <Nav.Link href="#action1">Home</Nav.Link>
                <Nav.Link href="#action2">Link</Nav.Link>
                
                <Nav.Link href="#" disabled>
                  Link
                </Nav.Link>
              </Nav>
             
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <header>
          <Container>
              <Row className='align-items-center'>
                  <Col md={3} className='text-start px-0'>
                  <Link to="/" className="logo"><img src={Logo} alt="" /></Link>
                  </Col>
                  {/* {userId && ( */}
                    <Col md={3} className='text-end ms-auto px-0'>
                      <div className='userinfo d-flex align-items-center justify-content-end'>
                            <img src={UserImg} alt="" className='me-2'/>
                            <div className='username text-start'>
                                <h6>Richard</h6>
                                <button onClick={Logout}>Logout</button>
                            </div>
                      </div>
                    </Col>
                  {/* )} */}
              </Row>
          </Container>
        </header>
      </>
    );
  }
  
  export default App;