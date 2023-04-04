var graphics;
var circle;
var diamond1;
var betwheelstart = false;
var rotation = false;
var updatexy = false;
var decreaserotation = false;
var rotateSpeed = '';
var revolveAround = 0;
var updatewin = false;
var center = { x: 540, y: 960 };
var diamondarray = [];
var collidexarray = [];
var collideyarray = [];
var randomnum = '';
var select_randomnum = '';
var numberindex = 0;
var coinsxarray = [980,980,980,980,980,980];
var coinsyarray = [870,870,870,870,870,870];
var coinsxarray1 = [980,900,820,820,900,980];
var coinsyarray1 = [1350,1200,1050,900,750,600];
var coinstexture = ['chip1','chip2','chip3','chip4','chip5','chip6'];
var getinfo_chips = [1,5,25,100,200,500];
var groupid = [];
var groupnumbers = [];
var isremove = false;
var gamebetamount = 0;
var betnumberarray = [];
var doublexarray = [];
var doubleyarray = [];
var doublecointexture = [];
var doublecoinamount = []; 
var inneramountarray = [];
var outeramountarray = [];
var betamountarray = [];
var betgroupidarray = [];
var betnumberarray = [];
var bet_typearray = [];
var shape1 = '';
var showtimer = false;
var destroyTimer = false;
var timercounter = 20;
var timerplayer = '';
var stoptween = false;
var showrepeatbar = false;
var sessiontimer = false;
var betscreen = false;
var show_timer_in_betscreen = false;
var chip_op_cl = 0;
var chip_open = false; 
var game_insidemaxbet = 500000;
var game_insideminbet = 2;
var game_outsidemaxbet = 10000;
var game_outsideminbet = 2;
var sumofinnerbet = 0;
var sumofouterbet = 0;

class Gametable extends Phaser.Scene {
    constructor() {
        super("Gametable");
    }
    preload() {
      // this.load.video('wormhole', video_streaming_url, 'canplaythrough', false, true);
    }
    create() {
    //     var vid = this.add.video(0, 0, 'wormhole').setDisplaySize(1080, 1920).setOrigin(0);
    //     vid.play(true);
    // // Prevents video freeze when game is out of focus (i.e. user changes tab on the browser)
    //     vid.setPaused(false);

        this.add.image(0,0,'background_temp').setScale(1).setOrigin(0);  
        
        this.table = this.add.image(540,960, 'bet_back').setScale(1).setVisible(true);

        
      
        // graphics = this.add.graphics({ lineStyle: { width: 2, color: 0x00ff00 }, fillStyle: { color: 0xff0000 }});

        // circle = new Phaser.Geom.Circle(540,960, 310);

        // var graphics1 = this.add.graphics({ lineStyle: { width: 2, color: 0x00ff00 }, fillStyle: { color: 0x134F5C }});
        // var points = circle.getPoints(37);

        // for (var i = 0; i < points.length; i++)
        // {
        // graphics1.fillRect(points[i].x, points[i].y, 8, 8);
        // console.log(points[i].x, points[i].y);
            
        // }
        this.wheeldiamondContainer = this.add.container();
        this.wheeldiamond = this.physics.add.staticImage(822.5,1074.6, 'metal').setScale(0.60).setDepth(4).setVisible(false);
        this.wheeldiamond.angle = 30;
        this.wheeldiamond1 = this.physics.add.staticImage(654.6,1242.4, 'metal').setScale(0.60).setDepth(4).setVisible(false);
        this.wheeldiamond1.angle = 155;
        this.wheeldiamond2 = this.physics.add.staticImage(417.4,1242.4, 'metal').setScale(0.60).setDepth(4).setVisible(false);
        this.wheeldiamond2.angle = 125;
        this.wheeldiamond3 = this.physics.add.staticImage(252,1075, 'metal').setScale(0.60).setDepth(4).setVisible(false);
        this.wheeldiamond3.angle = 60;
        this.wheeldiamond4 = this.physics.add.staticImage(249.6,837.4, 'metal').setScale(0.60).setDepth(4).setVisible(false);
        this.wheeldiamond4.angle = 32;
        this.wheeldiamond5 = this.physics.add.staticImage(417.4,669.6, 'metal').setScale(0.60).setDepth(4).setVisible(false);
        this.wheeldiamond5.angle = -30;
        this.wheeldiamond6 = this.physics.add.staticImage(654.6,669.6, 'metal').setScale(0.60).setDepth(4).setVisible(false);
        this.wheeldiamond6.angle = -63;
        this.wheeldiamond7 = this.physics.add.staticImage(822.4,837.4, 'metal').setScale(0.60).setDepth(4).setVisible(false);
        this.wheeldiamond7.angle = 60;
        this.wheeldiamondContainer.add([this.wheeldiamond,this.wheeldiamond1,this.wheeldiamond2,this.wheeldiamond3,this.wheeldiamond4,this.wheeldiamond5,this.wheeldiamond6,this.wheeldiamond7]);

        this.coinplacecontainer = this.add.container(0,0);

        this.showingbetcoins();
        this.createbetselection();
        this.manageevents();
        // this.headersection();
        // this.footersection();
        betscreen = true;

        createroom();
    }



    session_timer() {

      if(this.sessiontimercontainer != undefined){
        this.sessiontimercontainer.destroy();
      }

      this.sessiontimercontainer = this.add.container();
      shape1 = this.add.graphics();
      shape1.beginPath();
     var  mask1 = shape1.createGeometryMask();
     this.sessiontimer_bg1 = this.add.image(150,330, 'sessiontimer_bg1').setScale(1);
     this.sessiontimer_bg2 = this.add.image(150,330, 'sessiontimer_bg2').setScale(1);
      this.sessiontimer_bg2.setMask(mask1);
      this.sessiontimer_bg2.depth = 4;
      this.sessiontimercontainer.add([this.sessiontimer_bg1,this.sessiontimer_bg2]);

      this.tweencounter1 = this.tweens.addCounter({
          targets: this.sessiontimer_bg2,
          from: 450,
          to: 90,
          radius: 100,
          duration: remaining_time * 1000,
          onUpdate: function(tween) {
              var t = tween.getValue();
              shape1.clear();
              shape1.slice(150,330, 89, Phaser.Math.DegToRad(t), Phaser.Math.DegToRad(450), true);
          },
          onComplete: function() {
              shape1.clear();
              if(this.sessiontimercontainer != undefined){
                this.sessiontimercontainer.destroy();
              }
              destroyTimer = true;
              clearTimeout(timerplayer);
          },
          onCompleteScope: this
      });

    }



    changecointexture(betplaceamount) {
      // console.log(betplaceamount , initial_data.data.chipDetail.chip_values);
      if(betplaceamount == initial_data.data.chipDetail.chip_values[0]) {
        localStorage.setItem('amecoinimg', 'chip1');
      }
      else if(betplaceamount >= initial_data.data.chipDetail.chip_values[1] && betplaceamount < initial_data.data.chipDetail.chip_values[2]) {
        localStorage.setItem('amecoinimg', 'chip2')
      }
      else if(betplaceamount >= initial_data.data.chipDetail.chip_values[2] && betplaceamount < initial_data.data.chipDetail.chip_values[3]) {
        localStorage.setItem('amecoinimg', 'chip3');
      }
      else if(betplaceamount >= initial_data.data.chipDetail.chip_values[3] && betplaceamount < initial_data.data.chipDetail.chip_values[4]) {
         localStorage.setItem('amecoinimg', 'chip4');
      }
      else if(betplaceamount >= initial_data.data.chipDetail.chip_values[4] && betplaceamount < initial_data.data.chipDetail.chip_values[5]) {
        localStorage.setItem('amecoinimg', 'chip5');
      }
      else if(betplaceamount >= initial_data.data.chipDetail.chip_values[5]) {
        localStorage.setItem('amecoinimg', 'chip6');                
      } 
    }



        // this function used to manage gameobject events
        manageevents() {

          this.input.on('gameobjectdown', function(pointer, gameObject) {
      
              if (gameObject.data == undefined || gameObject.data == null) {
                  return;
              }
  
              if(gameObject.data.list.changechip != undefined && gameObject.data.list.changechip == false ) {
                if(chip_op_cl % 2 == 0){
                var counter = 0;
                this.betcoincontainer.each(function(child) {
                  child.x = coinsxarray1[parseInt(counter/2)];
                  child.y = coinsyarray1[parseInt(counter/2)];
                  counter++;
                },this);

                var bt_cout = 0;
                var bt_xarray = [980,980];
                var bt_yarray = [450,1500];
                this.buttoncontainer.each(function(innerchild) {
                  if(bt_cout != 2){
                  innerchild.x = bt_xarray[bt_cout];
                  innerchild.y = bt_yarray[bt_cout];
                  }else{
                    innerchild.setAlpha(0.01);
                  }
                  bt_cout++;
                },this);

                chip_open = true;
               }


               if(chip_op_cl % 2 == 1){
                this.betcoincontainer.each(function(child) {
                  child.x = 980;
                  child.y = 870;
                  if(gameObject == child || child._text == parseInt(gameObject.data.list.coinvalue)){
                    this.betcoincontainer.bringToTop(child);
                  }             
                },this);

                var bt_cout = 0;
                var bt_xarray = [980,980,980];
                var bt_yarray = [720,1020,1170];
                this.buttoncontainer.each(function(innerchild) {
                  innerchild.x = bt_xarray[bt_cout];
                  innerchild.y = bt_yarray[bt_cout];
                  if(bt_cout == 2){
                    innerchild.setAlpha(1);
                  }
                  bt_cout++;
                },this);

                chip_open = false;
               }

               chip_op_cl++;
              }


              if(gameObject.data.list.betcoin != undefined && gameObject.data.list.betcoin == true ) {
                console.log('betcoin');
                  localStorage.setItem('amecoinamt', parseInt(gameObject.data.list.coinvalue));
                  localStorage.setItem('amecoinimg', gameObject.data.list.imagetexture);
                  localStorage.setItem('amexposition', gameObject.x);
                  localStorage.setItem('ameyposition', gameObject.y);
                  localStorage.setItem('highlightimg','chip_selected');
                  // if(this.coinplacecontainer != undefined) {   
                  //   this.coinplacecontainer.each(function(child) {
                  //     if(child.type == 'Image') {
                  //       child.disableInteractive();
                  //     }
                  //   }, this);
                  // }
                  // isremove = false;
                  // isdestroy = false;
                  
                  // if(this.remove_button.data.list.createalpha == true) {
                  //   this.remove_button.setData({createalpha:false});
                  //   this.remove_button.setScale(0.36).setAlpha(0.5);
                  //   this.remove_button.disableInteractive();
                  // }
                                
                  if(this.coinhighlight != undefined) {
                    this.coinhighlight.destroy();
                  }
                  this.coinhighlight = this.add.image(gameObject.x, gameObject.y, 'chip_selected').setScale(0.4);
                  this.coinhighlight.depth = 1;
                  
              }
  
              if(gameObject.data.list.betplace != undefined && gameObject.data.list.betplace == true ) {
                console.log(gameStatus , chip_open);
                  if(gameStatus == "OPEN" && chip_open == false) {
  
                    // this.coinbetsounds();
  
                    var coinamount = parseInt(localStorage.getItem('amecoinamt'));
                    var cointexture = localStorage.getItem('amecoinimg');
                    var coinxpos = parseInt(localStorage.getItem('amexposition'));
                    var coinypos = parseInt(localStorage.getItem('ameyposition'));
  
                    // if(coinamount > this.balance._text) {
                    //     this.selectchipspopup('You have not sufficient balance');
                    //     return;
                    // }
                    // if(inneramountarray != '') {
                    //   var innercoinsum = inneramountarray.reduce(function(a,b) { return a+b; });
                    // } 
                    // if(outeramountarray != '') {
                    //   var outercoinsum = outeramountarray.reduce(function(a,b) { return a+b; });
                    // }
                      
                    // if(coinamount < game_outsideminbet || outercoinsum >= game_outsidemaxbet && gameObject.data.list.bettype == 'outer') {
                    //    this.selectchipspopup('Play Should be '+game_outsideminbet+' - '+ game_outsidemaxbet);
                    //    return;
                    // } else if(coinamount < game_insideminbet || innercoinsum >= game_insidemaxbet && gameObject.data.list.bettype == 'inner') {
                    //   this.selectchipspopup('Play Should be '+ game_insideminbet+' - '+ game_insidemaxbet);
                    //   return;
                    // }
                    var num = betnumberarray.indexOf(gameObject.data.list.numbervalue);
                    if(num == -1) {
                      gameObject.data.list.betamountvalue = 0;
                    } else {
                      // console.log(betamountarray[num]);
                      gameObject.data.list.betamountvalue = betamountarray[num];
                    }
  
                      if(gameObject.data.list.resetvalue == true) {
                          gameObject.data.list.betamountvalue = 0;
                          gameObject.data.list.resetvalue = false;
                      }
  
                      if(gameObject.data.list.bettype == 'inner') {
                        if(num > -1) {
                          inneramountarray.splice(num,1);
                        }
                        // console.log(coinamount);
                        gameObject.data.list.betamountvalue += coinamount;
                        inneramountarray.push(gameObject.data.list.betamountvalue);
                        
                      } else {
                        if(num > -1) {
                          outeramountarray.splice(num,1);
                        }
                        gameObject.data.list.betamountvalue += coinamount;
                        outeramountarray.push(gameObject.data.list.betamountvalue);
                      }
                      
                      this.changecointexture(gameObject.data.list.betamountvalue);
  
                      cointexture = localStorage.getItem('amecoinimg');
  
                      this.coinplace = this.add.image(coinxpos, coinypos, cointexture).setScale(0.6);
                      this.coinplacevalue = this.add.text(coinxpos, coinypos, gameObject.data.list.betamountvalue, {
                         fill: 'white',
                         fontFamily: 'Arial',
                         fontSize: '30px',
                      }).setOrigin(0.5);
  
                      this.coinplacevalue.setData({numbervalue: gameObject.data.list.numbervalue, resetvalue: false, clearvalue: false, betamountvalue: gamebetamount});
                      this.coinplace.setData({remove:true, cointext:this.coinplacevalue, coindata:this.coinplace,betamounts:gameObject.data.list.betamountvalue, coinindex:coinamount, groupid:gameObject.data.list.groupID,numbervalue:gameObject.data.list.numbervalue});
                      this.coinplacecontainer.add([this.coinplace, this.coinplacevalue]);
                      this.coinplacecontainer.depth = 20;
                      var tween = this.tweens.add({
                         targets: [this.coinplace,this.coinplacevalue],    
                         x: gameObject.x,
                         y: gameObject.y,
                         scaleX:0.75,
                         scaleY:0.75,
                         ease: 'Linear',
                         duration: 200,
                         yoyo: false,
                         onComplete: function() {
                          console.log(betgroupidarray,betnumberarray,betamountarray,bet_typearray,coinamount);
                          SpinHandler(betgroupidarray[betgroupidarray.length-1],betnumberarray[betnumberarray.length-1],betamountarray[betamountarray.length-1],bet_typearray[bet_typearray.length-1],coinamount);
                         },
                         onCompleteScope: this
                      }, this);
  
                      var numindex = betnumberarray.indexOf(gameObject.data.list.numbervalue);
                      if(numindex > -1) {
                        doublexarray.splice(numindex,1);
                        doubleyarray.splice(numindex,1);
                        doublecointexture.splice(numindex,1);
                        doublecoinamount.splice(numindex,1);
                      }
                        doublexarray.push(gameObject.x);
                        doubleyarray.push(gameObject.y);
                        doublecointexture.push(cointexture);
                        doublecoinamount.push(gameObject.data.list.betamountvalue);

                        // console.log(doublexarray,doubleyarray);
  
                      this.createbetarray(gameObject);
                      this.buttoncontainer.each(function(child) {
                         child.setInteractive();
                         child.alpha = 1;
                      },this);
                    
                  } 
                  else {
                    console.log('please let session start');
                  }
                  
              } 
  
              if(gameObject.data.list.buttonvalue != undefined && gameObject.data.list.buttonvalue == 'doubleup') {
                  // this.buttonsound();
                  // var sum = betamountarray.reduce(function(a,b) { return a+b});
                  // if(sum > this.balance._text) {
                  //   this.selectchipspopup('You have not sufficient balance');
                  //   return;
                  // }
  
                  // if(this.remove_button.data.list.createalpha == true) {
                  //   this.remove_button.setData({createalpha:false});
                  //   this.remove_button.setScale(0.36);
                  // }
  
                  if(this.coinplacecontainer != undefined) {   
                    this.coinplacecontainer.each(function(child) {
                      if(child.type == 'Image') {
                        child.disableInteractive();
                      }
                    }, this);
                  }
  
                  // isremove = false;
                  // isdestroy = false;
                 
                 if(inneramountarray != '') {
                   sumofinnerbet = inneramountarray.reduce(function(a,b) { return a+b; });
                 }
               
                if(sumofinnerbet*2 <= game_insidemaxbet) {
                  for(var i = 0; i<this.innerbetcontainer.list.length; i++) {
                      for(var j =0; j<betgroupidarray.length; j++) {
                        if(this.innerbetcontainer.list[i].data.list.groupID == betgroupidarray[j]) {
                          betamountarray[j] = betamountarray[j]*2;
                          inneramountarray[j] = betamountarray[j];
                          
                          this.changecointexture(inneramountarray[j]);
  
                          cointexture = localStorage.getItem('amecoinimg');
  
                          this.coinplace = this.add.image(doublexarray[j], doubleyarray[j], cointexture).setScale(0.75);
                          // console.log(betamountarray[j],doublexarray[j], doubleyarray[j]);
                          this.coinplacevalue = this.add.text(doublexarray[j], doubleyarray[j], betamountarray[j],{
                            fill: 'white',
                            fontFamily: 'Arial',
                            fontSize: '30px',
                          }).setOrigin(0.5);
                          this.coinplace.setData({remove:true, cointext:this.coinplacevalue, coindata:this.coinplace,numbervalue:this.innerbetcontainer.list[i].data.list.numbervalue,coinindex:betamountarray[j]/2});
                          this.coinplacecontainer.add([this.coinplace,this.coinplacevalue]);
                          this.coinplacecontainer.depth = 20;
                        }
                      }
                    }
                } else {
                  if(outeramountarray == '') {
                    console.log('play Should be '+game_insideminbet+'-'+ game_insidemaxbet);
                  }
                }
  
                if(outeramountarray != '') {
                  sumofouterbet = outeramountarray.reduce(function(a,b) {return a+b;});
                }
                  if(sumofouterbet*2 <= game_outsidemaxbet) {
                    for(var i = 0; i<this.outerbetcontainer.list.length; i++) {
                      for(var j =0; j<betgroupidarray.length; j++) {
                        if(this.outerbetcontainer.list[i].data.list.groupID == betgroupidarray[j]) {
                          
                          betamountarray[j] = betamountarray[j]*2;
                          outeramountarray[j] = betamountarray[j];
  
                          this.changecointexture(outeramountarray[j]);
  
                          cointexture = localStorage.getItem('amecoinimg');
  
                          this.coinplace = this.add.image(doublexarray[j], doubleyarray[j], cointexture).setScale(0.75);
                          this.coinplacevalue = this.add.text(doublexarray[j], doubleyarray[j], betamountarray[j],{
                            fill: 'white',
                            fontFamily: 'Arial',
                            fontSize: '30px',
                          }).setOrigin(0.5);
                          this.coinplace.setData({remove:true, cointext:this.coinplacevalue, coindata:this.coinplace,numbervalue:this.outerbetcontainer.list[i].data.list.numbervalue,coinindex:betamountarray[j]/2});
                          this.coinplacecontainer.add([this.coinplace,this.coinplacevalue]);
                          this.coinplacecontainer.depth = 20;
                        }
                      }
                    }
                  } else {
                    
                    if(sumofinnerbet*2 > game_insideminbet || inneramountarray == '') {
                      console.log('Play Should be '+game_outsideminbet+'-' + game_outsidemaxbet);
                    }
                  }
  
                  // balanceupdate = true;
                  
                  
              }
  
              if(gameObject.data.list.buttonvalue != undefined && gameObject.data.list.buttonvalue == 'repeat') {
                var betsum = betamountarray.reduce(function(a,b) { return a+b});
                if(betsum > this.balance._text) {
                    this.selectchipspopup('You have not sufficient balance');
                    return;
                  }
  
                  if(this.tabletimer != undefined) {
                    this.tabletimer.paused = true;
                  }
  
                  spin_winamount = 0;
                  GetUserDetailsHandler();
                  this.doubleup_button.setData({buttonvalue:'doubleup'});
                  this.doubleup_button.setTexture('table_20');
                  this.enablebetbutton();
                  if(this.repeatcontainer != undefined) {
                      this.repeatcontainer.destroy();
                  }
                  
                  this.stoptweenanim();
                  this.showbetbar();
                  this.showroulettetween();
                  this.showingbetcoins();                        
              }
  
              if(gameObject.data.list.buttonvalue != undefined && gameObject.data.list.buttonvalue == 'clear') {
                  this.clearbetsound();
                  this.buttoncontainer.each(function(child) {
                    if(child.data.list.buttonvalue != 'auto') {
                      child.disableInteractive();
                      child.alpha = 0.5;
                    }
                  },this);
                  if(this.coinplacecontainer != undefined) {
                    this.coinplacecontainer.destroy();
                    this.coinplacecontainer = this.add.container();
                  }
                  
                  betgroupidarray = [];
                  betamountarray = [];
                  betnumberarray = [];
  
                  doublecoinamount = [];
                  doublexarray = [];
                  doubleyarray = [];
                  doublecointexture = [];
  
                  inneramountarray = [];
                  outeramountarray = [];
  
                  this.innerbetcontainer.iterate(this.clearbetamounts);
                  this.outerbetcontainer.iterate(this.clearbetamounts);
                  balanceupdate = true;
  
              }
  
              if(gameObject.data.list.buttonvalue != undefined && gameObject.data.list.buttonvalue == 'auto') {
  
                  increment = increment+1;
                  if(autoarray.length == increment) {
                      increment = 0;
                  }
                  this.autoround_text.setText(autoarray[increment]);
                  
              }
  
              if(gameObject.data.list.buttonvalue != undefined && gameObject.data.list.buttonvalue == "remove" ) {
                  if(this.coinplace != undefined) {
                      this.coinplacecontainer.each(function(child){
                        if(child.type == 'Image') {
                          child.setInteractive();
                        }
                      }, this);
                  }
                  this.remove_button.setData({createalpha:true});
                  this.remove_button.setScale(0.4);
  
                  isremove = true;
                  isdestroy = true;
  
              }
              
              if(gameObject.data.list.remove != undefined && gameObject.data.list.remove == true && isdestroy) {
                  this.coinbetremovesounds();
                  var coinamount = parseInt(localStorage.getItem('amecoinamt'));
                  var dataget = gameObject.data.list.cointext;
                  var coinget = gameObject.data.list.coindata;
                  var numbervalue = gameObject.data.list.numbervalue;
                  var betamt = gameObject.data.list.coinindex;
                  
                  this.removebetarray(numbervalue,betamt);
                  dataget.destroy();
                  coinget.destroy();
  
                  doublecoinamount.pop();
                  doublexarray.pop();
                  doubleyarray.pop();
                  doublecointexture.pop();
  
                  if(this.coinhighlight != undefined) {
                      this.coinhighlight.destroy();
                  }
                  
                  if(this.coinplacecontainer.list.length == 0) {
                      this.buttoncontainer.each(function(child) {
                      if(child.data.list.buttonvalue != 'remove' && child.data.list.buttonvalue != 'auto') {
                          child.alpha = 0.5;
                          child.disableInteractive();
                        } 
                      },this);
                  }
  
              }
  
          },this);
  
      }

    // this function used to create bet array 
    createbetarray(gameObject) {
      var indexvalue = betnumberarray.indexOf(gameObject.data.list.numbervalue);
      // console.log(betamountarray);
      if(indexvalue > -1) {
        betgroupidarray.splice(indexvalue,1);
        betnumberarray.splice(indexvalue,1);
        betamountarray.splice(indexvalue,1);
        bet_typearray.splice(indexvalue,1);
      }
      betgroupidarray.push(gameObject.data.list.groupID)
      betamountarray.push(gameObject.data.list.betamountvalue);
      betnumberarray.push(gameObject.data.list.numbervalue);
      bet_typearray.push(gameObject.data.list.bet_type);

      // balanceupdate = true;

  }

  //this fucntion is used to remove element from array bet array
  removebetarray(numbervalue,betamount) {
    var index = betnumberarray.indexOf(numbervalue);
      
    if(betamountarray[index] - betamount == 0){
      betnumberarray.splice(index,1);
      betgroupidarray.splice(index,1);
      betamountarray.splice(index,1);
      inneramountarray.splice(index,1);
      outeramountarray.splice(index,1);
    }
    if(index > -1 && betamountarray[index] - betamount != 0 && isNaN(betamountarray[index] - betamount) == false) {
        betamountarray.splice(index,1,betamountarray[index] - betamount);
        inneramountarray.splice(index,1,inneramountarray[index]- betamount);
        outeramountarray.splice(index,1,outeramountarray[index]- betamount);
    }

      // balanceupdate = true;
  }


