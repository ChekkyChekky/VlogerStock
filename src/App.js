import React, { Component } from 'react';
import "bootswatch/united/bootstrap.css";

import SearchBar from './SearchBar'
import CostCalc from './CostCalc'

import YTSearchTerm from './youtube-api-search-term';
import YTChannels from './youtube-api-channels';
import YTChannelsFromName from './youtube-api-channels-by-username';
import YTVideos from './youtube-api-videos'; 
import YTPlaylists from './youtube-api-playlists'; 
//import YTActivities from './youtube-api-activities'

const API_KEY = 'AIzaSyArh26s8VejK8o2prCiV9oCYDIw6SEcsPY';

class App extends Component {

    constructor(props) {
        super();

        this.state = {
            searchTerm: '',
            videos: [],
            selectedVideo: null,
        /*----------------------*/
            ChannelData: null,
            channelID: '',
            channelName: '',
        /*----------------------*/
            videoData: null,
            videoID: '',
            videoId_Array: [], 
            videoDataArray: [],   
        /*----------------------*/
            playlistData: null,  
            playlistID: '',   
        /*----------------------*/
            activitiesData: null,
        /*----------------------*/
        };
    }

    /*-----------------SEARCH API*/
    handleGetVideos(searchTerm) {
      YTSearchTerm({key: API_KEY, term: searchTerm, maxResults: 50}, 
                    (data) => {   
                    
                    this.setState({videos: data});
                    const video = data[0];
                    const videoUrl = `https://www.youtube.com/embed/${video.id.videoId}`;
                    this.handleSelectVideo(videoUrl);
                });  
    this.setState({ChannelData: null, channelID: '', videoData: null, videoID: ''})    
    }
 
    handleInputChange(key, event) {
        this.setState({[key] : event.target.value});
    }

    handleSelectVideo(videoUrl) {
        this.setState({selectedVideo: videoUrl})
    }


    /*-----------------SEARCH API*/

    /*-----------------PLAYLISTS API*/
     handleGetPlaylistsDetails(channelID) {
      YTPlaylists({key: API_KEY, channelID: channelID, maxResults: 50}, 
                (data) => {  
                this.setState({playlistData: data});
              });

        this.setState({selectedVideo: null, videos: [], searchTerm: '', videoData: null, videoID: ''})
    }

    /*-----------------PLAYLISTS API*/
    
    /*-----------------CHANNELS API*/
    handleGetChannelDetails(channelID) {
      const indexOfSlash = channelID.lastIndexOf('/');
      const ID = channelID.slice(indexOfSlash+1);
      console.log(ID);
      YTChannels({key: API_KEY, id: ID}, 
                (data) => {     
                this.setState({ChannelData: data});

                this.setState({channelName: data.Snippet.title});

                this.handleGetPlaylistsDetails({channelID : data.Snippet.id});
                this.handleGetActivitiesDetails({channelID: data.Snippet.id});
              });
       this.setState({selectedVideo: null, videos: [], searchTerm: '', videoData: null, videoID: '', channelID: ID});
       
    }

    handleInputChannelsChange(key, event) {
        this.setState({[key] : event.target.value});
    }

    handleGetChannelDetailsFromName(channelName) {
      YTChannelsFromName({key: API_KEY, forUsername: channelName}, 
                (data) => {     
                this.setState({ChannelData: data});

                this.setState({channelID: data.Snippet.id});

                this.handleGetPlaylistsDetails({channelID : data.Snippet.id});
                this.handleGetActivitiesDetails({channelID: data.Snippet.id});
              });
       this.setState({selectedVideo: null, videos: [], searchTerm: '', videoData: null, videoID: ''});
       
    }

     handleInputChannelsNameChange(key, event) {
        this.setState({[key] : event.target.value});
    }

    /*-----------------CHANNELS API*/

     /*-----------------VIDEOS API*/
    handleGetVideoDetails(videoID) {
      YTVideos({key: API_KEY, id: videoID}, 
                (data) => {     
                this.setState({videoData: data});
              });
        this.setState({selectedVideo: null, videos: [], searchTerm: '', ChannelData: null, channelID: ''});

    }

    GetVideoArrayDetails(videoID) {
      YTVideos({key: API_KEY, id: videoID}, 
                (data) => { 
                let newArray = this.state.videoDataArray.slice();    
                newArray.push(data);   
                this.setState({videoDataArray: newArray});       
              });
        this.setState({selectedVideo: null, videos: [], searchTerm: '', ChannelData: null, channelID: ''});

    }

    handleInputVideosChange(key, event) {
        this.setState({[key] : event.target.value});
    }
    /*-----------------VIDEOS API*/

    handleResetClick() {
             this.setState({ChannelData: null});
    }

  /*  handleMarketCalcstartClick() {
             this.setState({isMarketStartCalc: true});
    }

    handleMarketCalcStopClick() {
             this.setState({isMarketStartCalc: false});
    }*/
    /*-----------------VIDEOS API*/

