import React, {useState} from "react";
import Row from "react-bootstrap/Row";
import {Button, Form, Image} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from "react-router-dom";
import {postRegister} from "../../utils/api/apihandler";

const SignUp = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [terms, setTerms] = useState(false);

    let navigate = useNavigate();

    const onInputChanged = (state, event) => {
        state(event.target.value);
    };

    const onTermsChanged = () => {
        setTerms(!terms);
    }
    //Checks for string@string.string format
    const isValidEmailAddress = (address) => {
        const testEmail = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;
        return testEmail.test(address);
    }

    const checkUsername = (username) => {
        //from 3 to 20 in length no _ or . at the start/end/consecutive only allows for A-Z Numbers and _ .
        const testUserName = /^(?=[a-zA-Z0-9._]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/i;
        return (testUserName.test(username));
    }

    const passwordStrength = (password) => {
        const testPw = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/i;
        return (testPw.test(password));
    };

    const notify = (message) => toast(message);

    const onSubmit = () => {

        if (!username || !checkUsername(username) || username === "null") {
            notify("Please provide an username with at least 4 characters, only A-Z,0-9 , _ and . are allowed!");
            return;
        }

        if (!email || !isValidEmailAddress(email) || email === "null") {
            notify("Please provide an email!");
            return;
        }

        if (!password || !passwordStrength(password) || password === "null") {
            notify("Please provide an password, it must have 8 characters and at least one number, one uppercase and one lowercase!");
            return;
        }

        if (!terms) {
            notify("Please agree to our terms of use!");
            return;
        }

        postRegister(username, email, password)
            .then((response) => {
                notify(response.data.message);
                navigate("/login", {replace: true});
            }, (error) => {
                notify(JSON.parse(error.request.response)['message']);
                console.log(error);
            });

    };

    return (
        <Col className="col-7 mx-5" style={{backgroundColor: "rgb(256, 256, 256, 0.5)", height: "100vh"}}>
            <Row className="justify-content-center d-flex">
                <Image src="/CODESPELL.png" className="w-50"/>
                <Row className="text-center mb-5">
                    <h3 style={{color: "#1E4172", fontWeight: "bold"}}>Sign Up</h3>
                    <span>Do you already have an account? <Link to="login">Login</Link>!</span>
                </Row>
                <Row className="w-75">
                    <Form>
                        <Form.Group className="mb-3 shadow" controlId="formBasicUsername">
                            <Form.Control style={{height: "5vh", minHeight: "40px"}} type="username"
                                          placeholder="Username"
                                          onChange={(event) => onInputChanged(setUsername, event)}/>
                        </Form.Group>

                        <Form.Group className="mb-3 shadow" controlId="formBasicEmail">
                            <Form.Control style={{height: "5vh", minHeight: "40px"}} type="email" placeholder="Email"
                                          onChange={(event) => onInputChanged(setEmail, event)}/>
                        </Form.Group>

                        <Form.Group className="mb-3 shadow" controlId="formBasicPassword">
                            <Form.Control style={{height: "5vh", minHeight: "40px"}} type="password"
                                          placeholder="Password"
                                          onChange={(event) => onInputChanged(setPassword, event)}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="By clicking you agree to the Terms and Conditions"
                                        onClick={onTermsChanged}/>
                        </Form.Group>

                        <Button className="mt-5 w-100 text-white" onClick={onSubmit}
                                style={{backgroundColor: "#1c93ec", border: "none", height: "6vh"}}>
                            SIGN UP <FontAwesomeIcon icon={faEdit} style={{color: "white"}}/>
                        </Button>

                    </Form>
                </Row>
            </Row>
        </Col>
    );

};

export default SignUp;

