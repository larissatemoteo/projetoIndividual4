var SceneOne = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "SceneOne" });
    },
    init: function() {},
    preload: function() {
        this.load.image("sky", "assets/sky.png");
        this.load.image("plataforma", "plat1.png");
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
        this.load.image("plane", "plane.png");
        this.load.image("start", "assets/start.png");
    },
    create: function() {
        
        this.add.image(0, 0, "sky").setOrigin(0).setDisplaySize(1280,720);

        this.dude = this.add.image(620, 370, "dude");

        var text = this.add.text(
            640, 
            310, 
            "Bem Vindo!", 
            {
                fontSize: 50,
                color: "#000000",
                fontStyle: "bold"
            }
        ).setOrigin(0.5);

        var text = this.add.text(
            640, 
            450, 
            "Clique para iniciar!", 
            {
                fontSize: 50,
                color: "#000000",
                fontStyle: "bold"
            }
        ).setOrigin(0.5);

        var text = this.add.text(
            640, 
            570, 
            "Use as setas do teclado para se mover", 
            {
                fontSize: 50,
                color: "#000000",
                fontStyle: "bold"
            }
        ).setOrigin(0.5);
        
        var Iniciar = this.add.image(
            640,
            490,
            "start"
        ).setOrigin(0.5);

        // Configura o botão para ser interativo e responder a cliques
        Iniciar.setInteractive();
        Iniciar.on('pointerdown', () => {
            // Inicia a próxima cena
            this.scene.start("SceneTwo");
        })
    },
        
    update: function() {
    
    },

})
