import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Row  from 'react-bootstrap/lib/Grid';
import Col  from 'react-bootstrap/lib/Col';
import Image  from 'react-bootstrap/lib/Image';
import Nav  from 'react-bootstrap/lib/Nav';
import Label  from 'react-bootstrap/lib/Label';

import SearchBar from './modules/SearchBar'
import ModalError from './modules/ModalError'
import CostCalc from './modules/CostCalc'
import ChannelStatisticsBar from './modules/ChannelStatisticsBar'
import EmailSenderBar from './modules/EmailSenderBar.js'
//import Advert from './Advert.jsx'

//import YTSearchTerm from './logics/youtube-api-search-term';
import YTChannels from './logics/youtube-api-channels';
import YTChannelsFromName from './logics/youtube-api-channels-by-username';
//import YTVideos from './logics/youtube-api-videos'; 
//import YTPlaylists from './logics/youtube-api-playlists'; 

var validator = require("email-validator");


const API_KEY = 'AIzaSyArh26s8VejK8o2prCiV9oCYDIw6SEcsPY';



// create reusable transporter object using the default SMTP transport

class IndexComp extends Component {


    constructor(props) {
        super();

        this.state = {
            searchTerm: '',
        /*----------------------*/
            ChannelData: null,
            channelID: '',
            channelName: '',
        /*----------------------*/
            emailToSend: null,
            emailError: false,
            emailSuccess: false
        };
    }


