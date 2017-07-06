import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Row  from 'react-bootstrap/lib/Grid';
import Col  from 'react-bootstrap/lib/Col';
import Image  from 'react-bootstrap/lib/Image';
import Nav  from 'react-bootstrap/lib/Nav';
import Label  from 'react-bootstrap/lib/Label';
import Button  from 'react-bootstrap/lib/Button';


import LabelTextBar from './modules/LabelTextBar.js'
import EmailSenderBar from './modules/EmailSenderBar.js'
import ModalError from './modules/ModalError'

var validator = require("email-validator");


class Advert extends Component {


    constructor(props) {
        super();

        this.state = {
            productName: '',
            budget: '',
            ohvat: '',
        /*----------------------*/
            emailToSend: null,
            emailError: false,
            emailSuccess: false,
            buttonClick: false,
            validateData: false
        };
    }


    handleAdvertisingPost() {

        if(validator.validate(this.state.emailToSend)){
        const channelTitle = this.state.ChannelData;
        var data = JSON.stringify(
            {
                advert:
                {
                      productName: this.state.productName,
                      budget: this.state.budget,
                      ohvat: this.state.ohvat,
                      email: this.state.emailToSend
                }
            }
            );


            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                console.log(this.responseText);
                }
            });
    
            xhr.open("POST", "https://vlogstock-a0fe.restdb.io/rest/advertizers");
            xhr.setRequestHeader("content-type", "application/json");
            xhr.setRequestHeader("x-apikey", "595cca7bafce09e87211ea27");
            xhr.setRequestHeader("cache-control", "no-cache");

            xhr.send(data);

            this.setState({emailSuccess : true});
        }
        else{
            this.setState({emailError : true});
        }
            

    }
     
    handleEmailError(){
        this.setState({emailError : false});
    }

    handleEmailSuccess(){
        this.setState({emailSuccess : false});
        this.setState({buttonClick : false});
        this.setState({validateData : false});
        
    }


    handleInputChange(key, event) {
        this.setState({[key] : event.target.value});
    }

    handleInputEmailChange(key, event) {
        this.setState({[key] : event.target.value});
    }

    handleButtonAdvDown(){
        this.setState({buttonClick: true});
        this.setState({emailToSend: '333'});
        this.validateBudgetAndOhvat();
        console.log(this.state);
    }

    validateBudgetAndOhvat(){
        /*if()
        this.setState.state({validate: true})*/
        this.setState({validateData: true});
    }

    render() {
    const {productName, budget, ohvat, emailToSend, emailError, emailSuccess, buttonClick, validateData} = this.state;
    
     return (
            <div>


                        <Row className="myMiniOtstup"> 
                            <Col xs={10} sm={8} md={8} lg={6} xsOffset={1} >
                                <LabelTextBar
                                    labelText = "Продукт/услуга"
                                    value = {productName}
                                    onInptChange={this.handleInputChange.bind(this, 'productName')}
                                    placeholderText = "Введите свой продукт или услугу"
                                />
                            </Col>
                        </Row>
                        <Row className="myMiniOtstup"> 
                            <Col xs={10} sm={8} md={8} lg={6} xsOffset={1} >
                                <LabelTextBar
                                    labelText = "Бюджет, тыс. руб."
                                    value = {budget}
                                    onInptChange={this.handleInputChange.bind(this, 'budget')}
                                    placeholderText = "Введите примерный бюджет"
                                />
                            </Col>
                        </Row>
                        <Row className="myMiniOtstup"> 
                            <Col xs={10} sm={8} md={8} lg={6} xsOffset={1} >
                                <LabelTextBar
                                    labelText = "Охват, просмотров"
                                    value = {ohvat}
                                    onInptChange={this.handleInputChange.bind(this, 'ohvat')}
                                    placeholderText = "Введите требуемый охват"
                                />
                            </Col>
                        </Row>
                        
                        {(!emailError && !emailSuccess && !buttonClick) ?
                        (
                        <Row className="myMiniOtstup"> 
                            <Col xs={11} sm={8} md={8} lg={6} xsOffset={1} >
                                 <Button type="button" onClick={this.handleButtonAdvDown.bind(this)} bsStyle="danger" bsSize="large">
                                 Получить список блогеров
                                </Button>
                            </Col>
                        </Row>
                        ) : null
                        }
                            {buttonClick && validateData ?
                                (
                                    <div>
                                                {(!emailError && !emailSuccess) ? 
                                                    (
                                                                                        
                                                        <div>
                                                                                    <Row className="myMiniOtstup">
                                                                                        <Col xs={12} sm={12} md={10} lg={8}>
                                                                                                <h2>Куда отправить список блогеров?</h2>
                                                                                        </Col>
                                                                                    </Row>
                                                                                    <Row className="myMiniOtstup">
                                                                                        <Col xs={10} sm={8} md={8} lg={6} xsOffset={1}>
                                                                                                <EmailSenderBar 
                                                                                                sendText="Сюда"
                                                                                                onInptChange={this.handleInputEmailChange.bind(this, 'emailToSend')}
                                                                                                onBtnClick={this.handleAdvertisingPost.bind(this, emailToSend)}
                                                                                                value={emailToSend}
                                                                                            />
                                                                                        </Col>
                                                                                    </Row>
                                                        </div>
                                                    ) : null

                                                            
                                                }

                                                {emailError ? 
                                                
                                                                                    (
                                                                                            <Row className="myMiniOtstup">
                                                                                                <Col xs={10} sm={7} md={7} lg={5} xsOffset={1} lgOffset={1}>
                                                                                                        <ModalError
                                                                                                                textError = "Неверный формат e-mail"
                                                                                                                onBtnClick={this.handleEmailError.bind(this)}
                                                                                                                buttonText="Неверный e-mail. Ввести заново"
                                                                                                        />
                                                                                                </Col >
                                                                                        </Row>
                                                                                    ):
                                                                                    null
                                                }
                                    </div>
                                ): null
                            }
                            {buttonClick && !validateData ?
                                (
                                    <div>
                                    </div>
                                ): null
                            }
                            {emailSuccess ? 
                                                                (
                                                                     <Row className="myMiniOtstup">
                                                                        <Col xs={10} sm={7} md={7} lg={5} xsOffset={1} >
                                                                                <ModalError
                                                                                        textError = "Ваша заявка принята!"
                                                                                        onBtnClick={this.handleEmailSuccess.bind(this)}
                                                                                        buttonText="Ваша заявка принята!"
                                                                                />
                                                                         </Col >
                                                                      </Row>
                                                                ):
                                                                null
                            }
            
            </div>
            );

    }
}

export default Advert;
/*
ReactDOM.render(
    <App />,
    document.getElementById("advert")
)
*/
