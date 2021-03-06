import React from "react";
import Row from "react-bootstrap/Row";
import {Button, Card} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {faUser, faArrowRightFromBracket, faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useState} from "react";

const Navbar = (props) => {

    const [title] = useState(props.title);

    const handleExit = () => {
        localStorage.removeItem('code_spell_token');
        localStorage.removeItem('user_email');
        localStorage.removeItem('code_spell_expiration');
        setTimeout(() => window.location.replace("/"), 2000);
    }

    let firstButton;
    if (title !== undefined && title === "Dashboard") {
        firstButton = <Button className="shadow w-75 justify-content-center align-items-center d-flex"
                              style={{border: "none", height: "6vh", minHeight: "50px", backgroundColor: "#1E4172"}} onClick={handleExit.bind(this)}>
            <span style={{color: "#FFFFFF"}}><FontAwesomeIcon icon={faArrowRightFromBracket} style={{color: "white"}}/> EXIT</span>
        </Button>;
    } else {
        firstButton =
            <Button className="shadow w-75 justify-content-center align-items-center d-flex" href="/"
                    style={{border: "none", height: "6vh", minHeight: "50px", backgroundColor: "#1E4172"}}>
                <span style={{color: "#FFFFFF"}}><FontAwesomeIcon icon={faArrowLeft} style={{color: "white"}}/> GO BACK</span>
            </Button>
    }

    return (
        <Row className="container-fluid my-5">
            <Col className="col-3 justify-content-start d-flex">
                {firstButton}
            </Col>
            <Col className="col-6">
                <Card className="shadow w-100"
                      style={{backgroundColor: "rgb(255,255,255)", border: "none", minHeight: "50px"}}>
                    <Col className="align-items-center justify-content-center align-items-center d-flex">
                        <span style={{color: "#1E4172", textTransform: "uppercase", fontSize: "20px", fontWeight: "bolder",  letterSpacing: "3px"}}>{title}</span>
                    </Col>
                </Card>
            </Col>
            <Col className="col-3 justify-content-end d-flex">
                <Button className="shadow w-75 justify-content-center align-items-center d-flex" href="/account"
                        style={{backgroundColor: "#1E4172", border: "none", height: "6vh", minHeight: "50px"}}>
                    <span style={{color: "FFFFFF"}}><FontAwesomeIcon icon={faUser} style={{color: "white"}}/> ACCOUNT</span>
                </Button>
            </Col>
        </Row>
    );
};

export default Navbar;