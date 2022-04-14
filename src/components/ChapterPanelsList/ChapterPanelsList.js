import React from "react";
import {Card, Col} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import {faGreaterThan, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export class ChapterPanelsList extends React.Component {

    chaptersList = [{"id": "0", "title": "1. Introduction", "levels": [{"id": "0", "nLv": 1.1, "title": 'Hello World'}]},
        {"id": "1", "title": "2. Object-Oriented Programming Concepts", "levels":
                [{"id": "1", "nLv": 2.1, "title": 'Objects'}, {"id": "2", "nLv": 2.2, "title": 'Classes'}, {"id": "3", "nLv": 2.3, "title": 'Inheritance'},
                    {"id": "4", "nLv": 2.4, "title": 'More on Classes'}, {"id": "5", "nLv": 2.5, "title": 'Nested Classes'}]},
        {"id": "2", "title": "3. Annotations", "levels":
                [{"id": "6", "nLv": 3.1, "title": 'Basics'}, {"id": "7", "nLv": 3.2, "title": 'Predefined Annotation Types'}]},
        {"id": "3", "title": "4. Interfaces and Inheritance", "levels":
                [{"id": "8", "nLv": 4.1, "title": 'Defining an Interface'}, {"id": "9", "nLv": 4.2, "title": 'Implementing an Interface'}, {"id": "10", "nLv": 4.3, "title": 'Using an Interface as a Type'}]},
        {"id": "4", "title": "5. Numbers and Strings", "levels": []},

    ];

    constructor(props) {

        super(props);
        this.state = {
            chapters: this.chaptersList,
            selectedChapter: undefined
        };

    }

    chapterPanelClicked(chapter) {
        this.setState({ selectedChapter: chapter });
        if (this.props.on_chapter_changed !== undefined)
            this.props.on_chapter_changed(chapter);
    }

    render() {

        let chapters = this.state.chapters;

        let chapterPanels = [];

        for (let chapterIdx in chapters) {

            let chapter = chapters[chapterIdx];
            if (this.state.selectedChapter !== undefined && chapter.id === this.state.selectedChapter.id) {
                chapterPanels.push(
                    <Card className="shadow p-3 mb-3 rounded text-center" style={{backgroundColor: "#4b86e0", border: "none"}} onClick={this.chapterPanelClicked.bind(this, chapter)}>
                        <Row className="align-items-center d-flex">
                            <Col className="col-9">
                                <span style={{fontSize: "0.8vw", color: "white"}}>{chapter.title}</span>
                            </Col>
                            <Col className="me-3">
                                <FontAwesomeIcon  icon={faGreaterThan} style={{color: "white"}} />
                            </Col>
                        </Row>
                    </Card>
                )
            } else {
                chapterPanels.push(
                    <Card className="shadow p-3 mb-3 rounded text-center" onClick={this.chapterPanelClicked.bind(this, chapter)}>
                       <Row className="align-items-center d-flex">
                           <Col className="col-9">
                               <span style={{fontSize: "0.8vw", color: "#1E4172"}}>{chapter.title}</span>
                           </Col>
                           <Col className="me-3">
                               <FontAwesomeIcon  icon={faGreaterThan} style={{color: "#1E4172"}} />
                           </Col>
                       </Row>

                    </Card>
                )
            }
        }

        return(
           <Col className="col-3">
               {chapterPanels}
           </Col>
        );
    }
}