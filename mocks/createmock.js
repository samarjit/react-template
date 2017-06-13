var http = require('http');
var fs = require('fs');
var config= null;
var found = false;


var url = "rest/getFromDataSource/serviceReservoirsInfoCard?offset=0&limit=1000";




fs.readFile('config.json', 'utf8', function (err,data) {
  if (err) {
    return;
  }
  config = JSON.parse(data);
  console.log(config);
  if(config.webServices[url] !== undefined){
      found = true;
  }else{
    callUrl();
  }
});









//The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
var options = {
  host: '10.97.14.124',
  port :'80',
  path: "/awa-core-ui/ui-awa-src/"+url,
  method:'POST',
  headers: 
   {  
     'cache-control': 'no-cache',
     cookie: 'JSESSIONID=C21C8DFD4A4516F2AAD6591E9A6B115A',
     accept: 'application/json',
     'content-type': 'application/json' 
   },
  body: '[]',
  json: true 
};

callback = function(response) {
  var str = '';

  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });





  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {


    console.log(str);

    
    
    
    console.log("found"+found);

    if(!found){
      //deriving name of json file
      var jsonFileName =  url.replace(/rest|DEFAULT/g,"").replace(/[\/\?\&]/g,"_").replace(/^_|_$/g,"")+".json";
console.log("Created json file:"+jsonFileName)
      var template = {
        "latency": 20,
        "verbs": ["get","post"],
        "responses": {
          "get": {
            "mockFile": jsonFileName
          },"post": {
            "mockFile": jsonFileName
          }
        }
      };
      config.webServices[url.replace(/\?.*/,'')] = template;
      //console.log(config);
      fs.writeFile(jsonFileName, str, function (err) {
        if (err) {console.error(err); return ;}
        console.info('written '+jsonFileName);
      });
      fs.writeFile('config.json', JSON.stringify(config,null,3), function (err) {
        if (err) {console.error(err); return ;}
        console.info('written config.json');
      });
    }
  });


}


function callUrl(){
  console.log("Calling---:"+options.path);
  var post_req = http.request(options, callback);
  if(options.method == "POST" || options.method==="post"){
    post_req.write(options.body);
    post_req.end();
  }
}