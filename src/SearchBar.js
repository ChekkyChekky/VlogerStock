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
                        <Col sm={10} md={10} xs={10} lg={8}>
                                <FormControl type="text" bsStyle="default" bsSize="large"
                                 onChange={onInptChange}
                                value={searchTerm}  
                                placeholder="Введите адрес YouTube-канала" />
                        </Col>
                        <Col sm={1} md={1} xs ={1} lg={1}>
                                 <Button type="button" onClick={onBtnClick} bsStyle="danger" bsSize="large"
                                 >{searchText}

                                </Button>
                        </Col>
                    </Form>
                
    );
  }
}

export default SearchBar;