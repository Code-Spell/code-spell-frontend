import React from "react";
import {Card, FormSelect} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const CategorySelect = (props) => {

    const categoryUpdated = (event) => {
        let category = event.target.value;
        if (props.on_category_changed !== undefined)
            props.on_category_changed(category);
    };

    return (
        <Col className="col-3">
            <Card className="shadow w-100 px-4 pt-4 pb-5">
                               <span className="mb-3" style={{color: "#2e78e1", fontSize: "1.6vh", fontWeight: "bold", textTransform: "uppercase"}}>
                                   <FontAwesomeIcon  icon={faStar} style={{color: "#2e78e1"}} /> Category</span>
                <FormSelect onChange={categoryUpdated.bind(this)}>
                    <option>---</option>
                    <option key={0} value={"Overall"}>Overall</option>
                    <option key={1} value={"Chapter"}>Chapter</option>
                    <option key={2} value={"Level"}>Level</option>
                </FormSelect>
            </Card>
        </Col>
    );
};

export default CategorySelect;