        // this function used to create bet selection
        createbetselection() {

          this.innerbetcontainer = this.add.container(0,0);
          this.outerbetcontainer = this.add.container(0,0);
  
          var x_pos = 492;
          var y_pos = 460;
          var cornerxpositon = 492;
          var cornerypositon = 460;
          var splity_pos = 506;
          var streety_pos = 460;
          var sixliney_pos = 507;
          var cornerbety_pos = 507;
          var basketbetx_pos = 563;
          var i;
          var j;
  
          //zero bet 
          this.zeroselect  = this.add.image(630,360, 'rectanglelayer').setScale(4.7,0.35).setInteractive();
          this.zeroselect.setData({ numbervalue: '0', betplace: true,bettype:'inner', betamountvalue: 0, resetvalue: false, xposition: '630', yposition: '360', groupID: 'str_01', bet_type: 'straight up' });
          this.zeroselect.alpha = 1;
          this.outerbetcontainer.add([this.zeroselect]);
          // this.doublezeroselect = this.add.image(262, 258, 'rectanglelayer').setScale(0.45,0.4).setInteractive();
          // this.doublezeroselect.setData({ numbervalue: '00', betplace: true,bettype:'inner', betamountvalue: 0, resetvalue: false, xposition: '262', yposition: '258', groupID: 'str_02' });
          // this.doublezeroselect.alpha = 0.1;
          // this.outerbetcontainer.add([this.doublezeroselect]);
  
  
          this.cornerbet = this.add.image(422,415, 'circlelayer').setScale(2,2).setInteractive();
          this.cornerbet.setData({ numbervalue: '0,1,2,3', betplace: true,bettype:'inner', betamountvalue: 0, resetvalue: false, xposition: '422', yposition: '415', groupID: 'topL_01', bet_type: 'corner' });
          this.cornerbet.alpha = 1;
          this.innerbetcontainer.add([this.cornerbet]);
  
  
          //STRAIGHTUP BET 
          for(i = 0; i<12; i++) {
  
              groupid = [['str_03','str_04','str_05'],['str_06','str_07','str_08'],['str_09','str_10','str_11'],['str_12','str_13','str_14'],['str_15','str_16','str_17'],['str_18','str_19','str_20'],['str_21','str_22','str_23'],['str_24','str_25','str_26'],['str_27','str_28','str_29'],['str_30','str_31','str_32'],['str_33','str_34','str_35'],['str_36','str_37','str_38']];
  
              groupnumbers = [['1','2','3'],['4','5','6'],['7','8','9'],['10','11','12'],['13','14','15'],['16','17','18'],['19','20','21'],['22','23','24'],['25','26','27'],['28','29','30'],['31','32','33'],['34','35','36']];
  
              x_pos = 492
              for(j = 0; j<3; j++) {
                  this.innerselecpart  = this.add.image(x_pos, y_pos, 'rectanglelayer').setScale(1.2,0.3).setInteractive();
                  this.innerselecpart.alpha = 1;
                  this.innerselecpart.setData({ numbervalue: groupnumbers[i][j], betplace: true,bettype:'inner', betamountvalue: 0, resetvalue: false, xposition: x_pos, yposition: y_pos, groupID: groupid[i][j], bet_type: 'straight up' });
                  this.innerbetcontainer.add([this.innerselecpart]); 
  
                  x_pos += 141;
              }
              y_pos += 92.3;
          }
  
          //SPLIT BET
          for(i = 0; i <12; i++) {
              groupid = [['split_01','split_03'],['split_06','split_08'],['split_11','split_13'],['split_16','split_18'],['split_21','split_23'],['split_26','split_28'],['split_31','split_33'],['split_36','split_38'],['split_41','split_43'],['split_46','split_48'],['split_51','split_53'],['split_56','split_57']];
  
              groupnumbers = [['1,2','2,3'],['4,5','5,6'],['7,8','8,9'],['10,11','11,12'],['13,14','14,15'],['16,17','17,18'],['19,20','20,21'],['22,23','23,24'],['25,26','26,27'],['28,29','29,30'],['31,32','32,33'],['34,35','35,36']];
  
              cornerxpositon = 562;
              for(j = 0; j<2; j++) {
                  this.innersplitpart  = this.add.image(cornerxpositon, cornerypositon, 'circlelayer').setScale(1.2,4).setInteractive();
                  
                  // if(groupnumbers[i][j] == '1,2' || groupnumbers[i][j] == '2,3'){
                  this.innersplitpart.alpha = 1;
                  // }else{
                  // this.innersplitpart.alpha = 1;
                  // }
                  this.innersplitpart.setData({ numbervalue: groupnumbers[i][j], betplace: true,bettype:'inner', betamountvalue: 0, resetvalue: false,xposition:cornerxpositon, yposition:cornerypositon, groupID: groupid[i][j], bet_type: 'split' });
                  this.innerbetcontainer.add([this.innersplitpart]);
  
                  cornerxpositon += 141;
              }
  
              cornerypositon += 92.1;
          }
  
          // //SPLIT BET
          for(i = 0; i<11; i++) {
              groupid = [['split_02','split_04','split_05'],['split_07','split_09','split_10'],['split_12','split_14','split_15'],['split_17','split_19','split_20'],['split_22','split_24','split_25'],['split_27','split_29','split_30'],['split_32','split_34','split_35'],['split_37','split_39','split_40'],['split_42','split_44','split_45'],['split_47','split_49','split_50'],['split_52','split_54','split_55']];
  
              groupnumbers = [['1,4','2,5','3,6'],['4,7','5,8','6,9'],['7,10','8,11','9,12'],['10,13','11,14','12,15'],['13,16','14,17','15,20'],['16,19','17,20','18,21'],['19,22','20,23','21,24'],['22,25','23,26','24,27'],['25,28','26,29','27,30'],['28,31','29,32','30,33'],['31,34','32,35','33,36']];
  
              x_pos = 492;
  
              for(j = 0; j<3; j++) {
                  this.innersplitpart  = this.add.image(x_pos, splity_pos, 'circlelayer').setScale(4,1.2).setInteractive();
                  this.innersplitpart.setData({ numbervalue: groupnumbers[i][j], betplace: true,bettype:'inner', betamountvalue: 0, resetvalue: false,xposition:x_pos, yposition:splity_pos, groupID: groupid[i][j], bet_type: 'split' });
                  
                  // if(groupnumbers[i][j] == '1,4' || groupnumbers[i][j] == '2,5' || groupnumbers[i][j] == '3,6'){
                  this.innersplitpart.alpha = 1;
                  // }else{
                  // this.innersplitpart.alpha = 0.1;
                  // }
                  this.innersplitpart.on('pointerover', function() {
                  },this);
                  this.innerbetcontainer.add([this.innersplitpart]);
                  x_pos += 141;
              }
  
              splity_pos += 92.3;
          }
  
           //STREET BET
          for(i=0; i<12; i++) {
              groupid = ['st_01','st_02','st_03','st_04','st_05','st_06','st_07','st_08','st_09','st_10','st_11','st_12'];
  
              groupnumbers = ['1,2,3,','4,5,6','7,8,9','10,11,12','13,14,15','16,17,18','19,20,21','22,23,24','25,26,27','28,29,30','31,32,33','34,35,36'];
  
               x_pos = 422;
              this.innersplitpart  = this.add.image(x_pos, streety_pos, 'circlelayer').setScale(1.2,4).setInteractive();
              this.innersplitpart.setData({ numbervalue: groupnumbers[i], betplace: true,bettype:'inner', betamountvalue: 0, resetvalue: false,xposition:x_pos, yposition:streety_pos, groupID: groupid[i], bet_type: 'street' });
              // if(groupnumbers[i] == '1,2,3,'){
              this.innersplitpart.alpha = 1;
              // }else{
              // this.innersplitpart.alpha = 0.1;
              // }
              this.innerbetcontainer.add([this.innersplitpart]);
              streety_pos += 92;
          }
  
          // //SIXLINE BET
          for(i=0; i<11; i++) {
              groupid = ['sixL_01','sixL_02','sixL_03','sixL_04','sixL_05','sixL_06','sixL_07','sixL_08','sixL_09','sixL_10','SixL_11'];
  
              groupnumbers = ['1,2,3,4,5,6','4,5,6,7,8,9','7,8,9,10,11,12','10,11,12,13,14,15','13,14,15,16,17,18','16,17,18,19,20,21','19,20,21,22,23,24','22,23,24,25,26,27','25,26,27,28,29,30','28,29,30,31,32,33','31,32,33,34,35,36'];
  
              x_pos = 422;
              this.innersplitpart  = this.add.image(x_pos, sixliney_pos, 'circlelayer').setScale(2).setInteractive();
              this.innersplitpart.alpha = 1;
             this.innersplitpart.setData({ numbervalue: groupnumbers[i], betplace: true,bettype:'inner', betamountvalue: 0, resetvalue: false,xposition:x_pos, yposition:sixliney_pos, groupID: groupid[i], bet_type: 'line' });
             this.innerbetcontainer.add([this.innersplitpart]);
              sixliney_pos += 92.1;
  
          }
  
          // // CORNER BET
          for(i = 0; i<11; i++) {
              groupid = [['corn_01','corn_02'],['corn_03','corn_04'],['corn_05','corn_06'],['corn_07','corn_08'],['corn_09','corn_10'],['corn_11','corn_12'],['corn_13','corn_14'],['corn_15','corn_16'],['corn_17','corn_18'],['corn_19','corn_20'],['corn_21','corn_22']];
  
              groupnumbers = [['1,2,4,5','2,3,5,6'],['4,5,7,8','5,6,8,9'],['7,8,10,11','8,9,11,12'],['10,11,13,14','11,12,14,15'],['13,14,16,17','14,15,17,18'],['16,17,19,20','17,18,20,21'],['19,20,22,23','20,21,23,24'],['22,23,25,26','23,24,26,27'],['25,26,28,29','26,27,29,30'],['28,29,31,32','29,30,32,33'],['31,32,34,35','32,33,35,36']];
  
              x_pos = 563;
              for(j = 0; j<2; j++) {
  
                  this.innersplitpart  = this.add.image(x_pos, cornerbety_pos, 'circlelayer').setScale(2).setInteractive();
                  this.innersplitpart.setData({ numbervalue: groupnumbers[i][j], betplace: true,bettype:'inner', betamountvalue: 0, resetvalue: false, xposition:x_pos, yposition:cornerbety_pos, groupID: groupid[i][j], bet_type: 'corner' });
                  this.innersplitpart.alpha = 1;
                  this.innerbetcontainer.add([this.innersplitpart]);
                  x_pos+=141;
              }
            
              cornerbety_pos+=92.2;
  
          }
  
          // //basket bet
          for(i =0; i<2; i++) {
              groupid = ['bas_01','bas_02'];
              groupnumbers = ['0,1,2','0,2,3'];
              y_pos = 415;
              this.innersplitpart  = this.add.image(basketbetx_pos, y_pos, 'circlelayer').setScale(2).setInteractive();
              this.innersplitpart.setData({ numbervalue: groupnumbers[i], betplace: true,bettype:'inner', betamountvalue: 0, resetvalue: false, xposition:basketbetx_pos, yposition:y_pos,groupID: groupid[i], bet_type: 'street' });
              this.innersplitpart.alpha = 1;
               this.innerbetcontainer.add([this.innersplitpart]);
               basketbetx_pos += 141;
          }
  
          // this.splitdoublezerozeroline = this.add.image(263, 301, 'circlelayer').setScale(1,0.55).setInteractive();
          // this.splitdoublezerozeroline.alpha = 0.1;
          // this.splitdoublezerozeroline.setData({numbervalue: '00,0', betplace: true,bettype:'inner', betamountvalue: 0, resetvalue: false, xposition:'263', yposition:'301' ,groupID: 'split_58' });
          // this.innerbetcontainer.add([this.splitdoublezerozeroline]);
  
          this.splitzerooneline = this.add.image(492, 415 , 'circlelayer').setScale(4,1.2).setInteractive();
          this.splitzerooneline.alpha = 1;
          this.splitzerooneline.setData({numbervalue: '0,1', betplace: true,bettype:'inner', betamountvalue: 0, resetvalue: false, xposition:'492', yposition:'415' ,groupID: 'split_59', bet_type: 'split' });
          this.innerbetcontainer.add([this.splitzerooneline]);
  
          this.splitzerotwoline =  this.add.image(633, 415, 'circlelayer').setScale(4,1.2).setInteractive();
          this.splitzerotwoline.alpha = 1;
          this.splitzerotwoline.setData({numbervalue: '0,2', betplace: true,bettype:'inner', betamountvalue: 0, resetvalue: false, xposition:'633', yposition:'415' ,groupID: 'split_60', bet_type: 'split' });
          this.innerbetcontainer.add([this.splitzerotwoline]);
  
          this.splitdoublezerotwoline = this.add.image(774, 415, 'circlelayer').setScale(4,1.2).setInteractive();
          this.splitdoublezerotwoline.alpha = 1;
          this.splitdoublezerotwoline.setData({numbervalue: '0,3', betplace: true,bettype:'inner', betamountvalue: 0, resetvalue: false, xposition:'774', yposition:'415' ,groupID: 'split_62', bet_type: 'split' });
          this.innerbetcontainer.add([this.splitdoublezerotwoline]);
  
          // this.splitdoublezerothreeline = this.add.image(286, 246, 'circlelayer').setScale(0.4,0.9).setInteractive();
          // this.splitdoublezerothreeline.alpha = 0.1;
          // this.splitdoublezerothreeline.setData({numbervalue: '00,3', betplace: true,bettype:'inner', betamountvalue: 0, resetvalue: false, xposition:'286', yposition:'246' ,groupID: 'split_62' });
          // this.innerbetcontainer.add([this.splitdoublezerothreeline]);
  
          // outerbet selection for bet
          this.outercoloumnone = this.add.image(492, 1567, 'rectanglelayer').setScale(1.3,0.35).setInteractive();
          this.outercoloumnone.alpha = 1;
          this.outercoloumnone.setData({ numbervalue: '1,4,7,10,13,16,19,22,25,28,31,34', bettype: 'outer', betplace: true, betamountvalue: 0, resetvalue: false, xposition:'492', yposition:'1567' , groupID: 'col_1', bet_type: 'column' });
          this.outerbetcontainer.add([this.outercoloumnone]);
          this.outercoloumnone.on('pointerover', function() {
              this.innerbetcontainer.iterate(this.highlight);
          },this);
          this.outercoloumnone.on('pointerout', function() {
              this.innerbetcontainer.iterate(this.removehighlight)
          },this); 
  
          this.outercoloumntwo = this.add.image(633, 1567, 'rectanglelayer').setScale(1.3,0.35).setInteractive();
          this.outercoloumntwo.alpha = 1;
          this.outercoloumntwo.setData({ numbervalue: '2,5,8,11,14,17,20,23,26,29,32,35', bettype: 'outer', betplace: true, betamountvalue: 0, resetvalue: false, xposition:'633', yposition:'1567' , groupID: 'col_2', bet_type: 'column' });
          this.outerbetcontainer.add([this.outercoloumntwo]);
          this.outercoloumntwo.on('pointerover', function() {
              this.innerbetcontainer.iterate(this.highlightcolumn2);
          },this);
          this.outercoloumntwo.on('pointerout', function() {
              this.innerbetcontainer.iterate(this.removehighlightcolumn2);
          },this);
  
          this.outercolumnthree = this.add.image(774, 1567, 'rectanglelayer').setScale(1.3,0.35).setInteractive();
          this.outercolumnthree.alpha = 1;
          this.outercolumnthree.setData({ numbervalue: '3,6,9,12,15,18,21,24,27,30,33,36', bettype: 'outer', betplace: true, betamountvalue: 0, resetvalue: false,xposition:'774', yposition:'1567' , groupID: 'col_3', bet_type: 'column' });
          this.outerbetcontainer.add([this.outercolumnthree]);
          this.outercolumnthree.on('pointerover', function() {
              this.innerbetcontainer.iterate(this.highlightcolumn3);
          },this);
          this.outercolumnthree.on('pointerout', function() {
              this.innerbetcontainer.iterate(this.removehighlightcolumn3);
          },this);
  
          this.outerrowone = this.add.image(375 , 600, 'rectanglelayer').setScale(0.6,1.7).setInteractive();
          this.outerrowone.alpha = 1;
          this.outerrowone.setData({ numbervalue: '1,2,3,4,5,6,7,8,9,10,11,12', bettype: 'outer', betplace: true, betamountvalue: 0, resetvalue: false,xposition:'375', yposition:'600', groupID: 'doz_1', bet_type: 'column' });
          this.outerbetcontainer.add([this.outerrowone]);
          this.outerrowone.on('pointerover', function() {
              this.innerbetcontainer.iterate(this.highlightrow1);
          },this);
          this.outerrowone.on('pointerout', function() {
              this.innerbetcontainer.iterate(this.removehighlightrow1);
          },this);
  
          this.outerrowtwo = this.add.image(375 , 965, 'rectanglelayer').setScale(0.6,1.7).setInteractive();
          this.outerrowtwo.alpha = 1;
          this.outerrowtwo.setData({ numbervalue: '13,14,15,16,17,18,19,20,21,22,23,24', bettype: 'outer', betplace: true, betamountvalue: 0, resetvalue: false,xposition:'375', yposition:'965' , groupID: 'doz_2', bet_type: 'column' });
          this.outerbetcontainer.add([this.outerrowtwo]);
          this.outerrowtwo.on('pointerover', function() {
              this.innerbetcontainer.iterate(this.highlightrow2);
          },this);
          this.outerrowtwo.on('pointerout', function() {
              this.innerbetcontainer.iterate(this.removehighlightrow2);
          },this);
  
          this.outerrowthree = this.add.image(375 , 1335, 'rectanglelayer').setScale(0.6,1.7).setInteractive();
          this.outerrowthree.alpha = 1;
          this.outerrowthree.setData({ numbervalue: '25,26,27,28,29,30,31,32,33,34,35,36', bettype: 'outer', betplace: true, betamountvalue: 0, resetvalue: false,xposition:'375', yposition:'1335' , groupID: 'doz_3', bet_type: 'column' });
          this.outerbetcontainer.add([this.outerrowthree]);
          this.outerrowthree.on('pointerover', function() {
              this.innerbetcontainer.iterate(this.highlightrow3);
          },this);
          this.outerrowthree.on('pointerout', function() {
              this.innerbetcontainer.iterate(this.removehighlightrow3);
          },this);
  
          //low selection 
          this.lowselection = this.add.image(282, 505, 'rectanglelayer').setScale(0.6,0.8).setInteractive();
          this.lowselection.alpha = 1;
          this.lowselection.setData({ numbervalue: '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18', bettype: 'outer', betplace: true, betamountvalue: 0, resetvalue: false,xposition:'282', yposition:'505' , groupID: 'lowNum', bet_type: 'high-low' });
          this.outerbetcontainer.add([this.lowselection]);
          this.lowselection.on('pointerover', function() {
          this.innerbetcontainer.iterate(this.highlightlownumbers);
          },this);
          this.lowselection.on('pointerout', function() {
              this.innerbetcontainer.iterate(this.removehighlightlownumbers);
          },this);
  
          this.evenselection = this.add.image(282, 690, 'rectanglelayer').setScale(0.6,0.8).setInteractive();
          this.evenselection.alpha = 1;
          this.evenselection.setData({ numbervalue: '2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36', bettype: 'outer', betplace: true, betamountvalue: 0, resetvalue: false,xposition:'282', yposition:'690' , groupID: 'evenNum', bet_type: 'odd-even' });
          this.outerbetcontainer.add([this.evenselection]);
          this.evenselection.on('pointerover', function() {
          this.innerbetcontainer.iterate(this.highlightevennum);
          },this);
          this.evenselection.on('pointerout', function() {
              this.innerbetcontainer.iterate(this.removehighlightevennum);
          },this);
  
          this.redselection = this.add.image(282, 875, 'rectanglelayer').setScale(0.6,0.8).setInteractive();
          this.redselection.alpha = 1;
          this.redselection.setData({ numbervalue: '1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36', bettype: 'outer', betplace: true, betamountvalue: 0, resetvalue: false,xposition:'282', yposition:'875' , groupID: 'redNum', bet_type: 'red-black' });
          this.outerbetcontainer.add([this.redselection]);
          this.redselection.on('pointerover', function() {
              this.innerbetcontainer.iterate(this.highlightredselect);
          },this);
              this.redselection.on('pointerout', function() {
              this.innerbetcontainer.iterate(this.removehighlightredselect);
          },this);
  
          this.blackseletion = this.add.image(282, 1060, 'rectanglelayer').setScale(0.6,0.8).setInteractive();
          this.blackseletion.alpha = 1;
          this.blackseletion.setData({ numbervalue: '2,4,6,8,10,11,13,15,17,20,22,24,26,28,29,31,33,35', bettype: 'outer', betplace: true, betamountvalue: 0, resetvalue: false,xposition:'282', yposition:'1060' , groupID: 'blackNum', bet_type: 'red-black' });
          this.outerbetcontainer.add([this.blackseletion]);
          this.blackseletion.on('pointerover', function() {
              this.innerbetcontainer.iterate(this.highlightblackselect);
          },this);
              this.blackseletion.on('pointerout', function() {
              this.innerbetcontainer.iterate(this.removehighlightblackselect);
          },this);  
  
          this.oddselection = this.add.image(282, 1245, 'rectanglelayer').setScale(0.6,0.8).setInteractive();
          this.oddselection.alpha = 1;
          this.oddselection.setData({ numbervalue: '1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35', bettype: 'outer', betplace: true, betamountvalue: 0, resetvalue: false,xposition:'282', yposition:'1245' , groupID: 'oddNum', bet_type: 'odd-even' });
          this.outerbetcontainer.add([this.oddselection]);
          this.oddselection.on('pointerover', function() {
              this.innerbetcontainer.iterate(this.highlightoddselect);
          },this);
              this.oddselection.on('pointerout', function() {
              this.innerbetcontainer.iterate(this.removehighlightoddselect);
          },this);  
  
          this.highselection = this.add.image(282, 1430, 'rectanglelayer').setScale(0.6,0.8).setInteractive();
          this.highselection.alpha = 1;
          this.highselection.setData({ numbervalue: '19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36', bettype: 'outer', betplace: true, betamountvalue: 0, resetvalue: false,xposition:'282', yposition:'1430' , groupID: 'highNum', bet_type: 'high-low' });
          this.outerbetcontainer.add([this.highselection]);
          this.highselection.on('pointerover', function() {
          this.innerbetcontainer.iterate(this.highlighthighselect);
          },this);
              this.highselection.on('pointerout', function() {
              this.innerbetcontainer.iterate(this.removehighlighthighselect);
          },this);
  
          this.innerbetcontainer.depth = 10;
          this.outerbetcontainer.depth = 10;  
  
      }

