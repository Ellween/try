// Make Connection

var socket = io.connect('http://localhost:4000');

// Query Dom

var message = $("#message");
var handle = $("#handle");
var send = $('#send');
var output = $("#output");
var feedback = $("#feedback");

$(document).ready(function(){
  $(send).click(function(){

    socket.emit('chat', {
      message: message.val(),
      handle: handle.val()

    });
    message.val("");
    handle.val("");
  });

  $(message).keypress(function(){
    socket.emit('typing', handle.val());
  });

});


// Listen For Events

socket.on('chat' ,function(data){
  feedback.html("");
  output.append("<p><strong>" + data.handle + ":</strong>"+ data.message +"</p>");
});

socket.on('typing', function(data){
  feedback.html("<p><em>" + data + " is typing a message...</em></p>");
});
