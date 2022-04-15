import React from 'react';
import {SmallPanel} from "../SmallPanel/SmallPanel";
import Row from "react-bootstrap/Row";
import {Button, Card, Col, Container} from "react-bootstrap";
import {faEdit, faGear, faPlay, faPlug, faPowerOff, faRocket, faTrophy} from "@fortawesome/free-solid-svg-icons";
import {SquarePanel} from "../SquarePanel/SquarePanel";
import {UserPanel} from "../UserPanel/UserPanel";
import {Navbar} from "../Navbar/Navbar";

export class Dashboard extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Container className="container-fluid">
                    <Row className="justify-content-center d-flex">
                        <Navbar/>
                    </Row>
                    <Row className="my-4 justify-content-center d-flex">
                        <Col className="col-2 mx-2">
                            <SquarePanel icon={faPlay}
                                         title={'PLAY'}
                                         link="/levels"
                            />
                        </Col>
                        <Col className="col-2 mx-2">
                            <SquarePanel icon={faEdit}
                                         title={'CREATE'}

                            />
                        </Col>
                        <Col className="col-2 mx-2">
                            <SquarePanel icon={faTrophy}
                                         title={'LEADERBOARDS'}
                                         link="/leaderboards"
                            />
                        </Col>
                        <Col className="col-2 mx-2">
                            <SquarePanel icon={faRocket}
                                         title={'ACHIEVEMENTS'}
                                         link="/achievements"
                            />
                        </Col>
                        <Col className="col-2 mx-2">
                            <SquarePanel icon={faGear}
                                         title={'SETTINGS'}
                                         link="/settings"
                            />
                        </Col>
                    </Row>
                    <Row className="justify-content-center" style={{marginTop: "15vh"}}>
                        <Col className="col-2 mt-4">
                            <Button className="disabled align-items-center justify-content-center d-flex w-100 h-25 mb-3">
                                <span style={{fontSize: "0.9vw"}}>JAVA</span>
                            </Button>
                            <Button className="disabled align-items-center justify-content-center d-flex w-100 h-25">
                                <span style={{fontSize: "0.9vw"}}>EXPERIENCED</span>
                            </Button>
                        </Col>
                        <Col className="col-8 ms-5 me-2">
                            <UserPanel/>
                        </Col>
                    </Row>
                </Container>
            </Container>
        );
    }
}