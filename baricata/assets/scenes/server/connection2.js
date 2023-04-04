var socket = io("http://13.229.123.137:5000/",{   path: '/socket.io',  transports: ['websocket'],  secure: true     });



socket.on("connect", function () {
    console.log(socket.connected); // x8WIv7-mJelg7on_ALbx
    console.log(socket.id);
});

  socket.on("disconnect", function () {
    console.log(socket.connected); // undefined
  });

  
