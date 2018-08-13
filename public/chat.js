// make connection
var socket=io.connect('http://localhost:4000');

//query dom
 var message=document.getElementById('message');
 var handle=document.getElementById('handle');
 var btn=document.getElementById('send');
 var output=document.getElementById('outputface');
 var feedback=document.getElementById('feedback');


// handle section

// handle.submit(function (e) {
// 	e.preventDefault();
// 	socket.emit('new user',function (data) {
// 		// body...
// 	});

// });

 // Emit events
btn.addEventListener('click' ,function(){
	socket.emit('chat',{
		message:message.value,
		handle:handle.value
	});
	socket.emit('private',{
		message:message.value,
		handle:handle.value
	});
}); 
 // listen for event
socket.on('chat',function (data) {
	feedback.innerHTML="";
	output.innerHTML+='<P><strong style="color:red;">'+data.handle+':</strong>'+'<small style="color:black; font-family:Nunito;padding-left:-20px;">'+data.message+'</small>'+'</P>';
});
 // listen for private event
socket.on('private',function (data) {
	output.append('<li class="private"><em><strong>'+data.from+'->'+data.handle+'</strong>'+data.message+'</li></em>');
});
// update client the status of the sender.
message.addEventListener('keypress',function(){
	socket.emit('typing',handle.value);
});
socket.on('typing',function (data) {
	feedback.innerHTML='<P><em>'+ data +'is typing a message...</em></P>';
});    