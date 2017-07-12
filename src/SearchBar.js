import React, { Component } from 'react';
import Button  from 'react-bootstrap/lib/Button';
import Col  from 'react-bootstrap/lib/Col';
import Form  from 'react-bootstrap/lib/Form';
import FormControl  from 'react-bootstrap/lib/FormControl';
import Label  from 'react-bootstrap/lib/Label';




class SearchBar extends Component {


  render() {
      const {texttype, searchText, onInptChange, onBtnClick, searchTerm} = this.props;

    return (
                  <Form horizontal>
                            <Col sm={2} md={2}>
                                <h4><Label bsStyle="default" bsSize="large">{texttype}</Label></h4>
                            </Col>
                            <Col sm={8} md={7}>
                                <FormControl type="text" bsStyle="success" onChange={onInptChange} value={searchTerm} bsSize="large" ></FormControl>
                            </Col>
                            <Col sm={4} md={3}>
                                <Button type="button" onClick={onBtnClick} bsStyle="danger" bsSize="large" >{searchText}</Button>
                            </Col>
                </Form>
    );
  }
}

export default SearchBar;
