//A classe SceneTwo está sendo definida
var SceneTwo = new Phaser.Class({
    Extends: Phaser.Scene,

    //Função de inicialização da cena
    initialize: function() {
        //Chama o construtor pai e define a chave da cena como "SceneTwo"
        Phaser.Scene.call(this, { "key": "SceneTwo" });
    },

    //Função que carrega os recursos que serão utilizados na cena
    preload: function() {
        this.load.image("sky", "assets/sky.png");
        this.load.image("plataforma", "assets/chão2.png");
        this.load.image("plataforminhas", 'assets/platmedia.png');
        this.load.image("banana", 'assets/banana.png');
        this.load.image("bananavenenosa", 'assets/banana2.png');
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    },

    //Função onde os elementos da cena são criados e definidos
    create: function() {
        // Adiciona o fundo da tela
        this.add.image(0, 0, "sky").setOrigin(0).setDisplaySize(1280, 720);

        // Adiciona as plataformas
        var platforma = this.physics.add.staticGroup();
        platforma.create(600, 760, 'plataforma').setScale(2).refreshBody();

        //A função 'plataforminha.create()' cria novas plataforminhas dentro de um loop para ter uma nova posição
        var plataforminha = this.physics.add.staticGroup();
        for (var i = 0; i < 5; i++) {
            plataforminha.create(150 + i * 300, 510, 'plataforminhas');
        }

        var bananas = this.physics.add.staticGroup(); // Grupo para as bananas

        // Adiciona bananas em cada plataforminha
        plataforminha.children.iterate(function(plataforma) {
            var x = plataforma.x;
            var y = plataforma.y - 40; // Posiciona a banana acima da plataforma
            var banana = bananas.create(x, y, 'banana');
            banana.setScale(0.5); // Ajusta a escala da banana
        });

        var score = 0; // Inicializa a pontuação

        // Adiciona o personagem nomeado 'dude'
        this.dude = this.physics.add.sprite(100, 450, 'dude');
        this.dude.setBounce(0.2);
        this.dude.setCollideWorldBounds(true);

        // Adiciona as animações do dude
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        // Adiciona a colisão entre o dude e as plataformas
        this.physics.add.collider(this.dude, platforma);
        this.physics.add.collider(this.dude, plataforminha);

        // Adiciona a colisão entre o dude e as bananas
        var _this = this; 
        this.physics.add.overlap(this.dude, bananas, function(dude, banana) {
            banana.disableBody(true, true); // Remove a banana da tela quando o dude encosta nelas
            score += 10; // Adiciona 10 pontos ao placar
            _this.scoreText.setText("Score: " + score); // Atualiza a exibição do placar
            //criação de uma condição para encerrar o jogo e iniciar a próxima cena
            if (score >= 40) {
                _this.scene.start("SceneThree"); // Inicia a próxima cena quando o placar atinge 40 pontos
            }
        });

        // Configura as teclas de seta para controle do dude
        this.cursors = this.input.keyboard.createCursorKeys();

        // Placar
        this.scoreText = this.add.text(16, 16, "Placar: 0", {
            fontSize: "32px",
            fill: "#000"
        });

    },


    update: function() {

        //verifica a existência do dude
        if (!this.dude) return;

        //verifica as teclas pressionadas para controlar o jogador
        if (this.cursors.left.isDown) {
            this.dude.setVelocityX(-160);
            this.dude.anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            this.dude.setVelocityX(160);
            this.dude.anims.play('right', true);
        } else {
            this.dude.setVelocityX(0);
            this.dude.anims.play('turn');
        }

        if (this.cursors.up.isDown) {
            this.dude.setVelocityY(-100);
        }
    },
});