   // highlight column 1 to 34 
    highlight(children) {
       
      if(children.data.list == null && children.data.list != undefined) {
           return;
      }

      if(parseInt(children.data.list.numbervalue) == 1 || parseInt(children.data.list.numbervalue) == 4 || parseInt(children.data.list.numbervalue) == 7 || parseInt(children.data.list.numbervalue) == 10 || parseInt(children.data.list.numbervalue) == 13 || parseInt(children.data.list.numbervalue) == 16 || parseInt(children.data.list.numbervalue) == 19 || parseInt(children.data.list.numbervalue) == 22 || parseInt(children.data.list.numbervalue) == 25 || parseInt(children.data.list.numbervalue) == 28 || parseInt(children.data.list.numbervalue) == 31 || parseInt(children.data.list.numbervalue) == 34 ) {
           if(children.data.list.numbervalue.indexOf(',') == -1) {
               children.alpha = 0.7;
              
           }
         
       }
   }

   //remove highlight column 1 to 34 
   removehighlight(children) {
       if(children.data.list == null && children.data.list != undefined) {
           return;
       }

      if(parseInt(children.data.list.numbervalue) == 1 || parseInt(children.data.list.numbervalue) == 4 || parseInt(children.data.list.numbervalue) == 7 || parseInt(children.data.list.numbervalue) == 10 || parseInt(children.data.list.numbervalue) == 13 || parseInt(children.data.list.numbervalue) == 16 || parseInt(children.data.list.numbervalue) == 19 || parseInt(children.data.list.numbervalue) == 22 || parseInt(children.data.list.numbervalue) == 25 || parseInt(children.data.list.numbervalue) == 28 || parseInt(children.data.list.numbervalue) == 31 || parseInt(children.data.list.numbervalue) == 34 ) {
           if(children.data.list.numbervalue.indexOf(',') == -1) {
               children.alpha = 0.01;
              
           }
      }
   }