    handleEmailPost() {

        if(validator.validate(this.state.emailToSend)){
        const channelTitle = this.state.ChannelData;
        var data = JSON.stringify(
            {
                email:
                {
                      mail: this.state.emailToSend,
                      channel: channelTitle
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
    
            xhr.open("POST", "https://vlogstock-a0fe.restdb.io/rest/bloggeremails");
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

     handleSearchPost() {

        var data = JSON.stringify(
            {
                search:
                {
                      term: this.state.channelID,
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
    
            xhr.open("POST", "https://vlogstock-a0fe.restdb.io/rest/searchesdata");
            xhr.setRequestHeader("content-type", "application/json");
            xhr.setRequestHeader("x-apikey", "595cca7bafce09e87211ea27");
            xhr.setRequestHeader("cache-control", "no-cache");

            xhr.send(data);

    }

    handleEmailError(){
        this.setState({emailError : false});
    }

    handleEmailSuccess(){
        this.setState({emailSuccess : false});
        this.setState({ChannelData: null});
    }

    /*-----------------CHANNELS API*/

    handleGetChannelDetailsStrictID(channelID){
        YTChannels({key: API_KEY, id: channelID}, 
                    (data) => {  
                    if(data)
                    {   
                        this.setState({ChannelData: data});
                        //this.setState({channelName: data.snippet.title});
                    }
                    //this.handleGetPlaylistsDetails({channelID : data.snippet.id});
                    //this.handleGetActivitiesDetails({channelID: data.snippet.id});
                });
        this.setState({searchTerm: ''});
    }

    handleGetChannelDetailsFromName(channelName) {
      YTChannelsFromName({key: API_KEY, forUsername: channelName}, 
                (data) => {     
                    this.setState({ChannelData: data});
                    //this.setState({channelID: data.snippet.id});
                //this.handleGetPlaylistsDetails({channelID : data.snippet.id});
                //this.handleGetActivitiesDetails({channelID: data.snippet.id});
              });
       if(!this.ChannelData)
                {
                    this.handleGetChannelDetailsStrictID(channelName);
                }
       this.setState({searchTerm: ''});
       
    }



    handleGetChannelDetails(channelID) {
        if(channelID === "")
        {
            this.setState({ChannelData: null});
        }
      this.handleSearchPost();
      const indexOfSlash = channelID.lastIndexOf('/'); 
      const BeforeId = channelID.slice(0, indexOfSlash); // 'https://www.youtube.com/channel'
      const SecondindexOfSlash = BeforeId.lastIndexOf('/');
      const typeSearch = BeforeId.slice(SecondindexOfSlash+1);// user or channel
      const ID = channelID.slice(indexOfSlash+1);
      if(typeSearch === 'channel')
      {
      
        YTChannels({key: API_KEY, id: ID}, 
                    (data) => {     
                    this.setState({ChannelData: data});
                    //this.setState({channelName: data.snippet.title});
                    //this.handleGetPlaylistsDetails({channelID : data.snippet.id});
                    //this.handleGetActivitiesDetails({channelID: data.snippet.id});
                });
        this.setState({searchTerm: '', channelID: ID});
      } else {
          this.handleGetChannelDetailsFromName(ID);
      }
       
    }

    handleInputChannelsChange(key, event) {
        this.setState({[key] : event.target.value});
    }

    handleInputEmailChange(key, event) {
        this.setState({[key] : event.target.value});
    }


/*
     handleInputChannelsNameChange(key, event) {
        this.setState({[key] : event.target.value});
    }
*/
    /*-----------------CHANNELS API*/
 

    render() {
    const {searchTerm, ChannelData, channelID, channelName, emailToSend, emailError, emailSuccess} = this.state;
    
     return (
            <div>
                        <Row> 
                            <Col xs={10} sm={8} md={8} lg={6} xsOffset={1} >
                                <SearchBar 
                                    searchText="ОК"
                                    onInptChange={this.handleInputChannelsChange.bind(this, 'channelID')}
                                    onBtnClick={this.handleGetChannelDetails.bind(this, channelID)}
                                    value={channelID}
                                />
                            </Col>
                        </Row>

                            {(ChannelData && !emailError && !emailSuccess) ? 
                                (
                                                                    
                                    <div>
                                        { ChannelData.map((channel, index) => {
                                            let bmHumor = false;
                                            {(channel.snippet.title == "Бизнес Молодость") ?
                                                (
                                                  bmHumor = true
                                                ) : null
                                            }
                                                return (
                                                        <Nav className="myOtstup" key={index}>
                                                            <Row>
                                                                <Col xs={12} sm={12} md={9} lg={8}>
                                                                <h2>Итоги расчета стоимости: {channel.snippet.title}</h2>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                    <Col xs={12} sm={12} md={9} lg={8}>
                                                                        <Image rounded src={channel.snippet.thumbnails.medium.url}
                                                                                 alt="video-img"
                                                                        circle />
                                                                    </Col>
                                                            </Row >
                                                            <Row className="myMiniOtstup">
                                                                    <Col xs={12} sm={12} md={10} lg={8}>
                                                                        <CostCalc
                                                                                viewsSum = {channel.statistics.viewCount}
                                                                                videosSum = {channel.statistics.videoCount}
                                                                                commentsSum={channel.statistics.commentCount}
                                                                                subsSum={channel.statistics.subscriberCount}
                                                                                bmHumor = {bmHumor}
                                                                                value=""
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                                <Row className="myMiniOtstup">
                                                                    <Col xs={12} sm={12} md={10} lg={8}>
                                                                            <h2>Я владелец этого канала и готов размещать рекламу по такой цене</h2>
                                                                    </Col>
                                                                </Row>
                                                                <Row className="myMiniOtstup">
                                                                    <Col xs={10} sm={8} md={8} lg={6} xsOffset={1}>
                                                                            <EmailSenderBar 
                                                                            sendText="Да"
                                                                            onInptChange={this.handleInputEmailChange.bind(this, 'emailToSend')}
                                                                            onBtnClick={this.handleEmailPost.bind(this, emailToSend)}
                                                                            value={emailToSend}
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                                
                                                        </Nav>
                                                    );
                                                }) 
                                        }
                                    </div>
                                ) : null

                                        
                            }
                            <div>
                                            {(!emailError && !ChannelData) ?
                                            (
                                                    <Row>
                                                        <Col xs={10} sm={8} md={8} lg={6}>
                                                            <h5 className="myMiniOtstup"><Label>Поддерживаемые форматы ввода:</Label></h5>
                                                            <h5 className="myMiniOtstup"><Label className="myMiniOtstup" bsStyle="success" bsSize="sm">идентификатор Канала, например, UCL8ZULXASCc1I_oaOT0NaOQ</Label></h5>
                                                            <h5 className="myMiniOtstup"><Label bsStyle="success" bsSize="sm">имя Пользователя, например, Google</Label></h5>
                                                            <h5 className="myMiniOtstup"><Label bsStyle="success" bsSize="sm">.../channel/идентификатор Канала</Label></h5>
                                                            <h5 className="myMiniOtstup"><Label bsStyle="success" bsSize="sm">.../user/им Пользователя</Label></h5>
                                                        </Col>
                                                    </Row>
                                             ) : null
                                            }
                            </div>
                            {emailError ? 
                            
                                                                (
                                                                        <Row className="myMiniOtstup">
                                                                            <Col xs={10} sm={7} md={7} lg={5} xsOffset={1}>
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
                            {emailSuccess ? 
                                                                (
                                                                     <Row className="myMiniOtstup">
                                                                        <Col xs={10} sm={7} md={7} lg={5} xsOffset={1} >
                                                                                <ModalError
                                                                                        textError = "Вы добавлены в базу!"
                                                                                        onBtnClick={this.handleEmailSuccess.bind(this)}
                                                                                        buttonText="Вы добавлены в базу!"
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

export default IndexComp;