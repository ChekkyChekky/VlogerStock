var YTVideos = require('./youtube-api/youtube-api-videos');
var YTActivities = require('./youtube-api/youtube-api-activities');

const API_KEY = 'AIzaSyArh26s8VejK8o2prCiV9oCYDIw6SEcsPY';

function getPrognosis(data, sum){
    return new Promise((resolve, reject) => {
        YTVideos({ key: API_KEY, id: data.contentDetails.upload.videoId}, (dataVideo) => { 
            resolve(sum += dataVideo ? parseInt(dataVideo[0].statistics.viewCount) : 0);
        });
    });
}

function next(data, i) {
    if(data[++i].contentDetails != undefined && data[i].contentDetails.upload != undefined) {
        return i;
    } else {
        return next(data, i);
    }
}

module.exports = function (channelId) {
    return new Promise((resolve, reject) => {
        var i = 0;
        YTActivities({ key: API_KEY, channelId: channelId, maxResults: 50 }, (data) => { 
            data.length == 0 ? resolve(undefined) :
            getPrognosis(data[i = next(data, -1)], 0)
            .then(function(sum) {
                i = next(data, i);
                return getPrognosis(data[i], sum)
            })
            .then(function(sum) {
                i = next(data, i);
                return getPrognosis(data[i], sum)
            })
            .then(function(sum) {
                i = next(data, i);
                return getPrognosis(data[i], sum)
            })
            .then(function(sum) {
                i = next(data, i);
                return getPrognosis(data[i], sum)
            })
            .then(function(sum) {
                i = next(data, i);
                resolve((sum/5).toFixed());
            });
        });
    })
}