import React, { Component } from 'react';

function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

class ModalDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            success: false,
            budget: 1000,
            niche: '',
            name: '',
            email: '',
            isValidBudget: true,
            isValidNiche: true,
            isValidName: true,
            isValidEmail: true
        };
        this.closed = this.closed.bind(this);
        this.send = this.send.bind(this);
    }

    closed(e) {
        if(e.currentTarget===e.target) {
            this.setState({success: false});
            this.props.closed();
        }
    }

    send() {
        this.state.budget <= 0 ? this.setState({isValidNiche: false}) : this.setState({isValidNiche: true});
        this.state.niche.length < 2 ? this.setState({isValidNiche: false}) : this.setState({isValidNiche: true});
        this.state.name.length < 3 ? this.setState({isValidName: false}) : this.setState({isValidName: true});
        !validateEmail(this.state.email) ? this.setState({isValidEmail: false}) : this.setState({isValidEmail: true});

        if(this.state.budget > 0 && this.state.niche.length >= 2 && 
            this.state.name.length >= 3 && validateEmail(this.state.email)) {
            this.setState({success: true});
            var result = this.props.result;
            var body = 
                `name=${this.state.name}&budget=${this.state.budget}&niche=${this.props.niche}&email=${this.props.email}`
            fetch('/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: body
            })
        }
    }

    render() {
        if(!this.state.success) {
            var modalBody = <div className="modal-body">
                            <div className={this.state.isValidBudget?"form-group":"form-group has-error"}>
                                <label className="modal-label">Ваше бюджет</label>
                                <input type="number" className="form-control center-block" placeholder="1000" value={this.state.budget} onChange={e => this.setState({budget: e.target.value})}/>
                            </div>
                            <div className={this.state.isValidNiche?"form-group":"form-group has-error"}>
                                <label className="modal-label">Ваша ниша </label>
                                <input type="text" className="form-control center-block" placeholder="Организация праздников" value={this.state.niche} onChange={e => this.setState({niche: e.target.value})}/>
                            </div>
                            <div className={this.state.isValidName?"form-group":"form-group has-error"}>
                                <label className="modal-label">Ваше имя</label>
                                <input type="text" className="form-control center-block" placeholder="Иван" value={this.state.name} onChange={e => this.setState({name: e.target.value})}/>
                            </div>
                            <div className={this.state.isValidEmail?"form-group":"form-group has-error"}>
                                <label className="modal-label">Email</label>
                                <input type="email" className="form-control center-block" placeholder="example@mail.ru" value={this.state.email} onChange={e => this.setState({email: e.target.value})}/>
                            </div>
                        </div>

            var footer = <div className="modal-footer">
                            <button type="button" className="btn btn-success center-block" onClick={this.send}>Отправить</button>
                        </div>
        } else {
            var modalBody = <div className="modal-body">
                            <h2>Заявка принята, с вами свяжутся в ближайшее время!</h2>
                        </div>
            var footer = <div className="modal-footer">
                            <button type="button" className="btn btn-success center-block" onClick={this.props.closed}>Закрыть</button>
                        </div>
        }

        return (
            <div hidden={!this.props.open}>
                <div className="modal-backdrop fade in" onClick={e => this.closed(e)}></div>
                <div className="modal fade in" style={{ display: "block", marginTop: "20vh" }} onClick={e => this.closed(e)}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={e => this.closed(e)}>&times;</button>
                                <h4 className="modal-title">Оставьте заявку</h4>
                            </div>
                            {modalBody}
                            {footer}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalDialog;