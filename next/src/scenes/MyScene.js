class MyScene extends Phaser.Scene {


    preload ()
    {
        this.load.image('face', 'assets/maxresdefault.jpg');
    }

    create (data)
    {
        this.face = this.add.image(data.x, data.y, 'face');
    }

}