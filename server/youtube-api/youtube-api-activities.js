var axios = require('axios');

var ROOT_URL = 'https://www.googleapis.com/youtube/v3/activities';

module.exports = function  (options, callback) {
  if (!options.key) {
    throw new Error('Youtube Search expected key, received undefined');
  }

  var params = {
    part: 'snippet,contentDetails',
    channelId: options.channelId,
    key: options.key,
    maxResults: options.maxResults
  };

  axios.get(ROOT_URL, { params: params })
    .then(function(response) {
      if (callback) { callback(response.data.items); }
    })
    .catch(function(error) {
      console.error(error);
    });
};


    