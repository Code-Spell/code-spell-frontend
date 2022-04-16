import React from 'react';
import {Button, Card, Col, Container, Image} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import {faBars, faClose, faGreaterThan, faHome, faPlay, faUser} from "@fortawesome/free-solid-svg-icons";
import {SquarePanel} from "../SquarePanel/SquarePanel";
import {SquareButton} from "../SquareButton/SquareButton";
import {NavbarVertical} from "../NavbarVertical/NavbarVertical";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {LevelModal} from "../LevelModal/LevelModal";

export class Level extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            navbarOpen: false,
            optionOpen: true
        }
    }

    navbarHandler() {
        let newState = !(this.state.navbarOpen)
        this.setState({
                navbarOpen: newState
            }
        )
    }

    optionHandler() {
        let newState = !(this.state.navbarOpen)
        this.setState({
                optionOpen: newState
            }
        )
    }

    render() {


        return (
            <Container className="container-fluid mx-3 mt-5">
                <Row>
                    <Col className="col-1">
                        <Button className="shadow mb-5 justify-content-center align-items-center d-flex" onClick={this.navbarHandler.bind(this)}
                                style={{border: "none", backgroundColor: "#3f73c2", borderRadius: "10px", width: "5vw", height: "5vw", maxHeight: "70px", maxWidth: "70px"}}>
                            <FontAwesomeIcon icon={faBars} style={{fontSize: "1.5vw", color: "white"}}/>
                        </Button>
                        {this.state.navbarOpen &&
                            <NavbarVertical />
                        }
                    </Col>
                    <Col className="col-6">
                        <Card className="shadow p-3 mb-4 bg-white rounded">
                            <Row className="justify-content-start d-flex m-2">
                                <span className="mb-2" style={{fontSize: "1.2vw", fontWeight: "bold"}}>Level 2.1</span>
                                <span style={{fontSize: "0.8vw"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt, lacus a dictum tempor, lorem magna venenatis augue, a tempor ante nunc quis est. Phasellus porta non enim non malesuada. In elementum bibendum dui non laoreet. Nam aliquam lacus imperdiet lorem vehicula dictum
                                   quis id sapien.</span>
                            </Row>
                        </Card>
                        <Card className="shadow p-3 mb-5 bg-white rounded" style={{height: "60vh"}}>
                            <Row className="justify-content-start d-flex">

                            </Row>
                        </Card>
                        <Row>
                            <Col className="col-3">
                                <Button className="w-100 me-5 shadow bg-white justify-content-center align-items-center d-flex"
                                        style={{border: "none", height: "6vh", minHeight: "50px"}} href="/">
                                    <span style={{color: "#2C5AA2"}}>ERRORS</span>
                                </Button>
                            </Col>
                            <Col className="col-3"></Col>
                            <Col className="col-3">
                                <Button className="w-100 shadow justify-content-center align-items-center d-flex"
                                        style={{border: "none", height: "6vh", minHeight: "50px", backgroundColor: "#3f73c2"}} href="/">
                                    <span style={{color: "#13305d"}}>RESTART</span>
                                </Button>
                            </Col>
                            <Col className="col-3">
                                <Button className="w-100 shadow justify-content-center align-items-center d-flex" style={{backgroundColor: "#1E4172", border: "none", height: "6vh", minHeight:"50px"}}>
                                    <span style={{color: "white"}}><FontAwesomeIcon  icon={faGreaterThan} style={{color: "white"}} /> NEXT LEVEL</span>
                                </Button>
                            </Col>
                        </Row>

                    </Col>
                    <Col className="col-4 ms-4">
                        {this.state.optionOpen &&
                            <LevelModal/>
                        }
                    </Col>
                </Row>

            </Container>
        );
    }
}