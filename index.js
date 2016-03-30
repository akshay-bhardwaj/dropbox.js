var http = require('http');
var https = require('https');
var Dropbox = function(token){
  this.token = token
}

Dropbox.prototype.list_folder = function(path, recursive, include_media_info, include_deleted){
  var option = {
    protocol: 'https:',
    host: 'api.dropboxapi.com',
    path: '/2/files/list_folder',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + this.token
    }
  }

  var req = https.request(option, (res)=>{
    // console.log(`STATUS: ${res.statusCode}`);
    res.on('data', (chunk) => {
      // console.log(`BODY: ${chunk}`);
    });
    res.on('end', ()=> {
      // console.log("Data is back");
    });
  });

  var postData = {
    path: path,
    recursive: recursive,
    include_media_info: include_media_info,
    include_deleted: include_deleted
  }

  req.write(JSON.stringify(postData));
  req.end
}

exports.Dropbox = Dropbox;
