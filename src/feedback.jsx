import React, { Component } from 'react';
import validator from "email-validator";

class Feedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            message: '',
            invalidEmail: false,
            sended: false
        }
        this.send = this.send.bind(this);
    }

    componentDidMount() {
        var that = this;
        Ya.share2('ya', {
                    hooks: {
                        onshare: function (name) {
                            that.ya("share");
                        }
                    }
                })
    }

    ya(goal) {
        try {
            yaCounter45204297.reachGoal(goal);
        } catch (error) {
            
        }        
    }

    send() {
        if (!validator.validate(this.state.email)) {
            this.setState({ invalidEmail: true });
            return;
        }
        fetch('/feedback', {
            method: 'POST',            
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `email=${this.state.email}&message=${this.state.message}&title=${this.props.title}`
        })
        this.setState({ sended: true });
        this.ya("feedback");
    }

    render() {
        if (!this.state.sended) {
            var feedback = <div>
                <h2>Оставь отзыв, если имеешь своё мнение</h2>
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <div className={this.state.invalidEmail ? "has-error" : ""}>
                            <input type="text" className={"form-control"} placeholder="Введите email"
                                value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
                        </div>
                        <textarea className="form-control" rows="3" placeholder="Введите сообщение"
                            value={this.state.message} onChange={e => this.setState({ message: e.target.value })} />
                        <button id="feedback_button" className="btn btn-primary center-block" type="button" onClick={this.send}
                            style={{ marginTop: "5px", width: "100%" }}>Оставить</button>
                    </div>
                </div>
            </div>
        } else {
            var feedback = <h2>Спасибо за отзыв!</h2>
        }


        return <div>
            <div className="container block">
                <h2>Расскажи друзьям, сколько зарабатывают твои любимые блогеры!</h2>
                <div id="ya" data-services="vkontakte,facebook,odnoklassniki,twitter,whatsapp,viber,telegram" data-counter=""></div>
                {feedback}
            </div>
        </div>
    }
}

export default Feedback;