import React, {useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Navigate } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';
// import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Img1 from './../../dist/images/1_G.png'
import Img2 from './../../dist/images/2_G.png'
import Img3 from './../../dist/images/3_G.png'

import BgImg1 from './../../dist/images/bg-gradient-1.png'
import BgImg2 from './../../dist/images/bg-gradient-2.png'
import BgImg3 from './../../dist/images/bg-gradient-3.png'

import LoginBtn from './../../dist/images/login-btn.png'



function LoginForm() {
    const [validated, setValidated] = useState(false);
    const [userId, setUserid] = useState('');
    const [userPassword, setPassword] = useState('');
    //const [UserNameValidate, setUserNameValidate] = useState(false);
    //const [UserPasswordValidate, setUserPasswordValidate] = useState(false);
    const navigate  = useNavigate ();
    const [bgIndex, setBgIndex] = useState(1);

    const [showLoginInput, setShowLoginInput] = useState(true);
    const [showLoginPassword, setShowLoginPassword] = useState(false);

    const UserNameEmpty = () => toast.error("Username Should not be empty");
    const WrongUserName = () => toast.error("Please Enter your valid UserName");
    const EmptyPassword = () => toast.error("Password Should not be empty");
    const WrongPassword = () => toast.error("Please Enter your valud Password");
    const LoginSuccess = () => toast.success("Sucessfully you Logged in", {
        onClose: () => {
            localStorage.setItem('isLoggedIn', true);
            localStorage.setItem('User', userId); // Store username in localStorage
            setValidated(true);
            navigate('/dashboard');
            window.location.reload();
        }
    });

    const PasswordBlock = () => {
        if (userId.trim() === '') {
            UserNameEmpty();
            //setUserNameValidate(true);
        } else if (userId !== 'admin@gmail.com') {
            //setUserNameValidate(true); 
            WrongUserName();
        } else {
            //setUserNameValidate(false);
            setShowLoginInput(false);
            setShowLoginPassword(true);
        }
        
    };

    const handleBack = () => {
        setShowLoginInput(true);
        setShowLoginPassword(false);
    };

    useEffect(() => {
        // Check if user is already logged in
      const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUserid(storedUser); // Set username if logged in
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setBgIndex((prevIndex) => (prevIndex % 3) + 1); // Change the index based on the number of backgrounds/images
        }, 5000); // Change every 5 seconds (5000 milliseconds)

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);

    const backgrounds = [
        { bg: `url(${BgImg1}) no-repeat bottom left`, img: Img1 },
        { bg: `url(${BgImg2}) no-repeat bottom left`, img: Img2 },
        { bg: `url(${BgImg3}) no-repeat bottom left`, img: Img3 },
    ];

    const currentBg = backgrounds[bgIndex - 1];


    //const { register, handleSubmit, formState: { errors } } = useForm();

    const handleUserName = (event) => {
        setUserid(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const onSubmit = (data) => {
        data.preventDefault();
        data.stopPropagation();
       
        if(userPassword.trim() === '') {
            //setUserPasswordValidate(true);
            EmptyPassword();
        } else if (userPassword !== '1234') {
            WrongPassword();
            //setUserPasswordValidate(true);  
        }else {
            LoginSuccess();
            // setTimeout(function(){
                
            // }, 3000);   
        }  
    };
    
  return (
    <>
    <section className="login-sec mh-100vh">    
        <div className='login-wrapper px-4 px-md-0'>
            <Row className=' full-height justify-content-center  login-block'>
                <Col md={6} className="login-details">
                    <h1 className="client-title mb-4">GSolve</h1>
                    <p className="mt-10 mb-4">We, GREEN, endeavor to be of value rather than just a success. As a provider of energy engineering, GREEN is delighted to introduce you to our value engineering delivery to all of our clients.</p>

                    <p className="mb-4">Our primary focus is to deliver customizable renewable energy solutions and services to regions lacking access to conventional energy sources, or unelectrified areas.</p>

                    <p className="mb-4">By empowering communities where reliable access to electricity is still a distant fantasy, we promote well-being and sustainability while fostering economic and social development. Our relentless commitment to providing superior quality solutions, products, and services guarantees that we make a constructive impact on the environment.</p>
                        
                    <p className="mb-4">We engineer to deliver value for your energy needs and environmental sustainability!</p>
                </Col>
                <Col md={6} className="text-center ">
                    <Row>
                        <Col xs={12}>
                            <h2 className='mb-3'>Leverage the Value Engineered for your project!</h2>
                            <h6 className='mb-4'>By Logging In</h6>
                        </Col>
                    </Row>
                    <Row className='justify-content-center'>
                        <Col>
                            <Form noValidate >
                            {showLoginInput && (
                                  <div className="loginInput">
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Control 
                                        type="email"
                                        name="email" 
                                        placeholder="User Email Id" 
                                        value={userId}
                                        onChange={handleUserName}                                        
                                        />
                                        {/* {UserNameValidate && (              
                                            <Form.Control.Feedback type="invalid" className="d-block mt-3">Please Enter Valid UserName</Form.Control.Feedback>                       
                                        )} */}
                                    </Form.Group>
                                    <button type="button"  onClick={PasswordBlock} className="btn-transparent"><img src={LoginBtn} /></button>
                                </div>
                            )}
                            {showLoginPassword && (
                                <div className="loginPassword ">
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control 
                                        type="password" 
                                        placeholder="Password"
                                        name="password"                                     
                                        value={userPassword}
                                        onChange={handlePassword}
                                        />          
                                        {/* {UserPasswordValidate && (              
                                            <Form.Control.Feedback type="invalid" className="d-block">Password is Wrong</Form.Control.Feedback>                       
                                        )}                                 */}
                                    </Form.Group>
                                    <button type="submit" onClick={onSubmit}  className="btn-transparent"><img src={LoginBtn} /></button>
                                    <div className="register-link">
                                    <a id="forgot_passwordBtn" >Forgot Password?</a>
                                    <span>or</span>
                                    <a >Reset Password</a>
                                    </div>
                                    <p className="mt-3" onClick={handleBack}> 
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="13" viewBox="0 0 20 15" fill="none">
                                        <path d="M7.86293 0.590123L0.8036 7.09214C0.730673 7.15923 0.672819 7.23891 0.633347 7.32661C0.593874 7.41432 0.573557 7.50833 0.573557 7.60327C0.573557 7.69821 0.593874 7.79222 0.633347 7.87992C0.672819 7.96762 0.730673 8.0473 0.8036 8.1144L7.86293 14.6164C8.01011 14.752 8.20973 14.8281 8.41787 14.8281C8.62601 14.8281 8.82563 14.752 8.97281 14.6164C9.11999 14.4808 9.20268 14.297 9.20268 14.1053C9.20268 13.9136 9.11999 13.7297 8.97281 13.5941L3.25182 8.32571L18.6147 8.32571C18.8227 8.32571 19.0222 8.2496 19.1693 8.11411C19.3164 7.97863 19.399 7.79487 19.399 7.60327C19.399 7.41166 19.3164 7.2279 19.1693 7.09242C19.0222 6.95693 18.8227 6.88082 18.6147 6.88082L3.25182 6.88082L8.97281 1.61238C9.11999 1.47682 9.20268 1.29296 9.20268 1.10125C9.20268 0.909543 9.11999 0.725683 8.97281 0.590123C8.82563 0.454563 8.62601 0.378405 8.41787 0.378405C8.20973 0.378405 8.01011 0.454563 7.86293 0.590123Z" fill="black"></path>
                                        </svg> Back
                                    </p>
                                </div>
                            )}
                            </Form>
                            
                        </Col>
                    </Row>
                </Col>
            </Row>
            <div className="loginBgAnimation img-1" 
            style={{background : currentBg.bg}}
            >
                 <img src={currentBg.img} /> 
                <h4><i>REEN</i> <br />Solve</h4>
            </div>
        </div>
        <ToastContainer autoClose="1500" />
        </section>
    </>
  );
}

export default LoginForm;