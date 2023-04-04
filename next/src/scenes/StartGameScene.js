class StartGameScene extends Phaser.Scene{
    
    
    
        create ()
        {
            this.add.text(0, 0, 'Click to add new Scene');
    
            this.input.once('pointerdown', function () {
            
                this.scene.add('myScene', MyScene, true, { x: 400, y: 300 });
    
            }, this);
        }
    
   



}