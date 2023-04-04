window.addEventListener('load', function() {

    var config = {
        type: Phaser.CANVAS,
        width: 1080,
        height: 1920,
        transparent: false,
        parent: 'GameContainer',
        dom: {
            createContainer: true
        },
        physics: {
            default: 'arcade',
            arcade: {
                debug: false,
                gravity: {
                    y: 150
                }
            }
        },
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH
        },

    };

    var game = new Phaser.Game(config);
    checkforIos = game.device.os.iOS;
    checkforIphone = game.device.os.iPhone;
    game.scene.add("Boot", Boot, true);
    game.scene.add("Preload", Preload);
    game.scene.add("Gametable", Gametable);
    game.scale.fullscreenTarget = document.getElementById(config.parent);
    //  init();
});
class Boot extends Phaser.Scene {

    preload() {
        this.load.image('background_temp','assets/gametable_assets/loader/background.png');
        this.load.image('loadingbarbackgound','assets/gametable_assets/loader/loading_bar_bg.png');
        this.load.image('loading_indicator','assets/gametable_assets/loader/loading_indicator.png');

    }

    update() {
        this.scene.start("Preload");
    }
}