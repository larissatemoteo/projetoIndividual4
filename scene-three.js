var SceneThree = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "SceneThree" });
    },
    init: function() {},
    preload: function() {
        this.load.image("sky", "assets/sky.png");
        
    },
    create: function() {
        
        this.add.image(0, 0, "sky").setOrigin(0).setDisplaySize(1280,720);

        var text = this.add.text(
            640, 
            360, 
            "GameOver", 
            {
                fontSize: 50,
                color: "#000000",
                fontStyle: "bold"
            }
        ).setOrigin(0.5);
    },
        
    update: function() {
    
    },

})
