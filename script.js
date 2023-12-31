

const REMOTE = document.getElementById('remote');

let idUser;
let conn;


let idSet =  Math.floor(Math.random() * 500) + 'Monkila';


  var peer = new Peer(idSet, {
    debug:2 });

  peer.on('open', function () {
   console.log(peer.id)
   alert('Votre id est : ' +peer.id);
  });

  peer.on('connection', function(c) {

    if (conn && conn.open) {
        c.on('open', function() {
            c.send("Already connected to another client");
            setTimeout(function() { c.close(); }, 500);
        });
        return;
    }

    
    conn = c;
    console.log("Connected to: " + conn.peer);

    conn.on('data', function(data){
      console.log(data);
    });
  });


  const constraints = {
    video: true,
    width: 640,
    height: 480
  };

  peer.on('call', function(call) {


    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
        call.answer(stream); 
        call.on('stream', function(remoteStream) {
            REMOTE.srcObject = remoteStream
        });
    });

});


  
  