    /*-----------------ACTIVITIES API*/
 /*   handleGetActivitiesDetails(channelID) {
      YTActivities({key: API_KEY, channelID: channelID, maxResults: 50}, 
                (data) => {  
                this.setState({activitiesData: data});

                {data.map
                    ((activity, index) => 
                    {
                        let newArray = this.state.videoId_Array.slice();    
                        newArray.push(data.contentDetails.videoId);   
                        this.setState({videoId_Array: newArray});
                    }
                    )
                }

              });

        this.setState({selectedVideo: null, videos: [], searchTerm: '', videoData: null, videoID: ''});
    }*/
    /*-----------------ACTIVITIES API*/

    /*--------------------------------*/
   /* downloadVideosDataById(){
        let newArray = this.state.videoId_Array.slice(); 
        {newArray.map
                    ((currvideoID, index) => 
                    {
                        GetVideoArrayDetails({videoID: currvideoID});
                    }
                    )
        }
    }*/
    
    /*-------------------------------*/

    render() {
    const {searchTerm, videos, selectedVideo, ChannelData, channelID, channelName, videoID, videoId_Array, videoData, playlistData, activitiesData} = this.state;
    
     return (
                    
                    <div className="fluid-container">     
                         
                        <div className="row">
                            <div className="container">
                                    <div className="h1" align="center">
                                                <div className="col-xs" Color="lightblue">
                                                        Стоимость рекламы на Youtube
                                                </div>
                                    </div> 
                            </div>
                        </div>
                        <div className="row"> 
                                <SearchBar 
                                    texttype="Введите адрес канала"
                                    searchText="Рассчитать стоимость рекламы"
                                    onInptChange={this.handleInputChannelsChange.bind(this, 'channelID')}
                                    onBtnClick={this.handleGetChannelDetails.bind(this, channelID)}
                                    value={channelID}
                                />
                        </div>
 
                        <div className="row">
                            <div className="clearfix">
                            {selectedVideo ? 
                                (
                                <div className="col col-8 px1 py2">
                                <iframe width="1024" height="768" src={selectedVideo} frameBorder="0" title="selectedVideo" allowFullScreen></iframe> 
                                </div>
                                ) : null}
                            
                            {ChannelData ? 
                                (
                                <div className="clearfix">
                                    <div className="container">
                                        {ChannelData.map((channel, index) => {
                                                const publishedCut = channel.snippet.publishedAt.slice(0,10);
                                        
                                                return (
                                                    <div className = "row">   
                                                        <div className="col-xs-6">         
                                                            <div key={index}>
                                                                <h1>Канал : {channel.snippet.title}</h1>

                                                                <img src={channel.snippet.thumbnails.medium.url}
                                                                    width="250" height="150" alt="video-img"
                                                                ></img> 

                                                                {channel.snippet.description ? 
                                                                (    
                                                                    <div>     
                                                                        <h3> Описание канала: </h3><div>{channel.snippet.description}</div>
                                                                    </div>
                                                                ) : null}
                                                                {channel.snippet.country ? 
                                                                (    
                                                                    <div>                                                                 
                                                                        <h3> Страна:</h3><div> {channel.snippet.country}</div>
                                                                    </div>                                                                 
                                                                ) : null}
                                                                {(channel.snippet.viewCount !== 0) ? 
                                                                (       
                                                                    <div>                                                                 
                                                                        <h3> Просмотров:</h3><div> {channel.statistics.viewCount} </div>
                                                                    </div>                                                                 
                                                                ) : null}
                                                                {(channel.statistics.commentCount !== 0) ? 
                                                                ( 
                                                                    <div> 
                                                                        <h3> Комментариев:</h3><div> {channel.statistics.commentCount}</div>
                                                                    </div> 
                                                                ) : null}
                                                                {(channel.statistics.subscriberCount !== 0) ? 
                                                                ( 
                                                                    <div> 
                                                                        <h3> Подписок:</h3><div>{channel.statistics.subscriberCount}</div>
                                                                    </div> 
                                                                ) : null}   
                                                                {(channel.statistics.videoCount !== 0) ? 
                                                                (   
                                                                    <div>                                                  
                                                                        <h3> Число видео:</h3><div>{channel.statistics.videoCount}</div>
                                                                    </div> 
                                                                ) : null}  
                                                                {(channel.statistics.publishedAt !== 0) ? 
                                                                ( 
                                                                    <div>
                                                                        <h3> Опубликовано:</h3><div> {publishedCut} </div>            
                                                                    </div>
                                                                ) : null}  
                                                            </div> 
                                                        </div>
                                                        <div className="col-xs-6"> 
                                                                        <CostCalc
                                                                        viewsSum = {channel.statistics.viewCount}
                                                                        videosSum = {channel.statistics.videoCount}
                                                                        />

                                                        </div>
                                                    </div>        
                                                    );
                                                }) 
                                        }
                                    </div>
                                </div>
                                ) : null
                            }
                            </div>
                        </div>
                     </div>
            );
    }
}
export default App;

