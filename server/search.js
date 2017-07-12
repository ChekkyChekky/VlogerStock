var YTSearchTerm = require('./youtube-api/youtube-api-search-term');
var YTChannels = require('./youtube-api/youtube-api-channels');
var YTChannelsFromName = require('./youtube-api/youtube-api-channels-by-username');
var httpRequest = require('request');

const API_KEY = 'AIzaSyArh26s8VejK8o2prCiV9oCYDIw6SEcsPY';

function handleSearchPost(channelID) {
    httpRequest({
        url: "https://vlogstock-a0fe.restdb.io/rest/searchesdata",
        method: 'POST',
        headers: {
            "content-type": "application/json",	
            "x-apikey": "595cca7bafce09e87211ea27",		
            "cache-control": "no-cache"
        },
        body: JSON.stringify({search: {term: channelID}})
    });
}

function parse(data) {
    const cost_per_1000 = 0.5;
    const viewsSum = data.statistics.viewCount;
    const videosSum = data.statistics.videoCount;
    const commentsSum = data.statistics.commentCount;
    const subsSum = data.statistics.subscriberCount;
    var result = videosSum!=0 ? Math.round(viewsSum/videosSum*cost_per_1000) : subsSum*cost_per_1000;
    return {
        title: data.snippet.title,
        img: data.snippet.thumbnails.medium.url,
        result: result,
        result_product_placement: (result/3.5).toFixed(),
        result_20sec_promo_start: (result/5.1).toFixed(),
        result_20sec_promo_end: (result/7.6).toFixed(),
        result_ssylka_opis_2ned: (result/16).toFixed(),
        result_izbrannoe_2ned: (result/20).toFixed(),
        result_likepluscomment_video: (result/83.6).toFixed(),
        result_like_video: (result/125.1).toFixed(),
    };
}

function channelVerify(resolve, data, queryName, index) {
    if(data[index].snippet.channelTitle.replace(" ","").toLowerCase() == queryName.replace(" ","").toLowerCase()) {
        YTChannels({ key: API_KEY, id: data[index].snippet.channelId }, (data) => {
            resolve(parse(data[0]));
        });
    } else {
        index!=data.length-1 ? channelVerify(resolve, data, queryName, index+1) : 
        YTChannels({ key: API_KEY, id: data[0].snippet.channelId }, (data) => {
            resolve(parse(data[0]));
        });
    }
}

module.exports = function (query) {
    return new Promise((resolve, reject) => {
        handleSearchPost(query);
        const items = query.split('/');
        const typeSearch = items[items.length-2];
        const ID = items[items.length-1];
        var result;
        if (typeSearch === 'channel') {
            YTChannels({ key: API_KEY, id: ID }, (data) => { 
                    resolve(parse(data[0])); 
            });
        } else {
            YTChannelsFromName({ key: API_KEY, forUsername: ID }, (data) => {
                data.length !== 0 ? resolve(parse(data[0])) :
                    YTChannels({ key: API_KEY, id: ID }, (data) => {
                        data.length !== 0 ? resolve(parse(data[0])) :
                            YTSearchTerm({ key: API_KEY, term: ID, maxResults: 20 }, (data) => {
                                data.length == 0 ? resolve(undefined) :
                                    channelVerify(resolve, data, ID, 0);                                
                            });
                    });
            });
        }
    });
}