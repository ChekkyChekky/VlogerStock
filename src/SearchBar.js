import React, { Component } from 'react';


class SearchBar extends Component {


  render() {
      const {textBefore, texttype, searchText, onInptChange, onBtnClick, searchTerm} = this.props;

    return (
          <div className="container">
                  <div className="row">    
                      <h3>
                          <label>{texttype}</label>
                      </h3>
                  </div>
                  <div className="row">
                      <p2>
                            <div className="col-xs-4">
                                <label>{textBefore}</label>
                            </div>
                            <div className="col-xs-4">
                                  <input type="text" onChange={onInptChange} value={searchTerm}></input>
                            </div>
                            <div className="col-xs-3">
                                  <button onClick={onBtnClick}>{searchText}</button>
                            </div>
                     </p2>
                  </div>
          </div>
    );
  }
}

export default SearchBar;
