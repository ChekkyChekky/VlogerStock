import React, { Component } from 'react';
import Grid  from 'react-bootstrap/lib/Grid';
import Nav from 'react-bootstrap/lib/Nav';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavItem  from 'react-bootstrap/lib/NavItem';

class SearchBar extends Component {


  render() {
      const {texttype, searchText, onInptChange, onBtnClick, searchTerm} = this.props;

    return (
          <div className="container">
                  <div className="row py1">    
                      <h3>
                          <label>{texttype}</label>
                      </h3>
                  </div>
                  <div className="row py2">
                      <p2>

                            <div className="col-xs-6">
                                  <input type="text" onChange={onInptChange} value={searchTerm}></input>
                            </div>
                            <div className="col-xs-6">
                                  <button onClick={onBtnClick} >{searchText}</button>
                            </div>
                     </p2>
                  </div>
          </div>
    );
  }
}

export default SearchBar;



 /*                           <div className="col-xs-4">
                                <label>{textBefore}</label>
                            </div>
*/