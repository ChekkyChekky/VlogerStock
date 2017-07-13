import React, { Component } from 'react';

class Search extends Component {
    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
    }

    search(query) {
        this.props.search(query);
        this.ya("search")
    }

    ya(goal) {
        try {
            yaCounter45204297.reachGoal(goal);
        } catch (error) {
            
        }        
    }

    render() {
        return <div className="container">
            <div className="col-sm-6" style={{padding: 0, cursor: "pointer"}} onClick={() => this.search("ДНЕВНИК ХАЧА")}>
                <div className="block search-block left-block">
                    <img className="pull-left logo-chanel" src="https://yt3.ggpht.com/-HzlTfgPLl6U/AAAAAAAAAAI/AAAAAAAAAAA/2aFSThc1OMM/s240-c-k-no-mo-rj-c0xffffff/photo.jpg"/>
                    <div className="pull-left title-block">
                        <div className="center-block">
                            <h3>Последний</h3>
                            <h4><b>ДНЕВНИК ХАЧА</b></h4>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-sm-6" style={{padding: 0, cursor: "pointer"}} onClick={() => this.search("Иван гай")}>
                <div className="block search-block right-block">
                    <img className="pull-left logo-chanel" src="https://yt3.ggpht.com/-ZPtgaY_lFDY/AAAAAAAAAAI/AAAAAAAAAAA/U_8gJcnIMiE/s240-c-k-no-mo-rj-c0xffffff/photo.jpg"/>
                    <div className="pull-left title-block">                        
                        <h3>Случайный</h3>
                        <h4><b>Иван гай</b></h4>
                    </div>
                </div>
            </div>
        </div>        
    }
}

export default Search;