   //show highlight column 2 to 35
   highlightcolumn2(children) {
       if(children.data.list == null && children.data.list != undefined) {
           return;
       }

      if(parseInt(children.data.list.numbervalue) == 2 || parseInt(children.data.list.numbervalue) == 5 || parseInt(children.data.list.numbervalue) == 8 || parseInt(children.data.list.numbervalue) == 11 || parseInt(children.data.list.numbervalue) == 14 || parseInt(children.data.list.numbervalue) == 17 || parseInt(children.data.list.numbervalue) == 20 || parseInt(children.data.list.numbervalue) == 23 || parseInt(children.data.list.numbervalue) == 26 || parseInt(children.data.list.numbervalue) == 29 || parseInt(children.data.list.numbervalue) == 32 || parseInt(children.data.list.numbervalue) == 35 ) {
           if(children.data.list.numbervalue.indexOf(',') == -1) {
               children.alpha = 0.7;
              
           }
      }
   }

   //remve highlight column 2 to 35
   removehighlightcolumn2(children) {
       if(children.data.list == null && children.data.list != undefined) {
           return;
       }

      if(parseInt(children.data.list.numbervalue) == 2 || parseInt(children.data.list.numbervalue) == 5 || parseInt(children.data.list.numbervalue) == 8 || parseInt(children.data.list.numbervalue) == 11 || parseInt(children.data.list.numbervalue) == 14 || parseInt(children.data.list.numbervalue) == 17 || parseInt(children.data.list.numbervalue) == 20 || parseInt(children.data.list.numbervalue) == 23 || parseInt(children.data.list.numbervalue) == 26 || parseInt(children.data.list.numbervalue) == 29 || parseInt(children.data.list.numbervalue) == 32 || parseInt(children.data.list.numbervalue) == 35 ) {
           if(children.data.list.numbervalue.indexOf(',') == -1) {
               children.alpha = 0.01;
              
           }
      }
   }

   //show highlight column 3 to 36
   highlightcolumn3(children) {

       if(children.data.list == null && children.data.list != undefined) {
           return;
       }

      if(parseInt(children.data.list.numbervalue) == 3 || parseInt(children.data.list.numbervalue) == 6 || parseInt(children.data.list.numbervalue) == 9 || parseInt(children.data.list.numbervalue) == 12 || parseInt(children.data.list.numbervalue) == 15 || parseInt(children.data.list.numbervalue) == 18 || parseInt(children.data.list.numbervalue) == 21 || parseInt(children.data.list.numbervalue) == 24 || parseInt(children.data.list.numbervalue) == 27 || parseInt(children.data.list.numbervalue) == 30 || parseInt(children.data.list.numbervalue) == 33 || parseInt(children.data.list.numbervalue) == 36 ) {
           if(children.data.list.numbervalue.indexOf(',') == -1) {
               children.alpha = 0.7;
              
           }
      }
   }

   //remove highlight column 3 to 36
   removehighlightcolumn3(children) {
       if(children.data.list == null && children.data.list != undefined) {
           return;
       }

      if(parseInt(children.data.list.numbervalue) == 3 || parseInt(children.data.list.numbervalue) == 6 || parseInt(children.data.list.numbervalue) == 9 || parseInt(children.data.list.numbervalue) == 12 || parseInt(children.data.list.numbervalue) == 15 || parseInt(children.data.list.numbervalue) == 18 || parseInt(children.data.list.numbervalue) == 21 || parseInt(children.data.list.numbervalue) == 24 || parseInt(children.data.list.numbervalue) == 27 || parseInt(children.data.list.numbervalue) == 30 || parseInt(children.data.list.numbervalue) == 33 || parseInt(children.data.list.numbervalue) == 36 ) {
           if(children.data.list.numbervalue.indexOf(',') == -1) {
               children.alpha = 0.01;
              
           }
      }
   }

   //show highlight row 1 to 12
   highlightrow1(children) {
       if(children.data.list == null && children.data.list != undefined) {
           return;
       }

      if(parseInt(children.data.list.numbervalue) >0 && parseInt(children.data.list.numbervalue) < 13) {
           if(children.data.list.numbervalue.indexOf(',') == -1) {
               children.alpha = 0.7;
              
           }
      }
   }

   //remove highlight row 1 to 12
   removehighlightrow1(children) {
       if(children.data.list == null && children.data.list != undefined) {
           return;
       }

      if(parseInt(children.data.list.numbervalue) >0 && parseInt(children.data.list.numbervalue) <13) {
           if(children.data.list.numbervalue.indexOf(',') == -1) {
               children.alpha = 0.01;
              
           }
      }
   }

   //show highlight row 13 to 24
   highlightrow2(children) {
       if(children.data.list == null && children.data.list != undefined) {
           return;
       }

      if(parseInt(children.data.list.numbervalue) > 12 && parseInt(children.data.list.numbervalue) < 25) {
           if(children.data.list.numbervalue.indexOf(',') == -1) {
               children.alpha = 0.7;
              
           }
      }
   }

   //remove highlight row 13 to 24
   removehighlightrow2(children) {
       if(children.data.list == null && children.data.list != undefined) {
           return;
       }

      if(parseInt(children.data.list.numbervalue) >12 && parseInt(children.data.list.numbervalue) < 25) {
           if(children.data.list.numbervalue.indexOf(',') == -1) {
               children.alpha = 0.01;
              
           }
      }
   }

   //show highlight row 24 to 36
   highlightrow3(children) {
       if(children.data.list == null && children.data.list != undefined) {
           return;
       }

      if(parseInt(children.data.list.numbervalue) > 24 && parseInt(children.data.list.numbervalue) < 37) {
           if(children.data.list.numbervalue.indexOf(',') == -1) {
               children.alpha = 0.7;
              
           }
      }
   }

   //remove highlight row 24 to 36
   removehighlightrow3(children) {
       if(children.data.list == null && children.data.list != undefined) {
           return;
       }

      if(parseInt(children.data.list.numbervalue) >24 && parseInt(children.data.list.numbervalue) < 37) {
           if(children.data.list.numbervalue.indexOf(',') == -1) {
               children.alpha = 0.01;
              
           }
      }
   }

   //show highlight low numbers 1 to 18
   highlightlownumbers(children) {
       if(children.data.list == null && children.data.list != undefined) {
           return;
       }

       if(parseInt(children.data.list.numbervalue) >0 && parseInt(children.data.list.numbervalue) < 19) {
           if(children.data.list.numbervalue.indexOf(',') == -1) {
               children.alpha = 0.7;
              
           }
      }
   }

   //remove highlight low numbers 1 to 18
   removehighlightlownumbers(children) {
       if(children.data.list == null && children.data.list != undefined) {
           return;
       }

       if(parseInt(children.data.list.numbervalue) >0 && parseInt(children.data.list.numbervalue) < 19) {
           if(children.data.list.numbervalue.indexOf(',') == -1) {
               children.alpha = 0.01;
              
           }
      }
   }

   //show highlight of even numbers
   highlightevennum(children) {
       if(children.data.list == null && children.data.list != undefined) {
           return;
       }

       if(parseInt(children.data.list.numbervalue) % 2 == 0 && children.data.list.numbervalue.indexOf(',') == -1) {
          
           children.alpha = 0.7;

      }
   }

   //remove highlight of even numbers
   removehighlightevennum(children) {
       if(children.data.list == null && children.data.list != undefined) {
           return;
       }

       if(parseInt(children.data.list.numbervalue) % 2 == 0 && children.data.list.numbervalue.indexOf(',') == -1) {
          
           children.alpha = 0.01;

      }
   }

   //show highlight of red selection numbers
   highlightredselect(children) {
       
       if(children.data.list == null && children.data.list != undefined) {
           return;
       }

       if(parseInt(children.data.list.numbervalue) == 1 || parseInt(children.data.list.numbervalue) == 3 || parseInt(children.data.list.numbervalue) == 5 || parseInt(children.data.list.numbervalue) == 7 || parseInt(children.data.list.numbervalue) == 9 || parseInt(children.data.list.numbervalue) == 12 || parseInt(children.data.list.numbervalue) == 14 || parseInt(children.data.list.numbervalue) == 16 || parseInt(children.data.list.numbervalue) == 18 || parseInt(children.data.list.numbervalue) == 19 || parseInt(children.data.list.numbervalue) == 21 || parseInt(children.data.list.numbervalue) == 23 || parseInt(children.data.list.numbervalue) == 25 || parseInt(children.data.list.numbervalue) ==27 || parseInt(children.data.list.numbervalue) ==30 || parseInt(children.data.list.numbervalue) ==32 || parseInt(children.data.list.numbervalue) ==34 || parseInt(children.data.list.numbervalue) == 36) {
           if(children.data.list.numbervalue.indexOf(',') == -1) {
               children.alpha = 0.7;
              
           }
         
       }
   }
   
   //remove highlight of red selection numbers
   removehighlightredselect(children) {
       if(children.data.list == null && children.data.list != undefined) {
           return;
       }

       if(parseInt(children.data.list.numbervalue) == 1 || parseInt(children.data.list.numbervalue) == 3 || parseInt(children.data.list.numbervalue) == 5 || parseInt(children.data.list.numbervalue) == 7 || parseInt(children.data.list.numbervalue) == 9 || parseInt(children.data.list.numbervalue) == 12 || parseInt(children.data.list.numbervalue) == 14 || parseInt(children.data.list.numbervalue) == 16 || parseInt(children.data.list.numbervalue) == 18 || parseInt(children.data.list.numbervalue) == 19 || parseInt(children.data.list.numbervalue) == 21 || parseInt(children.data.list.numbervalue) == 23 || parseInt(children.data.list.numbervalue) == 25 || parseInt(children.data.list.numbervalue) ==27 || parseInt(children.data.list.numbervalue) == 30 || parseInt(children.data.list.numbervalue) ==32 || parseInt(children.data.list.numbervalue) ==34 || parseInt(children.data.list.numbervalue) == 36) {
           if(children.data.list.numbervalue.indexOf(',') == -1) {
               children.alpha = 0.01;
              
           }
         
       }
   }

   //show highlight of black selection numbers
   highlightblackselect(children) {
       
       if(children.data.list == null && children.data.list != undefined) {
           return;
       }

       if(parseInt(children.data.list.numbervalue) == 2 || parseInt(children.data.list.numbervalue) == 4 || parseInt(children.data.list.numbervalue) == 6 || parseInt(children.data.list.numbervalue) == 8 || parseInt(children.data.list.numbervalue) == 10 || parseInt(children.data.list.numbervalue) == 11 || parseInt(children.data.list.numbervalue) == 13 || parseInt(children.data.list.numbervalue) == 15 || parseInt(children.data.list.numbervalue) == 17 || parseInt(children.data.list.numbervalue) == 20 || parseInt(children.data.list.numbervalue) == 22 || parseInt(children.data.list.numbervalue) == 24 || parseInt(children.data.list.numbervalue) == 26 || parseInt(children.data.list.numbervalue) == 28 || parseInt(children.data.list.numbervalue) == 29 || parseInt(children.data.list.numbervalue) ==31 || parseInt(children.data.list.numbervalue) ==33 || parseInt(children.data.list.numbervalue) == 35) {
           if(children.data.list.numbervalue.indexOf(',') == -1) {
               children.alpha = 0.7;
              
           }
         
       }

   }

   //remove highlight of black selection numbers
   removehighlightblackselect(children) {
       if(children.data.list == null && children.data.list != undefined) {
           return;
       }

       if(parseInt(children.data.list.numbervalue) == 2 || parseInt(children.data.list.numbervalue) == 4 || parseInt(children.data.list.numbervalue) == 6 || parseInt(children.data.list.numbervalue) == 8 || parseInt(children.data.list.numbervalue) == 10 || parseInt(children.data.list.numbervalue) == 11 || parseInt(children.data.list.numbervalue) == 13 || parseInt(children.data.list.numbervalue) == 15 || parseInt(children.data.list.numbervalue) == 17 || parseInt(children.data.list.numbervalue) == 20 || parseInt(children.data.list.numbervalue) == 22 || parseInt(children.data.list.numbervalue) == 24 || parseInt(children.data.list.numbervalue) == 26 || parseInt(children.data.list.numbervalue) == 28 || parseInt(children.data.list.numbervalue) == 29 || parseInt(children.data.list.numbervalue) ==31 || parseInt(children.data.list.numbervalue) ==33 || parseInt(children.data.list.numbervalue) == 35) {
           if(children.data.list.numbervalue.indexOf(',') == -1) {
               children.alpha = 0.01;
              
           }
         
       }
   }

   //highlight of odd selection numbers
   highlightoddselect(children) {
       if(children.data.list == null && children.data.list != undefined) {
           return;
       }

       if(parseInt(children.data.list.numbervalue) % 2 != 0 && children.data.list.numbervalue.indexOf(',') == -1) {
          
           children.alpha = 0.7;

      }
   }

   //remove highlight of odd selection numbers
   removehighlightoddselect(children) {
       if(children.data.list == null && children.data.list != undefined) {
           return;
       }

       if(parseInt(children.data.list.numbervalue) % 2 != 0 && children.data.list.numbervalue.indexOf(',') == -1) {
          
           children.alpha = 0.01;

      }
   }

