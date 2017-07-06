import React, { Component } from 'react';
import Button  from 'react-bootstrap/lib/Button';
import Col  from 'react-bootstrap/lib/Col';
import Row  from 'react-bootstrap/lib/Row';
import Label  from 'react-bootstrap/lib/Label';




class ModalError extends Component {


  render() {
      const {onBtnClick, textError, buttonText} = this.props;

    return (
                    <div className="static-modal" id="ModalErrorID">
                      <Row>
                        <Col sm={12} md={12} xs={12} lg={12} minWidth="250">
                                 <Button type="button" onClick={onBtnClick} bsStyle="warning" bsSize="large">
                                 {buttonText}
                                </Button>
                        </Col>
                      </Row>
                    </div>
                
    );
  }
}

export default ModalError;

