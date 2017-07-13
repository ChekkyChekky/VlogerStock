import React, { Component } from 'react';
import ModalDialog from './modal';

class Top extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            modalOpen: false
        }
        this.search = this.search.bind(this);
    }

    search() {
        if(this.state.query.length == 0) {
            return;
        }
        this.props.search(this.state.query);
        this.ya("search")
    }

    ya(goal) {
        try {
            yaCounter45204297.reachGoal(goal);
        } catch (error) {
            
        }        
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
                    <div className="col-md-8 col-md-offset-2">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Название канала или ссылка" 
                                value={this.state.query} onChange={q => this.setState({query: q.target.value})}
                                onKeyPress={e => {if(e.charCode === 13) this.search()}} />
                            <span className="input-group-btn">
                                <button id="search_button" className="btn btn-success" type="button" onClick={this.search}>Узнать</button>
                            </span>
                        </div>
                    </div>
                </div>
                <button id="order_button" className="btn btn-primary" type="button" style={{marginTop: "20px"}}
                    onClick={() => this.setState({modalOpen: true})}>Заказать рекламу</button>
            </div>
            <ModalDialog open={this.state.modalOpen} closed={() => this.setState({modalOpen: false})}/>
        </div>
    }
}

export default Top;