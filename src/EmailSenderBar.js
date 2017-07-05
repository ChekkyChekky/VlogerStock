import React, { Component } from 'react';
import Button  from 'react-bootstrap/lib/Button';
import Col  from 'react-bootstrap/lib/Col';
import Form  from 'react-bootstrap/lib/Form';
import FormControl  from 'react-bootstrap/lib/FormControl';
import Label  from 'react-bootstrap/lib/Label';




class EmailSenderBar extends Component {


  render() {
      const {sendText, onBtnClick, emailToSend, onInptChange} = this.props;

    return (
                    <Form horizontal id="emailSendID">
                        <Col sm={10} md={10} xs={10} lg={8}>
                                <FormControl type="text" bsStyle="default" bsSize="large"
                                onChange={onInptChange}
                                value={emailToSend}  
                                placeholder="Введите e-mail-адрес" />
                        </Col>
                        <Col sm={1} md={1} xs ={1} lg={1}>
                                 <Button type="button" bsStyle="warning" bsSize="large"
                                 onClick={onBtnClick}
                                 >
                                 {sendText}
                                </Button>
                        </Col>
                    </Form>
                
    );
  }
}

export default EmailSenderBar;