   //highlight of high selection numbers
   highlighthighselect(children) {
       if(children.data.list == null && children.data.list != undefined) {
           return;
       }

       if(parseInt(children.data.list.numbervalue) >18 && parseInt(children.data.list.numbervalue) <37) {
          if(children.data.list.numbervalue.indexOf(',') == -1) {
               children.alpha = 0.7;
              
           }
      }
   }

   //remove highlight of high selection numbers
   removehighlighthighselect(children) {
       if(children.data.list == null && children.data.list != undefined) {
           return;
       }

       if(parseInt(children.data.list.numbervalue) >18 && parseInt(children.data.list.numbervalue) <37) {
           if(children.data.list.numbervalue.indexOf(',') == -1) {
               children.alpha = 0.01;
              
           }

       }
   }

    // this function is used to showing betcoins
    showingbetcoins() {
      if(this.betcoincontainer != undefined) {
        this.betcoincontainer.destroy();
      }

      if(this.buttoncontainer != undefined) {
        this.buttoncontainer.destroy();
      }

      this.betcoincontainer = this.add.container();
      this.buttoncontainer = this.add.container();

      initial_data.data.chipDetail.chip_values.sort();

      for(let h = initial_data.data.chipDetail.chip_values.length-1; h>=0; h--) {
          this.coinsimages = this.add.image(coinsxarray[h], coinsyarray[h], coinstexture[h]).setScale(1).setInteractive();
          this.coinstext = this.add.text(coinsxarray[h], coinsyarray[h]-1, initial_data.data.chipDetail.chip_values[h],{
           fontSize:'25px',
           fill:'white',
           fontStyle:'bold',
           fontFamily:'Arial'
          }).setOrigin(0.5);
          this.coinsimages.setData({ coinvalue: initial_data.data.chipDetail.chip_values[h], imagetexture: coinstexture[h], betcoin: true, changechip:false});
          this.coinstext.setData({changechip:false});
          this.betcoincontainer.add([this.coinsimages,this.coinstext]);
          this.betcoincontainer.depth = 2;
      }

      localStorage.setItem('amecoinamt', parseInt(initial_data.data.chipDetail.chip_values[0]));
      localStorage.setItem('amecoinimg', coinstexture[0]);
      localStorage.setItem('amexposition', 980);
      localStorage.setItem('ameyposition', 870);
      localStorage.setItem('highlightimg', 'chip_selected');

      var highlighimg = localStorage.getItem('highlightimg');
      var coinxpos = parseInt(localStorage.getItem('amexposition'));
      var coinypos = parseInt(localStorage.getItem('ameyposition'));
      if(this.coinhighlight != undefined) {
        this.coinhighlight.destroy();
      }
      this.coinhighlight = this.add.image(coinxpos,coinypos,highlighimg).setScale(0.4);

      this.undo = this.add.image(980,720,'undo').setScale(1);
      this.double = this.add.image(980,1020,'double').setScale(1);
      this.double.setData({ buttonvalue: 'doubleup' });
      this.autoplay = this.add.image(980,1170,'autoplay').setScale(1);
      this.buttoncontainer.add([this.undo,this.double,this.autoplay]);
  }


    headersection() {
      this.profileimg_bg = this.add.image(100,80,'chip_selected').setScale(0.3);
      this.influencer_displayname = this.add.text(280,60, initial_data.data.gamesinfo.influencer_info.displayname.toUpperCase(), {
        fill: 'white',
        fontFamily: 'Arial',
        fontSize: 'bold 35px',
        align: 'right'
      }).setOrigin(0.5);
      
      this.influencer_followers = this.add.text(250,100, initial_data.data.gamesinfo.influencer_info.followers + ' followers', {
        fill: 'white',
        fontFamily: 'Arial Narrow',
        fontSize: '35px',
        align: 'left'
      }).setOrigin(0.5);
      
      this.follow_bg = this.add.image(400,100,'follow_bg').setScale(1);
      this.followbtn_text = this.add.text(400,100,'+Follow', {
        fill: 'black',
        fontFamily: 'Arial',
        fontSize: 'bold 20px',
        align: 'left'
      }).setOrigin(0.5);

      this.menu_icon = this.add.image(970,80,'menu_icon').setScale(0.9);

      this.balance_title = this.add.text(100,180,'Balance', {
        fill: 'white',
        fontFamily: 'Arial Narrow',
        fontSize: '30px',
        align: 'left'
      }).setOrigin(0.5);
      this.balance_title = this.add.text(100,220,initial_data.data.userinfo.currency_Symbol + '250', {
        fill: '#efc335',
        fontFamily: 'Arial',
        fontSize: '30px',
        align: 'left'
      }).setOrigin(0.5);

      this.balance_title = this.add.text(350,180,'Higher Bet', {
        fill: 'white',
        fontFamily: 'Arial Narrow',
        fontSize: '30px',
        align: 'left'
      }).setOrigin(0.5);
      this.balance_title = this.add.text(350,220,initial_data.data.userinfo.currency_Symbol + '250', {
        fill: '#efc335',
        fontFamily: 'Arial',
        fontSize: '30px',
        align: 'left'
      }).setOrigin(0.5);

      this.balance_title = this.add.text(600,180,'Min-Max Bet', {
        fill: 'white',
        fontFamily: 'Arial Narrow',
        fontSize: '30px',
        align: 'left'
      }).setOrigin(0.5);
      this.balance_title = this.add.text(600,220,initial_data.data.userinfo.currency_Symbol + initial_data.data.chipDetail.bet_configuration.minbet + '-' + initial_data.data.chipDetail.bet_configuration.maxbet, {
        fill: '#efc335',
        fontFamily: 'Arial',
        fontSize: '30px',
        align: 'left'
      }).setOrigin(0.5);

      this.balance_title = this.add.text(900,180,'2022-10-23#13:35:00', {
        fill: 'white',
        fontFamily: 'Arial Narrow',
        fontSize: '30px',
        align: 'left'
      }).setOrigin(0.5);
      this.profileimg_bg = this.add.image(900,220,'views_bg').setScale(1);
      // this.profileimg_bg = this.add.image(820,220,'chip_selected').setScale(0.1);
      // this.profileimg_bg = this.add.image(810,220,'chip_selected').setScale(0.1);
      // this.profileimg_bg = this.add.image(800,220,'chip_selected').setScale(0.1);
      // this.profileimg_bg = this.add.image(790,220,'chip_selected').setScale(0.1);
      this.profileimg_bg = this.add.image(900,220,'views_icon').setScale(1);
      this.balance_title = this.add.text(960,220,'200000', {
        fill: 'white',
        fontFamily: 'Arial Narrow',
        fontSize: '30px',
        align: 'left'
      }).setOrigin(0.5);
    }

    footersection() {
      if(this.chatdomcontainer != undefined) {
        this.chatdomcontainer.destroy();
    }

    this.chatdomcontainer = this.add.container();
    this.chat_dom = this.add.dom(540, 1790).createFromCache('chat_dom').setScale(2.6);
    this.chatdomcontainer.add(this.chat_dom); 
    }


    turn_timer() {
      // console.log("turn_timer");
      // var timerTextcolor;
      if (this.timerContainer != undefined) {
          this.timerContainer.destroy();
      }
      
      if(show_timer_in_betscreen){
          this.timerContainer = this.add.container().setDepth(50);
          this.timertext = this.add.text(150,330, remaining_time, {
              fontSize: 'Bold 46px',
              fontFamily: 'Arial',
              fill: 'white',
          }).setOrigin(0.5);
          this.timerContainer.add([this.timertext]);
        }
         
      timerplayer = setTimeout(function() {
          if (remaining_time == 1) {
            show_timer_in_betscreen = false;
              destroyTimer = true;
              clearTimeout(timerplayer);
          } else {
            remaining_time = remaining_time - 1;
              showtimer = true;
          }
      }, 1000);
  }


      //this function is used on spin button functionalty
    onspinevents() {
        // this.buttonsound();
          // if(betgroupidarray == '' || betnumberarray == '' || betamountarray == '') {
          //     this.selectchipspopup('Please Place Bet');
          // } 
          // else {
  
                  if(this.betcoincontainer != undefined) {
                    this.betcoincontainer.destroy();
                  }
  
                  if(this.buttoncontainer != undefined) {
                    this.buttoncontainer.destroy();
                  }

                  if(this.coinhighlight != undefined) {
                      this.coinhighlight.destroy();
                  }

                  if(this.roulettecontainer != undefined) {
                    this.roulettecontainer.destroy();
                }
                  this.roulettecontainer = this.add.container(900,0);
                  this.betwheelouter = this.add.image(540,960,'wheelouter').setScale(1);
                  this.betwheel = this.add.image(540,960,'wheel').setScale(1);
                  this.roulettecontainer.add([this.betwheelouter,this.betwheel]);
                  this.roulettecontainer.depth = 5;

                  
                  var tween = this.tweens.add({
                      targets: this.table,
                      x: -320,
                      ease: 'Linear',
                      duration: 400,
                      yoyo: false,
                      repeat: 0
                      
                  },this);
                  var tween = this.tweens.add({
                      targets: [this.coinplacecontainer,this.innerbetcontainer,this.outerbetcontainer],
                      x: -850,
                      ease: 'Linear',
                      duration: 400,
                      yoyo: false,
                      repeat: 0
                      
                  },this);
  
                  var tween = this.tweens.add({
                      targets: this.roulettecontainer,
                      x: 0,
                      ease: 'Linear',
                      duration: 400,
                      repeat: 0,
                      onComplete:this.startAnimate(),
                      onCompleteScope:this
                      
                  },this);
                  
                      
          // }   
  
      }

    
  // Animation for betWheel
  startAnimate() {
//   if(this.betwheel != undefined){
//     this.betwheel.destroy();
//     // this.betwheel = this.add.image(540,960,'wheel').setScale(0.42).setDepth(2);
//   }

if(diamond1 != undefined) {
  diamond1.destroy();
}
      
diamond1 = this.add.image(769, 394, 'ball').setScale(1).setDepth(6).setVisible(true);

  this.createnumbers();
  betwheelstart = true;
  rotation = true;
  updatexy = false;
  decreaserotation = true;
  select_randomnum = true;
  rotateSpeed = 0.2;
  revolveAround = 330;
  
}

