var express        =         require("express");
var bodyParser     =         require("body-parser");
var app            =         express();
var AsteriskAmi = require('asterisk-ami');
var ActiveChannels = [];
var ami = new AsteriskAmi( { host: 'localhost', username: 'admin', password: 'amp111' } );
var parkedObject = [];
var channelcount = 0;
app.use(require('express-promise')());
app.use(express.static('client'));

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/client',function(req,res){
  res.sendfile("client/index.html");
});

app.get('/hold',function(req,res){
  res.sendfile("hold.html");
});

app.get('/get_parked_calls',function(req,res){
  res.send(parkedObject);
});

app.get('/get_active_channels', function(req, res) {
res.send(ActiveChannels);
});

app.post('/hold',function(req,res){
 var holdee=req.body.sip_id;
  ami.send({Action: 'Park',
  Channel: holdee,
  Channel2: holdee});
});

// app.post('/transfer',function(req,res){
//   var transferee=req.body.sip_id;
//   var transferTo=req.body.transfer_extension;
//   for(var i=0;i<ActiveChannels.length;i++){
//     console.log(ActiveChannels[i]);
//     if(ActiveChannels[i].indexOf(transferee) >= 0){
    
//  ami.send({EVENT: "Redirect",
//       Channel: ActiveChannels[i],
//       Exten: transferTo,
//       Priority: '1',
//       Context: 'default'});
//     }
//   }
// });
app.post('/send-digits',function(req,res){
  var digit=req.body.digit;
  var channel=req.body.channel;

  ami.send({Action: "PlayDTMF",
      Channel: channel,
      Digit: digit  
      });
});

app.post('/transfer',function(req,res){
  var transferee=req.body.channel_id;
  var transferTo=req.body.transfer_extension;
  ami.send({EVENT: "Redirect",
      Channel: channel_id,
      Exten: transfer_extension,
      Priority: '1',
      Context: 'default'});

});

app.listen(3001,function(){
  console.log("Started on PORT 3001");
})


ami.on('ami_data', function(data){
  
// if(data.channel){
//    index found channels 
  
//   ActiveChannels.push(data.channel);
// }
if(data.event=="UnParkedCall"){
for(var i=0;i<parkedObject.length;i++){
  if(data.exten == parkedObject[i][0]){
    //console.log("Unparked: "+data.exten);
    parkedObject.splice(i, 1);
  }
}
  console.log(data);
}
if(data.event=="Hangup"){
for(var i=0;i<parkedObject.length;i++){
  if(data.exten == parkedObject[i][0]){
    //console.log("Unparked: "+data.exten);
    parkedObject.splice(i, 1);
  }
}
for(var i=0;i<ActiveChannels.length;i++){
  if(data.channel == ActiveChannels[i]){
    //console.log("Unparked: "+data.exten);
    ActiveChannels.splice(i, 1);
  }
}
  console.log(data);
}
if(data.event=="ParkedCall"){
var instanceObject = [];
instanceObject.push(data.exten);
instanceObject.push(data.from);
parkedObject.push(instanceObject);
}
if(data.event=="Newchannel"){
var instanceObject = [];
instanceObject.push(data.channel);
ActiveChannels.push(instanceObject);
}
});

ami.connect(function(){


}, function(raw_data){
     

});
