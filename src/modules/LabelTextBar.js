import React, { Component } from 'react';
import Button  from 'react-bootstrap/lib/Button';
import Col  from 'react-bootstrap/lib/Col';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import Row  from 'react-bootstrap/lib/Row';
import Label  from 'react-bootstrap/lib/Label';



class LabelTextBar extends Component {


  render() {
      const {labelText, searchTerm, onInptChange, placeholderText} = this.props;
      const idForm = "LabelTextID" + labelText + "";

    return (
        
                    <Form horizontal id={idForm}>
                        <Col sm={4} md={4} xs ={4} lg={4}>
                                <h5>
                                 <Label bsStyle="default" bsSize="large">
                                 {labelText}
                                </Label>
                                </h5>
                        </Col>
                        <Col sm={8} md={8} xs={8} lg={8}>
                                <FormControl type="text" bsStyle="default" bsSize="large"
                                onChange={onInptChange}
                                value={searchTerm}  
                                placeholder={placeholderText}
                        />
                        </Col>
                        
                    </Form>
                
    );
  }
}

export default LabelTextBar;
