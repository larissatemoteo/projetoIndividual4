//Aqui esta sendo definida a classe SceneOne 
var SceneOne = new Phaser.Class({
    Extends: Phaser.Scene,

    //Essa é a função de inicialização da cena
    initialize: function() {
        //Aqui é chamado o construtor da classe e defininda a chave  da cena como "SceneOne"
        Phaser.Scene.call(this, { "key": "SceneOne" });
    },

    //Funçã de inicialização, chamada após a criação da cena
    init: function() {},

    //Essa função carrega os recursos que serão utilizados antes da criação da cena
    preload: function() {
        //carrega as imagens necessárias para compor a cena
        this.load.image("sky", "assets/sky.png");
        this.load.image("plataforma", "plat1.png");
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
        this.load.image("plane", "plane.png");
        this.load.image("start", "assets/start.png");
    },

    //Aqui os elementos da cena são criados e configurados
    create: function() {
        //Adiciona a imagem de fundo
        this.add.image(0, 0, "sky").setOrigin(0).setDisplaySize(1280,720);

        //Adiciona a imagem do personagem nomeado 'dude' em uma posição específica
        this.dude = this.add.image(620, 370, "dude");

        //Adciona o texto de boas vindas no centro da tela
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

        //Adciona o texto que instrui o jogador a iniciar o jogo
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

        //Adciona instruções de como mover o personagem
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

        //Aqui está sendo adicionado um botão de início no centro da tela
        var Iniciar = this.add.image(
            640,
            490,
            "start"
        ).setOrigin(0.5);

        // Configura o botão para ser interativo e responder a cliques
        Iniciar.setInteractive();
        Iniciar.on('pointerdown', () => {
            // Inicia a próxima cena quando o botão 'Start' é pressionado
            this.scene.start("SceneTwo");
        })
    },
        
    update: function() {
    
    },

})
