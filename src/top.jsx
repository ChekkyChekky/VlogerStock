import React, { Component } from 'react';

class Top extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: ''
        }
        this.search = this.search.bind(this);
    }

    search() {
        if(this.state.query.length == 0) {
            return;
        }
        this.props.search(this.state.query);
    }

    render() {
        return <div>
            <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
                <div className="container">
                    <div className="navbar-header">
                        <a className="navbar-brand page-scroll"><span style={{ color: "red" }}>VLOG</span>STOCK</a>
                    </div>
                </div>
            </nav>
            <div className="container block" style={{marginTop: "65px"}}>
                <h1>Оцени Youtube-канал в деньгах!</h1>
                <img src="img/top.png"/>
                <h3>Узнай стоимость рекламы у блогеров</h3>
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Вставьте название канала или ссылку" 
                                value={this.state.query} onChange={q => this.setState({query: q.target.value})} />
                            <span className="input-group-btn">
                                <button className="btn btn-danger" type="button" onClick={this.search}>Узнать</button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default Top;