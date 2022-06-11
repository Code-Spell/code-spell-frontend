import React from "react";
import {Button, Card, Col, Container, Spinner} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import {faBars, faGreaterThan} from "@fortawesome/free-solid-svg-icons";
import NavbarVertical from "../NavbarVertical/NavbarVertical";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import GenericModal from "../Modals/GenericModal";

import CodeMirror from '@uiw/react-codemirror';
import {java} from "@codemirror/lang-java";
import { oneDark } from '@codemirror/theme-one-dark';
import {getLevel, postFinalSolution, postLevelSolution} from '../../utils/api/apihandler';

import Level1_1 from "../LevelGraphics/Chapter1_Introduction/Level1_1"
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchDifficulty, fetchLanguage} from "../../features/settings/settingsSlice";
import {connect, isStompClientConnected, updateListenableCodeId} from "../../web_sockets/WebSocket";
import {
    selectAnalysisStatus, selectErrors, selectExecutionStatus,
    selectId, selectScore,
    selectSteps
} from "../../features/code/codeSlice";
import {toast} from "react-toastify";

const Level = () => {

    const language = useSelector(fetchLanguage);
    const difficulty = useSelector(fetchDifficulty);

    const steps = useSelector(selectSteps);
    const analysisStatus = useSelector(selectAnalysisStatus);
    const executionStatus = useSelector(selectExecutionStatus);
    const score = useSelector(selectScore);
    const codeReportId = useSelector(selectId);
    const errors = useSelector(selectErrors);

    const initialCode = "//Step 1"+ '\n\n\nclass HelloWorldApp \{\n\tpublic static void main(String[] args) \{\n\t\tSystem.out.println("Hello World!")\;\n\t\}\n\}' + "\n\n\n//Step 2"+"\n\n\n//Step 3";

    const [navbarOpen, setNavbarOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(undefined);
    const [code, setCode] = useState(initialCode);
    const [loading, setLoading] = useState(false);

    const output = useSelector(state => state.code.output);

    let { levelId } = useParams();

    const [currentLevel, setCurrentLevel] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(fetchLanguage());
        dispatch(fetchDifficulty());

        if (!isStompClientConnected())
            connect();

        getLevel(levelId).then(res => {
            setCurrentLevel(res.data);
        });

    }, []);

    useEffect(() => {
        setLoading(false);
    }, [codeReportId]);

    useEffect(() => {

        let errorsButton = document.getElementById("errorsButton");
        let errorsButtonSpan = document.getElementById("errorsButtonSpan");

        if (errorsButtonSpan && errorsButton) {
            if (errors && errors.length > 0) {
                errorsButton.style.backgroundColor = "#FD5D5D";
                errorsButtonSpan.style.color = "#FFFFFF";
            } else {
                errorsButton.style.backgroundColor = "#FFFFFF";
                errorsButtonSpan.style.color = "#2C5AA2";
            }
        }

    }, [errors]);

    const navbarHandler = () => {
        setNavbarOpen(!navbarOpen);
    };

    const optionHandler = (option) => {
        setSelectedOption(option);
    };

    const generateUUID = () => {
        return(
        ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)));
    };

    const runCode = () => {

        if (!isStompClientConnected())
            connect();

        let solutionId = generateUUID(); //generate with Crypto.randomUUID()
        updateListenableCodeId(solutionId); // Update Websockets

        postLevelSolution(currentLevel.id, solutionId, code)
            .then(r => {
                toast.success("Your code is running", {icon: "🚀"});
                console.log(r);
                setLoading(true);
            })
            .catch(e => {
                toast.warning("Unable to run the code");
                console.log(e); setLoading(false)
            });
    }

    const submitCode = () => {

        let settings = {'language': language, 'skillLevel': difficulty};
        postFinalSolution(currentLevel.id, codeReportId, score, code, settings).then(r => {
            toast.success("Level completed, congratulations!", {icon: "🚀"})
            setTimeout(() => window.location.replace("/levels"), 2000);
        })
            .catch(e => {
                toast.warning("Your solution isn't correct");
                console.log(e)});

    }

    const fadeInNavbar = navbarOpen ? 'fadein' : 'fadein hide';

    if (!currentLevel) return;

    let outputPanels = [];
    if (!output) {
        outputPanels.push(<span style={{fontSize: "0.8vw"}}>---</span>)
    } else {
        for (let o of output) {
            outputPanels.push(<span style={{fontSize: "0.8vw"}}>{o}</span>);
        }
    }


    return (
        <Container className="container-fluid mx-3 mt-5">
            <Row>
                <Col className="col-1">
                    <Button className="shadow mb-5 justify-content-center align-items-center d-flex"
                            onClick={navbarHandler.bind(this)}
                            style={{
                                border: "none",
                                backgroundColor: "#3f73c2",
                                borderRadius: "10px",
                                width: "5vw",
                                height: "5vw",
                                maxHeight: "70px",
                                maxWidth: "70px"
                            }}>
                        <FontAwesomeIcon icon={faBars} style={{fontSize: "1.5vw", color: "white"}}/>
                    </Button>
                    <div className={fadeInNavbar}>
                        <NavbarVertical is_disabled={!navbarOpen}
                                        on_option_changed={optionHandler.bind(this)}/>
                    </div>
                </Col>
                <Col className="col-6">
                    <Card className="shadow p-3 mb-3 bg-white" style={{borderRadius: "10px"}}>
                        <Row className="justify-content-start d-flex m-2">
                            <span className="mb-2" style={{fontSize: "1.1vw", fontWeight: "bold"}}>{currentLevel.number}. {currentLevel.title}</span>
                            <span style={{fontSize: "0.8vw"}}>{currentLevel.description}</span>
                        </Row>
                    </Card>
                    <Card className="shadow p-3 mb-3 bg-white" style={{height: "48vh", borderRadius: "10px"}}>
                        <Row className="justify-content-start d-flex">
                            <CodeMirror
                                height="44vh"
                                value= {'class HelloWorldApp \{\n\tpublic static void main(String[] args) \{\n\t\tSystem.out.println("Hello World!")\;\n\t\}\n\}'}
                                extensions={[java()]}
                                theme={oneDark}
                                onChange={(value, viewUpdate) => {
                                    setCode(value);
                                }}
                            />
                        </Row>
                    </Card>
                    <Card className="shadow p-3 mb-3 bg-white" style={{borderRadius: "10px", minHeight: "150px"}}>
                        <Row className="justify-content-start d-flex m-2">
                            <span className="mb-2" style={{fontSize: "1.1vw", fontWeight: "bold"}}>Output</span>
                            <Row style={{maxHeight: "70px", overflowY: "auto"}}>
                                {outputPanels}
                            </Row>
                        </Row>
                    </Card>
                    <Row>
                        <Col className="col-3">
                            <Button id="errorsButton" onClick={optionHandler.bind(this, "errors")}
                                    className="w-100 me-5 shadow justify-content-center align-items-center d-flex"
                                    style={{border: "none", height: "6vh", minHeight: "50px", backgroundColor: "#FFFFFF"}}>
                                <span id="errorsButtonSpan" style={{color: "#2C5AA2"}}>ERRORS</span>
                            </Button>
                        </Col>
                        <Col className="col-3 align-items-center justify-content-end d-flex">
                            {loading &&
                                <Spinner animation="border" variant="light"/>
                            }
                        </Col>
                        <Col className="col-3">
                            <Button className="w-100 shadow justify-content-center align-items-center d-flex"
                                    style={{
                                        border: "none",
                                        height: "6vh",
                                        minHeight: "50px",
                                        backgroundColor: "#3f73c2"
                                    }} onClick={runCode.bind(this)}>
                                <span style={{color: "#13305d"}}>RUN</span>
                            </Button>
                        </Col>
                        <Col className="col-3">
                            {codeReportId &&
                                <Button className="w-100 shadow justify-content-center align-items-center d-flex"
                                        onClick={submitCode}
                                        style={{
                                            backgroundColor: "#1E4172",
                                            border: "none",
                                            height: "6vh",
                                            minHeight: "50px"
                                        }}>
                                        <span style={{color: "white"}}>SUBMIT <FontAwesomeIcon icon={faGreaterThan}
                                                                                               style={{color: "white"}}/>
                                        </span>
                                </Button>
                            }
                            {!codeReportId &&
                                <Button className="w-100 shadow justify-content-center align-items-center d-flex disabled"
                                        style={{
                                            backgroundColor: "#1E4172",
                                            border: "none",
                                            height: "6vh",
                                            minHeight: "50px"
                                        }}>
                                        <span style={{color: "white"}}>SUBMIT <FontAwesomeIcon icon={faGreaterThan}
                                                                                               style={{color: "white"}}/>
                                        </span>
                                </Button>
                            }
                        </Col>
                    </Row>
                </Col>
                <Col className="m-3 p-3 mb-4 col-4">

                    {!selectedOption &&

                        <Row className="justify-content-right py-4 px-2 d-flex"  style={{minHeight: "50vh", borderRadius: "10px", backgroundColor: "white"}} >
                            <Level1_1 analysisStatus={analysisStatus} steps={steps} codeId={codeReportId}/>
                        </Row>
                    }

                    {selectedOption !== undefined &&
                        <GenericModal content_type={selectedOption} level={currentLevel}
                                      on_option_changed={optionHandler.bind(this)}/>
                    }

                </Col>
            </Row>
        </Container>
    );
};

export default Level;