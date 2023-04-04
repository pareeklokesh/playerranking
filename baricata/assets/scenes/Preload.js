var game_initiate_status = false; 
var queryString = window.location.search;
console.log(queryString);
var urlParams = new URLSearchParams(queryString);
var operatorId = urlParams.get('operatorId');
console.log(operatorId);
var token = urlParams.get('token');
var game_code = urlParams.get('gameid');
var video_streaming_url = '';
var player_id = '';
var initial_data = {};

class Preload extends Phaser.Scene {

    constructor() {

        super("Preload");

    }

    

    /* START-USER-CODE */

    preload() {
        // document.getElementById("GameContainer").style.backgroundImage = "url('../assets/gametable_assets/loader/background.png')";
            // this.add.image(960,600, 'gamelogo').setScale(2.4);
        this.add.image(0,0,'background_temp').setScale(1).setOrigin(0);    
	    this.add.image(550,800,'loadingbarbackgound').setScale(0.7);
	    var indicator = this.add.image(235,777, 'loading_indicator').setScale(0.7);

	    var progressBar = this.add.graphics();
        progressBar.depth = 2;
		
        var width = this.cameras.main.width;
        // var height = this.cameras.main.height;
        var height = 1400;
        var loadingText = this.make.text({
            x: width / 2 - 30,
            y: height / 2 + 150,
            text: 'Loading...',
            style: {
                font: '24px Arial',
                fill: '#ffd73d',
                fontStyle:'bold'
            }
        });

        loadingText.setOrigin(0.5, 0.5);
        loadingText.depth = 21;

        var percentText = this.make.text({
			x: width / 2 + 40,
			y: height / 2 + 150,
            text: '0%',
            style: {
                font: '22px Arial',
                fill: '#ffd73d',
                fontStyle:'bold'
            }
        });
        percentText.setOrigin(0.5, 0.5);
        percentText.depth = 21;

        this.load.on('progress', function(value) {
			indicator.setScale(0.7*value, 0.65);
			indicator.setOrigin(0);
            percentText.setText(parseInt(value * 100) + '%');
        });
        // this.load.video('wormhole', 'https://sample-live.baricata.com/sample.mp4', 'canplaythrough', false, true);
        this.load.image('bet_back','assets/gametable_assets/1.png');
        this.load.image('metal','assets/gametable_assets/2.png');
        this.load.image('ball','assets/gametable_assets/3.png');
        this.load.image('wheelouter','assets/gametable_assets/4.png');
        this.load.image('wheel','assets/gametable_assets/5.png');
        this.load.image('chip1','assets/gametable_assets/6.png');
        this.load.image('chip2','assets/gametable_assets/7.png');
        this.load.image('chip3','assets/gametable_assets/8.png');
        this.load.image('chip4','assets/gametable_assets/9.png');
        this.load.image('chip5','assets/gametable_assets/10.png');
        this.load.image('chip6','assets/gametable_assets/11.png');
        this.load.image('rectanglelayer','assets/gametable_assets/12.png');
        this.load.image('circlelayer','assets/gametable_assets/13.png');
        this.load.image('chip_selected','assets/gametable_assets/14.png');
        this.load.image('spin_button','assets/gametable_assets/15.png');
        this.load.image('follow_bg','assets/gametable_assets/16.png');
        this.load.image('menu_icon','assets/gametable_assets/17.png');
        this.load.image('views_icon','assets/gametable_assets/18.png');
        this.load.image('views_bg','assets/gametable_assets/19.png');
        this.load.image('sessiontimer_bg2','assets/gametable_assets/20.png');
        this.load.image('sessiontimer_bg1','assets/gametable_assets/21.png');
        this.load.image('undo','assets/gametable_assets/22.png');
        this.load.image('double','assets/gametable_assets/23.png');
        this.load.image('autoplay','assets/gametable_assets/24.png');


        //html
        this.load.html('chat_dom','assets/layout/chat.html');


       
    }

    create() {
    // this.scene.start("Gametable");
    game_code = '7773';
    operatorId = 'Mukesh7773';
    token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE5NGJiYzUyNjk1M2I0YTFhNzUwZmEiLCJvcGVyYXRvcl9pZCI6Ik11a2VzaDc3NzMiLCJpYXQiOjE2NzkzODY2MDYsImV4cCI6MTY4MDI1MDYwNn0.wiIZDnziikvPcEYXPgWy_0hGob5sftZFtsM2Ri-S6eg';

    console.log(game_code,operatorId,token);
        $.ajax({
            url: "http://13.214.221.33:3003/get-Initiate-Game",
            headers: {'Authorization': 'Bearer ' + token},
            data: {
                hash:"e10adc3949ba59abbe56e057f20f883e",
                game_code:game_code,
                operator_name:operatorId
            },
            type: 'POST',
            // cache: false,
            // async: false,
            success: function(res) {
                
                // console.log(res);
                // video_streaming_url = res.data.gamesinfo.influencer_info.video_streaming_url;
                if(res.status == true){
                    player_id = res.data.userinfo.player_id;
                    initial_data = res;
                    console.log(initial_data);
                    console.log(res.status);
                    // game_initiate_status = true;
                    game_initiate_status = res.status;
                }
            }
        });

        
    }

    update() {

        if(game_initiate_status){
            game_initiate_status = false;
            // console.log('gametable scene');
            this.scene.start("Gametable");
        }
        
    }


}