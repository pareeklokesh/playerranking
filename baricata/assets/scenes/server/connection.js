var socket = io("http://13.214.221.33:4000/",{   path: '/socket.io',  transports: ['websocket'],  secure: true     });

var socketId = '';
var session_id = '';
var gameStatus = '';
var remaining_time = '';
var win_number = '';
var winmsg = '';
var animate_table_to_wheel = false;
var arrayofgamestatus = [];


socket.on("connect", function () {
    console.log(socket.connected); // x8WIv7-mJelg7on_ALbx
    socketId = socket.id;
    console.log(socket.id + ' socketId');
});

  socket.on("disconnect", function () {
    console.log(socket.connected); // undefined
  });

  function createroom(){
    var userData = {
      player_id: initial_data.data.userinfo.player_id,
      game_code: initial_data.data.gamesinfo.game_code,
      token: initial_data.data.userinfo.user_session_token,
      operator_name: initial_data.data.userinfo.operator_name,
      operator_player_id: initial_data.data.userinfo.operator_player_id,
      player_name: initial_data.data.userinfo.player_name,
      userEntityId : initial_data.data.userinfo.entityId
    };

      console.log(userData);
     
    socket.emit("createRoom", userData);
  }

  function SpinHandler(betgroupidarray,betnumberarray,betamountarray,bet_typearray,coinamount) {
    if (gameStatus == "OPEN") {

      var splitbetnum = betnumberarray.split(',').map(Number);


      var bettingData = {
        session_id: session_id,
        game_code: initial_data.data.gamesinfo.game_code,
        player_id: player_id,
        operator_name: initial_data.data.userinfo.operator_name,
        operator_player_id: initial_data.data.userinfo.operator_player_id,
        player_name: initial_data.data.userinfo.player_name,
        action: "bet",
        position: splitbetnum,
        position_id: betgroupidarray,
        bet_type: bet_typearray,
        amount: coinamount,
        userEntityId: initial_data.data.userinfo.entityId
      };    

      console.log(bettingData);
      socket.emit("betData", bettingData);
    }  
  }


  socket.on("room_name", function (event) {
    console.log('room_name-- ',event);
    
  });

  socket.on("userJoin", function (joinMessage) { 
    console.log('userJoin-- ',joinMessage);
    
  });

  socket.on("userCount", function (userCountevent) { 
    console.log('userCount-- ', userCountevent);
  });

  socket.on("gameInfo", (data) => {
    console.log("gameInfo data-----", data);
    session_id = data.gameInfo.session_id;
    remaining_time = data.gameInfo.remaining_time;

    showtimer = true;
    // sessiontimer = true;
  });

  socket.on("gameStatus", (data) => {
    console.log("game Status data-----", data);
    gameStatus = data.gameStatus;

    if(gameStatus == "OPEN" || gameStatus == "CLOSE"){
      arrayofgamestatus.push(gameStatus);
    }else{
      arrayofgamestatus = [];
    }

    if(gameStatus == "CLOSE" && arrayofgamestatus[1] == "CLOSE"){
      animate_table_to_wheel = true;
    }
  });

  socket.on("15secmessage", (data) => {
    console.log("15 sec message data-----", data);
  });

  socket.on("gameOver", (data) => {
    console.log("game Over data-----", data);
  });

  socket.on("winningNo", (data) => {
    console.log("winning No data-----", data);
    win_number = data.winNumber.Number;
  });

  socket.on("winner", (data) => {
    console.log("winner data-----", data);
    winmsg = data.message;
  });

  socket.on("userExist", (data) => {
    console.log("userExist data-----", data);
  });

  socket.on("betMessage",(data)=>{
    console.log("betMessage data----",data);
  });

  socket.on("endTime", function (data) {
    console.log("endTime data------", data);
  });


  // client_id
  // game_id
  // username
  // amount
  // balance
  // function slotspin(betplaced_byuser){
  //   console.log("betplaced_byuser = " + user_id);
  //   socket.emit("spin", JSON.stringify({client_id : client_id,game_id : gameid, username : username, amount : betplaced_byuser,balance : avlbal,user_id:user_id,buyfreespin:buyfreespin}));
  // }
  
  // socket.on('spinResponse', function(event){
  //   console.log(event);
  //   session_id = event.session_id;
  //   combination = event.combination;
  //   reel = event.reel;
  //   payline = event.payline;
  //   totalWin = event.totalWin;
  //   win_amt=event.win;
  //   finalWin = event.finalWin;
  //   multiplierData = event.multiplierData;
  //   multiplier = event.multiplier;
  //   freespin = event.freespin;
  //   freespinCount = event.freespinCount;
  //   opening_balance = event.opening_balance;
  //   closing_balance = event.closing_balance;
  //   showserverslotarray = true;
  // });