    createnumbers(){
    
        if(this.numberContainer != undefined){
          this.numberContainer.destroy();
        }
        
        this.numberContainer = this.add.container();
        this.text1 = this.add.text(730, 955, '34', {
          fill: 'white',
          fontFamily: 'Arial',
          fontSize: '25px'
        }).setOrigin(0.5).setVisible(false);
        this.text1.setData({ value: 0 });

        this.text2 = this.add.text(727.40, 988, '6', {
          fill: 'white',
          fontFamily: 'Arial',
          fontSize: '25px'
        }).setOrigin(0.5).setVisible(false);
        this.text2.setData({ value: 1 });

        this.text3 = this.add.text(719.7, 1020, '27', {
          fill: 'white',
          fontFamily: 'Arial',
          fontSize: '25px'
        }).setOrigin(0.5).setVisible(false);
        this.text3.setData({ value: 2 });

        this.text4 = this.add.text(707.1, 1050.4, '13', {
          fill: 'white',
          fontFamily: 'Arial',
          fontSize: '25px'
        }).setOrigin(0.5).setVisible(false);
        this.text4.setData({ value: 3 });

        this.text5 = this.add.text(690, 1076.70, '36', {
          fill: 'white',
          fontFamily: 'Arial',
          fontSize: '25px'
        }).setOrigin(0.5).setVisible(false);
        this.text5.setData({ value: 4 });

        this.text6 = this.add.text(668.7, 1100, '11', {
          fill: 'white',
          fontFamily: 'Arial',
          fontSize: '25px'
        }).setOrigin(0.5).setVisible(false);
        this.text6.setData({ value: 5 });

        this.text7 = this.add.text(642, 1120, '30', {
          fill: 'white',
          fontFamily: 'Arial',
          fontSize: '25px'
        }).setOrigin(0.5).setVisible(false);
        this.text7.setData({ value: 6 });

        this.text8 = this.add.text(616.3, 1139, '8', {
          fill: 'white',
          fontFamily: 'Arial',
          fontSize: '25px'
        }).setOrigin(0.5).setVisible(false);
        this.text8.setData({ value: 7 });

        this.text9 = this.add.text(582, 1145, '23', {
          fill: 'white',
          fontFamily: 'Arial',
          fontSize: '25px'
        }).setOrigin(0.5).setVisible(false);
        this.text9.setData({ value: 8 });

        this.text10 = this.add.text(550, 1150, '10', {
          fill: 'white',
          fontFamily: 'Arial',
          fontSize: '25px'
        }).setOrigin(0.5).setVisible(false);
        this.text10.setData({ value: 9 });

        this.text11 = this.add.text(518, 1152, '5', {
          fill: 'white',
          fontFamily: 'Arial',
          fontSize: '25px'
        }).setOrigin(0.5).setVisible(false);
        this.text11.setData({ value: 10 });

        this.text12 = this.add.text(490, 1146, '24', {
          fill: 'white',
          fontFamily: 'Arial',
          fontSize: '25px'
        }).setOrigin(0.5).setVisible(false);
        this.text12.setData({ value: 11 });

        this.text13 = this.add.text(456, 1132, '16', {
          fill: 'white',
          fontFamily: 'Arial',
          fontSize: '25px'
        }).setOrigin(0.5).setVisible(false);
        this.text13.setData({ value: 12 });

        this.text14 = this.add.text(430, 1120, '33', {
            fill: 'white',
            fontFamily: 'Arial',
            fontSize: '25px'
          }).setOrigin(0.5).setVisible(false);
          this.text14.setData({ value: 13 });

          this.text15 = this.add.text(405, 1099.8, '1', {
            fill: 'white',
            fontFamily: 'Arial',
            fontSize: '25px'
          }).setOrigin(0.5).setVisible(false);
          this.text15.setData({ value: 14 });

          this.text16 = this.add.text(385, 1076.7, '20', {
            fill: 'white',
            fontFamily: 'Arial',
            fontSize: '25px'
          }).setOrigin(0.5).setVisible(false);
          this.text16.setData({ value: 15 });

          this.text17 = this.add.text(366, 1047, '14', {
            fill: 'white',
            fontFamily: 'Arial',
            fontSize: '25px'
          }).setOrigin(0.5).setVisible(false);
          this.text17.setData({ value: 16 });

          this.text18 = this.add.text(355, 1020, '31', {
            fill: 'white',
            fontFamily: 'Arial',
            fontSize: '25px'
          }).setOrigin(0.5).setVisible(false);
          this.text18.setData({ value: 17 });

          this.text19 = this.add.text(352.6, 987, '9', {
            fill: 'white',
            fontFamily: 'Arial',
            fontSize: '25px'
          }).setOrigin(0.5).setVisible(false);
          this.text19.setData({ value: 18 });

          this.text20 = this.add.text(350, 956, '22', {
            fill: 'white',
            fontFamily: 'Arial',
            fontSize: '25px'
          }).setOrigin(0.5).setVisible(false);
          this.text20.setData({ value: 19 });

          this.text21 = this.add.text(350, 925, '18', {
            fill: 'white',
            fontFamily: 'Arial',
            fontSize: '25px'
          }).setOrigin(0.5).setVisible(false);
          this.text21.setData({ value: 20 });

          this.text22 = this.add.text(357, 894, '29', {
            fill: 'white',
            fontFamily: 'Arial',
            fontSize: '25px'
          }).setOrigin(0.5).setVisible(false);
          this.text22.setData({ value: 21 });

          this.text23 = this.add.text(370, 864, '7', {
            fill: 'white',
            fontFamily: 'Arial',
            fontSize: '25px'
          }).setOrigin(0.5).setVisible(false);
          this.text23.setData({ value: 22 });

          this.text24 = this.add.text(388, 836, '28', {
            fill: 'white',
            fontFamily: 'Arial',
            fontSize: '25px'
          }).setOrigin(0.5).setVisible(false);
          this.text24.setData({ value: 23 });

          this.text25 = this.add.text(412, 814, '12', {
            fill: 'white',
            fontFamily: 'Arial',
            fontSize: '25px'
          }).setOrigin(0.5).setVisible(false);
          this.text25.setData({ value: 24 });
          
          this.text26 = this.add.text(436, 794, '35', {
            fill: 'white',
            fontFamily: 'Arial',
            fontSize: '25px'
          }).setOrigin(0.5).setVisible(false);
          this.text26.setData({ value: 25 });
          
          this.text27 = this.add.text(472, 784, '3', {
            fill: 'white',
            fontFamily: 'Arial',
            fontSize: '25px'
          }).setOrigin(0.5).setVisible(false);
          this.text27.setData({ value: 26 });
          
          this.text28 = this.add.text(500, 772, '26', {
            fill: 'white',
            fontFamily: 'Arial',
            fontSize: '25px'
          }).setOrigin(0.5).setVisible(false);
          this.text28.setData({ value: 27 });
          
          this.text29 = this.add.text(537, 770, '0', {
            fill: 'white',
            fontFamily: 'Arial',
            fontSize: '25px'
          }).setOrigin(0.5).setVisible(false);
          this.text29.setData({ value: 28 });
          
          this.text30 = this.add.text(570, 772, '32', {
            fill: 'white',
            fontFamily: 'Arial',
            fontSize: '25px'
          }).setOrigin(0.5).setVisible(false);
          this.text30.setData({ value: 29 });
          
          this.text31 = this.add.text(603, 777, '15', {
            fill: 'white',
            fontFamily: 'Arial',
            fontSize: '25px'
          }).setOrigin(0.5).setVisible(false);
          this.text31.setData({ value: 30 });
          
          this.text32 = this.add.text(630, 795, '19', {
            fill: 'white',
            fontFamily: 'Arial',
            fontSize: '25px'
          }).setOrigin(0.5).setVisible(false);
          this.text32.setData({ value: 31 });
          
          this.text33 = this.add.text(660, 810, '4', {
            fill: 'white',
            fontFamily: 'Arial',
            fontSize: '25px'
          }).setOrigin(0.5).setVisible(false);
          this.text33.setData({ value: 32 });
          
          this.text34 = this.add.text(680, 835, '21', {
            fill: 'white',
            fontFamily: 'Arial',
            fontSize: '25px'
          }).setOrigin(0.5).setVisible(false);
          this.text34.setData({ value: 33 });
          
          this.text35 = this.add.text(698, 862, '2', {
            fill: 'white',
            fontFamily: 'Arial',
            fontSize: '25px'
          }).setOrigin(0.5).setVisible(false);
          this.text35.setData({ value: 34 });
          
          this.text36 = this.add.text(719, 890, '25', {
            fill: 'white',
            fontFamily: 'Arial',
            fontSize: '25px'
          }).setOrigin(0.5).setVisible(false);
          this.text36.setData({ value: 35 });
          
          this.text37 = this.add.text(720, 925, '17', {
            fill: 'white',
            fontFamily: 'Arial',
            fontSize: '25px'
          }).setOrigin(0.5).setVisible(false);
          this.text37.setData({ value: 36 });
          
          
        this.numberContainer.add([this.text1,this.text2,this.text3,this.text4,this.text5,this.text6,this.text7,this.text8,this.text9,this.text10,this.text11,this.text12,this.text13,this.text14,this.text15,this.text16,this.text17,this.text18,this.text19,this.text20,this.text21,this.text22,this.text23,this.text24,this.text25,this.text26,this.text27,this.text28,this.text29,this.text30,this.text31,this.text32,this.text33,this.text34,this.text35,this.text36,this.text37]).setDepth(6);
    
      }
    
      playanimation() {
        this.time.delayedCall(2000, this.checkdiamondanim,[], this);
      }
    
      checkdiamondanim() {
        console.log('checkdiamondanim');
        diamondarray = [this.wheeldiamond,this.wheeldiamond1,this.wheeldiamond2,this.wheeldiamond3,this.wheeldiamond4,this.wheeldiamond5,this.wheeldiamond6,this.wheeldiamond7];
    
        collidexarray = [822.5,654.6,433,249,250,416,661,822.4];
        collideyarray = [1074.6,1242.4,1252.4,1069,831,675,675,841];
    
        // randomnum = Math.floor((Math.random() * 8));
        // console.log(randomnum + ' = randomnum');
        // randomnum = 7;
        // if(randomnum == 3){
        //   rotateSpeed = 0.12;
        // }
        // if(randomnum == 4){
        //   rotateSpeed = 0.123;
        // }
        // if(randomnum == 5){
        //   rotateSpeed = 0.125;
        // }
        // if(randomnum == 6){
        //   rotateSpeed = 0.1274;
        // }
        // if(randomnum == 7){
        //   rotateSpeed = 0.12788;
        // }
        // console.log('after 5 sec');
        var dist = [];
        this.numberContainer.each(function(children1) {
          if(children1._text == win_number){
            this.wheeldiamondContainer.each(function(children2) {
              dist.push(parseInt(Phaser.Math.Distance.BetweenPoints(children2, children1)));
          },this);
        }
        },this);

        randomnum = dist.indexOf(Math.min(...dist)) - 3;
        if(randomnum<0){
          randomnum = randomnum + 8;
        }
        console.log(randomnum);
        updatexy = true;
      } 

      collideanimation(image, index) {
        var ball_move_after_collide = 0;
        revolveAround = 320;
        this.physics.add.existing(image,true);
        this.physics.add.existing(diamond1, false);
        this.physics.add.collider(image, diamond1);
        var collider = this.physics.add.overlap(image, diamond1, function (clownOnBlock, diamond) {
            rotation = false;
            // playsounds = false;
            // this.ballsound.stop();
            clownOnBlock.body.stop();
            // diamond.body.immovable = true;
            // diamond.body.moves = false;

            
            this.numberContainer.each(function(children) {
              if(children._text == win_number){
                this.physics.accelerateToObject(diamond, children, 60, 300, 300);
                ball_move_after_collide = children.data.list.value;
              }},this);
            this.numberContainer.each(function(children) {
              if(children.data.list.value == (ball_move_after_collide - 4)){

                
            this.tween1 = this.tweens.add({
              targets: diamond,
              x: children.x,
              y: children.y,
              duration: 500,
              ease: 'linear',
              // easeParams: [ 3 ],
              // delay:50,
              onStart:function() {
                              updatewin = true;
                              diamond.body.immovable = true;
                             diamond.body.moves = false;
                          }
          });
        }
        },this);
            // switch(index) {
            //   case 0:
            //     this.timelines = this.tweens.timeline({
            //         targets: diamond,
            //         ease: 'Linear',
            //         duration:500,
            //         tweens: [
            //         {
            //           ease:'Linear',
            //           x:600,
            //           y:160,
            //           duration:400
                              
            //         },
            //         {
            //           scaleX:0.25,
            //           scaleY:0.25,
            //           props: {
            //               x: { value: '+=20', duration: 1200, ease: 'Power2' },
            //               y: { value: '+=5', duration: 1200, ease: 'Bounce.easeOut' }
            //           },
            //           duration:400,
            //           yoyo:true,
            //           repeatDelay:0,
            //           repeat:-1,
            //           onStart:function() {
            //               updatewin = true;
            //           }
            //         }]
            //       },this);
            //   break;
            //   case 1:
            //     this.timelines = this.tweens.timeline({
            //         targets: diamond,
            //         ease: 'Linear',
            //         duration:500,
            //         tweens: [
            //         {
            //           ease:'Linear',
            //           x:670,
            //           y:170,
            //           duration:400
                              
            //         },
            //         {
            //           scaleX:0.25,
            //           scaleY:0.25,
            //           props: {
            //               x: { value: '+=20', duration: 1200, ease: 'Power2' },
            //               y: { value: '+=20', duration: 1200, ease: 'Bounce.easeOut' }
            //           },
            //           duration:400,
            //           yoyo:true,
            //           repeatDelay:0,
            //           repeat:-1,
            //           onStart:function() {
            //               updatewin = true;
            //           }
            //         }]
            //       },this);
            //   break;
            //   case 2:
            //     this.timelines = this.tweens.timeline({
            //         targets: diamond,
            //         ease: 'Linear',
            //         duration:500,
            //         tweens: [
            //         {
            //           ease:'Linear',
            //           x:710,
            //           y:240,
            //           duration:400
                              
            //         },
            //         {
            //           scaleX:0.25,
            //           scaleY:0.25,
            //           props: {
            //               x: { value: '+=5', duration: 1200, ease: 'Power2' },
            //               y: { value: '+=20', duration: 1200, ease: 'Bounce.easeOut' }
            //           },
            //           duration:400,
            //           yoyo:true,
            //           repeatDelay:0,
            //           repeat:-1,
            //           onStart:function() {
            //               updatewin = true;
            //           }
            //         }]
            //       },this);
            //   break;
            //   case 3:
            //     this.timelines = this.tweens.timeline({
            //         targets: diamond,
            //         ease: 'Linear',
            //         duration:500,
            //         tweens: [
            //         {
            //           ease:'Linear',
            //           x:705,
            //           y:285,
            //           duration:400
                              
            //         },
            //         {
            //           scaleX:0.25,
            //           scaleY:0.25,
            //           props: {
            //               x: { value: '-=5', duration: 1200, ease: 'Power2' },
            //               y: { value: '+=10', duration: 1200, ease: 'Bounce.easeOut' }
            //           },
            //           duration:400,
            //           yoyo:true,
            //           repeatDelay:0,
            //           repeat:-1,
            //           onStart:function() {
            //               updatewin = true;
            //           }
            //         }]
            //       },this);
            //   break;
            //   case 4:
            //   this.timelines = this.tweens.timeline({
            //         targets: diamond,
            //         ease: 'Linear',
            //         duration:500,
            //         tweens: [
            //         {
            //           ease:'Linear',
            //           x:630,
            //           y:350,
            //           duration:400
                              
            //         },
            //         {
            //           scaleX:0.25,
            //           scaleY:0.25,
            //           props: {
            //               x: { value: '-=20', duration: 1200, ease: 'Power2' },
            //               y: { value: '-=10', duration: 1200, ease: 'Bounce.easeOut' }
            //           },
            //           duration:400,
            //           yoyo:true,
            //           repeatDelay:0,
            //           repeat:-1,
            //           onStart:function() {
            //               updatewin = true;
            //           }
            //         }]
            //       },this);
            //   break;
            //   case 5:
            //     this.timelines = this.tweens.timeline({
            //         targets: diamond,
            //         ease: 'Linear',
            //         duration:500,
            //         tweens: [
            //         {
            //           ease:'Linear',
            //           x:560,
            //           y:320,
            //           duration:400
                              
            //         },
            //         {
            //           scaleX:0.25,
            //           scaleY:0.25,
            //           props: {
            //               x: { value: '-=20', duration: 1200, ease: 'Power2' },
            //               y: { value: '-=20', duration: 1200, ease: 'Bounce.easeOut' }
            //           },
            //           duration:400,
            //           yoyo:true,
            //           repeatDelay:0,
            //           repeat:-1,
            //           onStart:function() {
            //               updatewin = true;
            //           }
            //         }]
            //       },this);
            //   break;
            //   case 6:
            //     this.timelines = this.tweens.timeline({
            //         targets: diamond,
            //         ease: 'Linear',
            //         duration:500,
            //         tweens: [
            //         {
            //           ease:'Linear',
            //           x:530,
            //           y:280,
            //           duration:400
                              
            //         },
            //         {
            //           scaleX:0.25,
            //           scaleY:0.25,
            //           props: {
            //               x: { value: '-=5', duration: 1200, ease: 'Power2' },
            //               y: { value: '-=25', duration: 1200, ease: 'Bounce.easeOut' }
            //           },
            //           duration:400,
            //           yoyo:true,
            //           repeatDelay:0,
            //           repeat:-1,
            //           onStart:function() {
            //               updatewin = true;
            //           }
            //         }]
            //       },this);
            //   break;
            //   case 7:
            //     this.timelines = this.tweens.timeline({
            //         targets: diamond,
            //         ease: 'Linear',
            //         duration:500,
            //         tweens: [
            //         {
            //           ease:'Linear',
            //           x:555,
            //           y:185,
            //           duration:400
                              
            //         },
            //         {
            //           scaleX:0.25,
            //           scaleY:0.25,
            //           props: {
            //               x: { value: '+=25', duration: 1200, ease: 'Power2' },
            //               y: { value: '-=15', duration: 1200, ease: 'Bounce.easeOut' }
            //           },
            //           duration:400,
            //           yoyo:true,
            //           repeatDelay:0,
            //           repeat:-1,
            //           onStart:function() {
            //               updatewin = true;
            //           }
            //         }]
            //       },this);
            //   break;
            // }
            this.physics.world.removeCollider(collider);
        }, null, this);
      }


