/* Variables */
var activeChannels = [];
var parkedCalls = [];
var parked = [];
var channel_html;
var parked_html;
var conference_html;
var currentCall = "1000@cedartel";
/*Menu Handler*/
$(document).on("click",".item",function(){
	
    $(".active").removeClass('active');
    $(this).addClass('item active');
    
    if($(this).attr('id')=="parked"){
    console.log($(this).attr('id'));
    paintParkedCalls();	
    }
   
    if($(this).attr('id')=="current_call"){
    console.log($(this).attr('id'));
    paintCurrentCall();	
    }

    if($(this).attr('id')=="channels"){
    console.log($(this).attr('id'));
    paintChannels(); 
    }
    if($(this).attr('id')=="conference"){
    console.log($(this).attr('id'));
    paintConference(); 
    }
});
$(document).on("click","button",function(){

    if($(this).attr('data-xfer')){
    $.post('http://'+window.location.hostname+':3001/hold', { sip_id: $(this).attr('data-xfer')}, 
    function(returnedData){
         console.log(returnedData);
    });
    }

    if($(this).attr('data-chan')){

        
        console.log($(this).attr('data-chan'));
        console.log($(this).next().children("*").val());
        

    $.post('http://'+window.location.hostname+':3001/transfer', { channel_id: $(this).attr('data-channel'), transfer_extension: $(this).next().children("*").val()}, 
    function(returnedData){
         console.log(returnedData);
    });
    }
        if($(this).attr('data-digit')){

        
        console.log($(this).attr('data-digit'));
        console.log($(this).next().children("*").val());
        

    $.post('http://'+window.location.hostname+':3001/send-digits', { channel: $(this).attr('data-digit'), digits: $(this).next().children("*").val()}, 
    function(returnedData){
         console.log(returnedData);
    });
    }

});
function paintConference(){
console.log("clicked");
}

function paintChannels(){
    $( "#bottom-content" ).empty();
    console.log("fire:"+activeChannels.length);
    for(var i = 0; i<activeChannels.length;i++){
        channel_html = 
    $("#bottom-content").append( '<div class="ui raised container segment"><button class="ui green basic button"><i class="phone icon"></i>'+activeChannels[i][0]+'</button><button data-chan="'+activeChannels[i][0]+'" class="ui violet basic button "><i class="share icon"></i>Xfer</button><div class="ui input"><input type="text" placeholder="Destination Ext"></div><button data-digit="'+activeChannels[i][0]+'" class="ui violet basic button "><i class="asterisk icon"></i>Send Digits</button><div class="ui input"><input type="text" placeholder="1,2,3"></div><button data-xfer="'+activeChannels[i][0]+'" class="ui violet basic button"><i class="pause icon"></i>Hold</button></div>');
    }

}
function paintParkedCalls(){

	$( "#bottom-content" ).empty();
	console.log("fire:"+parked.length);
	for(var i = 0; i<parked.length;i++){
	$("#bottom-content").append( '<div class="ui raised container segment"><button class="ui green basic button"><i class="phone icon"></i>'+parked[i][0]+'</button><button class="ui violet basic button"><i class="stop icon"></i>'+parked[i][1]+'</button><button class="ui violet basic button"><i class="share icon"></i>Transfer</button><br></div>');
	}
}
function paintCurrentCall(){
	$( "#bottom-content" ).empty();
	$("#bottom-content").append( '<button class="ui green basic button"><i class="phone icon"></i>'+currentCall+'</button><button class="ui violet basic button"><i class="share icon"></i>Transfer</button><button class="ui violet basic button"><i class="mute icon"></i>Mute Call</button><button class="ui violet basic button"><i class="pause icon"></i>Park Call</button>');
}


/* Init */
$( document ).ready(function( $ ) {
  //paintCurrentCall();
});


/*Refresh Interval */
window.setInterval(function(){
    /* Update Parked Calls */
  $.get("http://"+window.location.hostname+":3001/get_parked_calls", function(data, status){ 
    if(parked != data){
    parked = data;
    
    }});

  $.get("http://"+window.location.hostname+":3001/get_active_channels", function(data, status){ 
   
    if(activeChannels != data){

    activeChannels = data;
    
    }});

}, 1000);


