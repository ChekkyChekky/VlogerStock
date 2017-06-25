import React, { Component } from 'react';
import SearchBar from './Search'
import YTSearch from 'youtube-api-search'
import YTChannels from 'youtube-api-channels'
import asyncLoad from 'react-async-loader';

const API_KEY = 'AIzaSyArh26s8VejK8o2prCiV9oCYDIw6SEcsPY';
/*onst gapi = require('gapi');*/

class App extends Component {
    constructor(props) {
        super();

        this.state = {
            searchTerm: '',
            videos: [],
            selectedVideo: null
        };
  }

  handleGetVideos(searchTerm) {
      YTSearch({key: API_KEY, term: searchTerm}, 
                (data) => {     
                this.setState({videos: data});
                const video = data[0];
                const videoUrl = `https://www.youtube.com/embed/${video.id.videoId}`;

                this.handleSelectVideo(videoUrl);
              });
  }
 
  handleInputChange(key, event) {
      this.setState({[key] : event.target.value});
  }

  handleSelectVideo(videoUrl) {
      this.setState({selectedVideo: videoUrl})
  }
/***************************************************/ 
  render() {
    const {searchTerm, videos, selectedVideo} = this.state;

    return (
     <div className="p3">
            <SearchBar 
              texttype="Search videos by term"
              onInptChange={this.handleInputChange.bind(this, 'searchTerm')}
              onBtnClick={this.defineRequest.bind(this, searchTerm)}
              value={searchTerm}
            />
        <div className="clearfix">
          {selectedVideo ? 
            (
              <div className="col col-8 py2">
              <iframe width="560" height="315" src={selectedVideo} frameborder="0" allowfullscreen></iframe> 
              </div>
            ) : null}
          <div className="col col-4">
            {videos.map((video, index) => {
              const videoUrl = `https://www.youtube.com/embed/${video.id.videoId}`;

            return (
              <div onClick={this.handleSelectVideo.bind(this, videoUrl)} key={index}>
                  <h3>{video.snippet.title}</h3>
                  <img src={video.snippet.thumbnails.medium.url}
                    width="250" heigh t="150" alt="video-img"
                  />       
              <div>Published: {video.snippet.publishedAt}</div>  
              <div>Channel: {video.snippet.channelTitle}</div>         
              </div>
            );
            }) }
            </div> 
        </div>
          
      </div>
    );
  }
}

export default App;



                <SearchBar 
                    texttype="Search videos by videoID"
                    onInptChange={this.handleInputChangeVideoID.bind(this, 'videoRelatedID')}
                    onBtnClick={this.handleGetVideoByID.bind(this, videoRelatedID)}
                    value={channelID}
                    //www.youtube.com/channel/
                />  



                      <div>Title: {ChannelStatistics.publishedAt}</div>
                        <div>Title: {ChannelStatistics.kind}</div>
                        <div>Title: {ChannelStatistics.items.snippet.title}</div>
                        <div>Description: {ChannelStatistics.items.snippet.description}</div>
                        <div>CustomUrl: {ChannelStatistics.items.snippet.customUrl}</div>
                        <div>Country: {ChannelStatistics.items.snippet.country}</div>
                        <div>ViewCount: {ChannelStatistics.statistics.viewCount}</div>
                        <div>CommentCount: {ChannelStatistics.statistics.commentCount}</div>
                        <div>SubscribeCount: {ChannelStatistics.statistics.subscriberCount}</div>
                        <div>VideoCount: {ChannelStatistics.statistics.videoCount}</div>




                    <div className="col col-4">
                    {videos.map((video, index) => {
                    const videoUrl = `https://www.youtube.com/embed/${video.id.videoId}`;

                    return (
                    <div onClick={this.handleSelectVideo.bind(this, videoUrl)} key={index}>
                        <h3>{video.snippet.title}</h3>
                        <img src={video.snippet.thumbnails.medium.url}
                            width="250" height="150" alt="video-img"
                        />       
                    <div>Published: {video.snippet.publishedAt}</div>  
                    <div>Channel: {video.snippet.channelTitle}</div>
                    <div>Description: {video.snippet.description}</div>
                    <div>ChannelID: {video.snippet.channelID}</div>   
                    <div>VideoID: {video.id.videoId}</div>           
                    </div>
                    );
                    }) }
                    </div> 
                </div>