      // this function is used to showing winning animation
    winninganimation() {
      // if(this.winningcontainer != undefined) {
      //     this.winningcontainer.destroy();
      // }
      // this.winningcontainer = this.add.container();
      // this.blacklayer = this.add.image(500, 280, 'table_7').setScale(1).setInteractive();
      // this.blacklayer.alpha = 0.1;
      // this.background = this.add.image(520,300, 'table_41').setScale(1.2,0.5);
      // if(spin_winamount != 0) {
      //     this.winingsound();
      //     this.winningtext = this.add.image(520,280, 'wonimage').setScale(0.1);
      //     this.winningamout = this.add.text(520,320, spin_winamount, {
      //         fill: '#ffffff',
      //         fontFamily: 'Arial',
      //         fontSize: '40px',
      //     }).setOrigin(0.5);
      //     var useramts = parseFloat(this.balance._text);
      //     var winamt = useramts+parseInt(spin_winamount);
      //     this.balance.setText(winamt);
      //     this.win.setText(spin_winamount);
      //     this.winningparticle();
      // } else {
      //       this.loosingsound();
      //       this.winningtext = this.add.text(520,280, 'YOU LOOSE', {
      //           fill: '#ffffff',
      //           fontFamily: 'Arial',
      //           fontSize: '40px',
      //       }).setOrigin(0.5);
      //       this.winningamout = this.add.text(520,320, spin_looseamount, {
      //           fill: '#ffffff',
      //           fontFamily: 'Arial',
      //           fontSize: '40px',
      //       }).setOrigin(0.5);
            
      //   }
        
      //   this.infobutton.setInteractive();
		  //   this.exitbutton.setInteractive();

      //   this.winningcontainer.add([this.blacklayer, this.background,this.winningtext,this.winningamout]);
      //   this.winningcontainer.depth = 200;
      //   var animtimer = this.time.delayedCall(2000, this.destroywinninganim, [], this);

      this.winningtext = this.add.text(540,1600, winmsg, {
                  fill: '#ffffff',
                  fontFamily: 'Arial',
                  fontSize: '50px',
              }).setOrigin(0.5);

        this.tabletimer = this.time.delayedCall(5000, this.showbetplacetable, [], this);
        
    }

    showbetplacetable() {
      console.log('showbetplacetable');
      winmsg = '';
      rotation = false;
      betwheelstart = false;
      chip_open = false;

        // this.stoptweenanim();
        this.showingbetcoins();
        // this.showroulettetween();
        betnumberarray = [];
        betamountarray = [];
        betgroupidarray = [];
        bet_typearray = [];

        doublecoinamount = [];
        doublexarray = [];
        doubleyarray = [];
        doublecointexture = [];

        inneramountarray = [];
				outeramountarray = [];
        // spin_winamount = 0;
        // increment = 0;
        // GetUserDetailsHandler();
        this.innerbetcontainer.iterate(this.clearbetamounts);
        this.outerbetcontainer.iterate(this.clearbetamounts);
       
        if(this.winningtext != undefined) {
          this.winningtext.destroy();
        }
       	if(this.repeatcontainer != undefined) {
           this.repeatcontainer.destroy();
       	}
       	if(this.coinplacecontainer != undefined) {
           this.coinplacecontainer.destroy();
           this.coinplacecontainer = this.add.container();
       	}
       this.showbetbar();
      //  this.doubleup_button.setData({buttonvalue:'doubleup'});
      //  this.doubleup_button.setTexture('table_20');
      //  this.buttoncontainer.each(function(child) {
      //       if(child.data.list.buttonvalue == "auto") {
      //           child.setInteractive();
      //           child.alpha = 1;
      //       } 
      //       else {
      //           child.disableInteractive();
      //           child.alpha = 0.5;
      //       }
      //   },this);
    }

    // this function is used cleat betamounts 
    clearbetamounts(children) {
      children.data.list.resetvalue = true;
    }

        //this function is used to showing betbar
        showbetbar() {
          if(diamond1 != undefined) {
            diamond1.destroy();
          }
          var tween = this.tweens.add({
              targets: this.table,
              x: 540,
              ease: 'Linear',
              duration: 400,
              yoyo: false,
              repeat: 0,
              onComplete: function() {
                console.log('betscreen');
                betscreen = true;
            },
            onCompleteScope: this

          },this);
  
          var tween = this.tweens.add({
            targets: [this.coinplacecontainer,this.innerbetcontainer, this.outerbetcontainer],
            x: 0,
            ease: 'Linear',
            duration: 400,
            yoyo: false,
            repeat: 0
                          
          },this);
  
          var tween = this.tweens.add({
              targets: this.roulettecontainer,
              x: 900,
              ease: 'Linear',
              duration: 400,
              repeat: 0
                      
          },this);
  
      }

    update() {

    //   graphics.clear();
    // graphics.lineStyle(2, 0x00ff00);
    // graphics.strokeCircleShape(circle);
    
      if(betwheelstart) {
        this.betwheel.rotation -= 0.008;
        Phaser.Actions.RotateAroundDistance([this.text1,this.text2,this.text3,this.text4,this.text5,this.text6,this.text7,this.text8,this.text9,this.text10,this.text11,this.text12,this.text13,this.text14,this.text15,this.text16,this.text17,this.text18,this.text19,this.text20,this.text21,this.text22,this.text23,this.text24,this.text25,this.text26,this.text27,this.text28,this.text29,this.text30,this.text31,this.text32,this.text33,this.text34,this.text35,this.text36,this.text37], center, -0.008, 190);
      }
      if(rotation){
        if(decreaserotation == true) {
          // alert('rotate speed');
          rotateSpeed -= 0.0007;
          revolveAround -= 0.10;
          if(revolveAround < 310){
            // console.log('revolveAround = ' + revolveAround);
            revolveAround = 310;
          }
          if(rotateSpeed < 0.03){
            // console.log('revolveAround = ' + revolveAround);
            rotateSpeed = 0.03;
          }
          
            for(var i=0;i<36;i++) {
              if(this.numberContainer.list[i]._text == win_number){
                numberindex = i;
              }
            }

            if(select_randomnum){
              select_randomnum = false;
            this.playanimation();
            }
  
        }
        
        // console.log(rotateSpeed);
        Phaser.Actions.RotateAroundDistance([diamond1], center, rotateSpeed, revolveAround);
      }
  
      if(updatexy) {
        // console.log(Math.floor(diamond1.x/10)*10 , ' ' , Math.floor(collidexarray[randomnum]/10)*10 , ' '  ,Math.ceil(diamond1.y/10)*10, ' ' ,Math.ceil(collideyarray[randomnum]/10)*10);
          if(Math.floor(diamond1.x/10)*10 == Math.floor(collidexarray[randomnum]/10)*10  && Math.ceil(diamond1.y/10)*10 == Math.ceil(collideyarray[randomnum]/10)*10) {
            updatexy = false;
            decreaserotation = false; 
            console.log('diamondarray[randomnum]');
            this.collideanimation(diamondarray[randomnum], randomnum);
          }
      }
  
      if(updatewin) {
      //  console.log(numberindex);
        if(Math.floor(this.numberContainer.list[numberindex].x/10)*10 == Math.floor(diamond1.x/10)*10 && Math.ceil(this.numberContainer.list[numberindex].y/10)*10 == Math.ceil(diamond1.y/10)*10) {
          diamond1.x = this.numberContainer.list[numberindex].x;
          diamond1.y = this.numberContainer.list[numberindex].y;
          
          this.tween1.stop();
          // this.stopballsound.stop();
          rotateSpeed = -0.008;
          revolveAround = 190;
          rotation = true;
          updatewin = false;
          stoptween = true;
          // setTimeout(function() {
          //   winningupdate = true;
          // },1000);
          
        }
      }

      if(stoptween) {
        stoptween = false;
        // this.timelines.stop();
        // this.stopball.stop();
        // playsound = false;
        setTimeout(function() {
          showrepeatbar = true;
        },1000);
        // updatexy = false; 
        // rotation = false;
        // updatewin = false;
      }

      if(showrepeatbar) {
        showrepeatbar = false;
        this.winninganimation();
        // this.showewinnumbers();
      }


      if (destroyTimer) {
        destroyTimer = false;
        if (this.timerContainer != undefined) {
            this.timerContainer.destroy();
        }
       }

       if (showtimer) {
        showtimer = false;
        this.turn_timer();
        }

        if (sessiontimer) {
          sessiontimer = false;
          this.session_timer();
          }

          if(animate_table_to_wheel){
            animate_table_to_wheel = false;
            
            if(this.tweencounter1 != undefined){
              this.tweencounter1.stop();
              }

            if(this.sessiontimercontainer != undefined){
              this.sessiontimercontainer.destroy();
            }
            destroyTimer = true;
            clearTimeout(timerplayer);
            this.onspinevents();
          }

          if(betscreen){
            if(gameStatus == 'OPEN'){
              betscreen = false;
              // showtimer = true;
              sessiontimer = true;
              show_timer_in_betscreen = true;
              }
          }
    }
}