/*

                        <SearchBar
                            textBefore="youtube.com/search/"
                            texttype="поиск видео"
                            searchText="Поиск"
                            onInptChange={this.handleInputChange.bind(this, 'searchTerm')}
                            onBtnClick={this.handleGetVideos.bind(this, searchTerm)}
                            value={searchTerm}
                        />

*/

 /*                       <SearchBar 
                            textBefore="youtube.com/video/"
                            texttype="введите ID видео"
                            searchText="Поиск"
                            onInptChange={this.handleInputVideosChange.bind(this, 'videoID')}
                            onBtnClick={this.handleGetVideoDetails.bind(this, videoID)}
                            value={videoID}
                        />  
*/



/*

{playlistData ? 
                                    (
                                        <div className="col col-8 px8 py4">
                                            {playlistData.map((playlist, index) => {
                                                    return (       
                                                        <div key={index}>
                                                            <h1>Плэйлист : {playlist.snippet.title}</h1>
                                                            <img src={playlist.snippet.thumbnails.medium.url}
                                                                width="250" height="150" alt="video-img"
                                                            ></img>   
                                                            <h3> Описание плэйлиста: </h3><div>{playlist.snippet.description}</div>
                                                            <h3> Опубликовано:</h3><div> {playlist.snippet.published}</div>
                                                            <h3> ID канала:</h3><div> {playlist.snippet.channelID}</div>
                                                            <h3> Опубликовано в:</h3><div> {playlist.snippet.publishedAt}</div>            
                                                        </div>         
                                                        );
                                                    }) 
                                            }
                                        </div>
                                    ) : null
                                }
                                
*/


/*
{videos ? 
                                (
                                <div className="col col-2">
                                    {videos.map((video, index) => {
                                    const videoUrl = `https://www.youtube.com/embed/${video.id.videoId}`;

                                    return (
                                    <div onClick={this.handleSelectVideo.bind(this, videoUrl)} key={index}>
                                        <h2>{video.snippet.title}</h2>
                                        <img src={video.snippet.thumbnails.high.url}
                                            width="250" height="150" alt="video-img"
                                        />       
                                    <h3> Опубликовано:</h3><div> {video.snippet.publishedAt}</div>  
                                    <h3> Канал:</h3><div> {video.snippet.channelTitle}</div>
                                    <h3> Описание видео:</h3><div> {video.snippet.description}</div>
                                    <h3> ID канала:</h3><div> {video.snippet.channelID}</div>   
                                    <h3> ID видео:</h3><div> {video.id.videoId}</div>           
                                    </div>
                                    );
                                    }) }
                                </div> 
                                ) : null
                            }
*/

/*
{videoData ? 
                                (
                                <div className="col col-8 py2">
                                    {videoData.map((video, index) => {
                                            return (       
                                                <div key={index}>
                                                    <h1>{video.snippet.title}</h1>
                                                    <img src={video.snippet.thumbnails.high.url}
                                                        width="250" height="150" alt="video-img"
                                                    />   
                                                    <h3> Описание видео:</h3><div> {video.snippet.description}</div>
                                                    <h3> Канал:</h3><div> {video.snippet.channelTitle}</div>
                                                    <h3> тэги:</h3><div> {video.snippet.tags}</div>
                                                    <h3> ID категории:</h3><div> {video.statistics.categoryId}</div>
                                                    <h3> Язык по умолчанию:</h3><div> {video.statistics.defaultLanguage}</div>
                                                    <h3> Просмотров:</h3><div> {video.statistics.viewCount}</div>
                                                    <h3> Лайков:</h3><div> {video.statistics.likeCount}</div>
                                                    <h3> Дислайков:</h3><div> {video.snippet.dislikeCount}</div>             
                                                </div>         
                                                );
                                            }) 
                                    }
                                </div>
                                ) : null
                            }
*/

/*

                       <div className="row">
                                    <SearchBar 
                                        textBefore="youtube.com/user/"
                                        texttype="введите название канала"
                                        searchText="Поиск"
                                        onInptChange={this.handleInputChannelsNameChange.bind(this, 'channelName')}
                                        onBtnClick={this.handleGetChannelDetailsFromName.bind(this, channelName)}
                                        value={channelName}
                                    />  
                        </div>

*/

/*

                                                        {isMarketStartCalc ?
                                                        (
                                                        <div className="col-lg">
                                                            <h3>
                                                                <button type="submit" class="btn btn-outline-danger"
                                                                onClick={this.handleMarketCalcStopClick.bind(this)}>Вернуться на главную</button>
                                                            </h3>
                                                        </div> 
                                                        ) : 
                                                        (
                                                            <div className="row">
                                                                <div className="col-lg-6">
                                                                    <button type="submit" class="btn btn-outline-danger"
                                                                    onClick={this.handleMarketCalcstartClick.bind(this)}>Рассчитать стоимость рекламы</button>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <button type="submit" class="btn btn-outline-danger"
                                                                    onClick={this.handleResetClick.bind(this)}>Сброс</button>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
*/