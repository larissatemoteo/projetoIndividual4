//Definição da classe SceneThree
var SceneThree = new Phaser.Class({
    Extends: Phaser.Scene,

    //Função de inicialização da cena
    initialize: function() {
        //Aqui é chamado o construtor da classe e defininda a chave  da cena como "SceneThree"
        Phaser.Scene.call(this, { "key": "SceneThree" });
    },

    // //Funçã de inicialização, chamada após a criação da cena
    init: function() {},

    //Função que carrega os recursos que serão utilizados na cena
    preload: function() {
        this.load.image("sky", "assets/sky.png");
        
    },

    //Aqui os elementos da cena são criados e configurados
    create: function() {
        //Adição da imagem de fundo
        this.add.image(0, 0, "sky").setOrigin(0).setDisplaySize(1280,720);

        //Adição do texto de GameOver, indicando o fim do jogo
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
