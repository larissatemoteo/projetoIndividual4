var SceneTwo = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "SceneTwo" });
    },
    preload: function() {
        this.load.image("sky", "assets/sky.png");
        this.load.image("plataforma", "assets/chão2.png");
        this.load.image("plataforminhas", 'assets/platmedia.png');
        this.load.image("banana", 'assets/banana.png');
        this.load.image("bananavenenosa", 'assets/banana2.png');
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    },
    create: function() {
        // Adiciona o fundo sky
        this.add.image(0, 0, "sky").setOrigin(0).setDisplaySize(1280, 720);

        // Adiciona as plataformas
        var platforma = this.physics.add.staticGroup();
        platforma.create(600, 760, 'plataforma').setScale(2).refreshBody();

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

        // Adiciona o jogador (dude)
        this.dude = this.physics.add.sprite(100, 450, 'dude');
        this.dude.setBounce(0.2);
        this.dude.setCollideWorldBounds(true);

        // Adiciona as animações do jogador (dude)
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

        // Adiciona a colisão entre o jogador (dude) e as plataformas
        this.physics.add.collider(this.dude, platforma);
        this.physics.add.collider(this.dude, plataforminha);

        // Adiciona a colisão entre o jogador (dude) e as bananas
        var _this = this; // Referência ao contexto da cena
        this.physics.add.overlap(this.dude, bananas, function(dude, banana) {
            banana.disableBody(true, true); // Remove a banana da tela
            score += 10; // Adiciona 10 pontos ao placar
            _this.scoreText.setText("Score: " + score); // Atualiza a exibição do placar
            if (score >= 40) {
                _this.scene.start("SceneThree"); // Inicia a próxima cena quando o placar atinge 40 pontos
            }
        });

        // Configura as teclas de seta para controle do jogador (dude)
        this.cursors = this.input.keyboard.createCursorKeys();

        // Placar
        this.scoreText = this.add.text(16, 16, "Placar: 0", {
            fontSize: "32px",
            fill: "#000"
        });

    },
    update: function() {
        if (!this.dude) return;

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
