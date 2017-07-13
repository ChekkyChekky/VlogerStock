import React, { Component } from 'react';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            last: {
                img: '',
                title: ''
            },
            random: {
                img: '',
                title: ''
            }
        }
        this.search = this.search.bind(this);
    }
    
    componentWillMount() {
        var that = this;
        fetch('/last', { method: 'GET' })
            .then((response) => response.json())
            .then(function (responseJson) {
                that.setState({ last: responseJson });
            });
        fetch('/random', { method: 'GET' })
            .then((response) => response.json())
            .then(function (responseJson) {
                that.setState({ random: responseJson });
            });
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
            <div className="col-sm-6" style={{padding: 0, cursor: "pointer"}} onClick={() => this.search(this.state.last.title)}>
                <div className="block search-block left-block">
                    <img className="pull-left logo-chanel" src={this.state.last.img}/>
                    <div className="pull-left title-block">
                        <div className="center-block">
                            <h3>Последний</h3>
                            <h4><b>{this.state.last.title}</b></h4>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-sm-6" style={{padding: 0, cursor: "pointer"}} onClick={() => this.search(this.state.random.title)}>
                <div className="block search-block right-block">
                    <img className="pull-left logo-chanel" src={this.state.random.img}/>
                    <div className="pull-left title-block">                        
                        <h3>Случайный</h3>
                        <h4><b>{this.state.random.title}</b></h4>
                    </div>
                </div>
            </div>
        </div>        
    }
}

export default Search;