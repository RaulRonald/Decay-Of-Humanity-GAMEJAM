class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, targetX, targetY) {
        super(scene, x, y, 'bullet');
        this.scene = scene; // Atribui a cena corretamente
        this.scene.add.existing(this).setDepth(1);

        // Definir as propriedades targetX e targetY
        this.targetX = targetX;
        this.targetY = targetY;

        // Calcular a direção e normalizar
        const dx = targetX - x;
        const dy = targetY - y;
        const length = Math.sqrt(dx * dx + dy * dy);
        
        // Normalizar a direção
        this.Dirx = dx / length;
        this.Diry = dy / length;

        // Definir uma velocidade para a bala
        this.speed = 10;
 
    }

    update() {
        // Mover a bala na direção calculada
        this.x += this.Dirx * this.speed;
        this.y += this.Diry * this.speed;
    }
}
class Robot extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.setOrigin(0, 0);
        this.playervelocity = 3;
        this.jump = false;
        this.jumpforce = 2;
        this.gravity = 2;
        this.bullets = [];
        let referencia = this;
        // Evento de clique do mouse para atirar
        scene.input.on('pointerdown', (pointer) => {
            const bullet = new Bullet(referencia.scene, this.x + this.width / 2 + 10, this.y + this.height / 2, pointer.worldX, pointer.worldY);
            this.bullets.push(bullet);
            referencia.scene.shotsound.play();
        });
    }

    update() {
        // Aplicando gravidade e lógica de pulo
        this.y += this.jumpforce;
        if(this.jumpforce < 2){
            this.jumpforce += this.gravity;
        }
        if(this.scene.cursors.space.isDown && this.jump == false){
            this.jump = true;
            this.jumpforce = -20;
            this.play('robot_jump', true);
        }
        this.move();
        this.bullets.forEach(bullet => bullet.update());
    }

    move() {
        const scene = this.scene;
        let isMoving = false;

        if (scene.keyD.isDown) {
            this.x += this.playervelocity;
            this.flipX = false;
            if(this.jump == false)
                this.play('robot_run', true);
            isMoving = true;
        }

        if (scene.keyA.isDown) {
            this.x -= this.playervelocity;
            this.flipX = true;
            if(this.jump == false)
                this.play('robot_run', true);
            isMoving = true;
        }

        if (!isMoving && this.jump == false) {
            this.play('robot_idle', true);
        }

        if (this.y <= 0) this.y += this.playervelocity;
        if ((this.y + this.height) >= scene.game.config.height) { this.y -= this.playervelocity; this.jump = false; }
        if (this.x <= 0) this.x += this.playervelocity;
        if ((this.x + this.width) >= 5000) this.x -= this.playervelocity;
    }
}
class Human extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.scene = scene;
        this.setOrigin(0, 0);
        this.humanvelocity = 5;
        let referencia = this;
        this.play('human_run', true);
        this.life = 5;
    }

    update() {
        // Aplicando gravidade e lógica de pulo
        this.move();
        if(this.life <= 0) {
            this.scene.deathhumans++;
            this.scene.humansalive--;
            this.scene.minioncount++;
            this.scene.add.image(this.x, this.y + 150, 'blood');
            this.scene.shotdeath.play();
            this.destroy();
        }
    }

    move() {
        const scene = this.scene;
        if(this.humanvelocity > 0)
            this.flipX = false;
        else this.flipX = true;

        this.x += this.humanvelocity;

        if (this.x <= 0) this.humanvelocity *= -1;
        if ((this.x + this.width) >= 5000) this.humanvelocity *= -1;
    }
}

class Minion extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.scene = scene;
        this.setOrigin(0, 0);
        this.minionvelocity = 2;
        let referencia = this;
        this.play('minion_run', true);
    }

    update() {
        // Aplicando gravidade e lógica de pulo
        this.move();
    }

    move() {
        const scene = this.scene;
        if(this.minionvelocity > 0)
            this.flipX = false;
        else this.flipX = true;

        this.x += this.minionvelocity;

        if (this.x <= 0) this.minionvelocity *= -1;
        if ((this.x + this.width) >= 5000) this.minionvelocity *= -1;
    }
}
export class Lose extends Phaser.Scene {
    constructor() {
        super({ key: 'lose' });
    }
    preload() {
        
    }

    create() {
        this.scoreText = this.add.text( 500, 350, 'YOU LOSE', { 
            fontSize: '64px', 
            fill: '#FF0000',
            fontWeight: '900' 
        }).setScrollFactor(0).setDepth(3); // setScrollFactor(0) para fixar o texto na tela
    }
}

export class Won extends Phaser.Scene {
    constructor() {
        super({ key: 'won' });
    }
    preload() {
        
    }

    create() {
        this.scoreText = this.add.text( 500, 350, 'YOU WON XD', { 
            fontSize: '64px', 
            fill: '#FF0000',
            fontWeight: '900' 
        }).setScrollFactor(0).setDepth(3); // setScrollFactor(0) para fixar o texto na tela
    }
}

export class Gamescene extends Phaser.Scene {
    constructor() {
        super({ key: 'gamescene' });
        this.robot;
        this.cursors;
        this.deathhumans = 0;
        this.humansalive = 0;
    }

    preload() {
        this.load.image('camada0', 'assets/sprites/scenare_0.png');
        this.load.image('camada2', 'assets/sprites/scenare_1.png');
        this.load.image('robot', 'assets/sprites/robot_idle_sprite.png');
        this.load.image('bullet', 'assets/sprites/bullet.png'); // Imagem da bala
        this.load.image('blood', 'assets/sprites/blood_sprite.png');
        this.load.spritesheet('robot_idle', 'assets/sprites/robot_idle_sprite.png', {
            frameWidth: 522,
            frameHeight: 317
        });
        this.load.spritesheet('robot_run', 'assets/sprites/robot_running_sprite.png', {
            frameWidth: 522,
            frameHeight: 317
        });
        this.load.spritesheet('robot_jump', 'assets/sprites/robot_jump_sprite.png', {
            frameWidth: 522,
            frameHeight: 317
        });
        this.load.spritesheet('human_run', 'assets/sprites/run_human_sprite.png', {
            frameWidth: 87,
            frameHeight: 143
        });
        this.load.spritesheet('minion_run', 'assets/sprites/minion_sprite.png', {
            frameWidth: 81,
            frameHeight: 35
        });
        //sounds
        this.load.audio('shot', 'assets/sounds/shot.mp3');
        this.load.audio('death', 'assets/sounds/death.mp3');

    }

    create() {
        this.shotsound = this.sound.add('shot');
        this.shotdeath = this.sound.add('death');
        this.add.image(0, 0, 'camada0').setOrigin(0).setScrollFactor(1).setScale(1).setDepth(0);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.anims.create({
            key: 'minion_run',
            frames: this.anims.generateFrameNumbers('minion_run', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1 
        });

        this.anims.create({
            key: 'robot_idle',
            frames: this.anims.generateFrameNumbers('robot_idle', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1 
        });

        this.anims.create({
            key: 'robot_run',
            frames: this.anims.generateFrameNumbers('robot_run', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'robot_jump',
            frames: this.anims.generateFrameNumbers('robot_jump', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1 
        });

        this.anims.create({
            key: 'human_run',
            frames: this.anims.generateFrameNumbers('human_run', { start: 0, end: 1 }),
            frameRate: 5,
            repeat: -1 
        });

        this.robot = new Robot(this, 400, 375, 'robot', 0);
        
        this.add.existing(this.robot).setDepth(1);
        
        this.cameras.main.setBounds(0, 0, 5000, 750);
        this.cameras.main.startFollow(this.robot, true, 1, 1);
        this.cameras.main.setZoom(0.75);


        this.humanspawner = 0;
        this.humans = [];
        
        this.minioncount = 0;
        this.minions = [];

        this.add.image(0, 0, 'camada2').setOrigin(0).setScrollFactor(1).setScale(1).setDepth(2);

        this.scoreText = this.add.text( -20, -20, 'DEADLY HUMANS: 0/50 :) HUMANS ALIVE : 0/12 :(', { 
            fontSize: '32px', 
            fill: '#FFFF00',
            fontWeight: '900' 
        }).setScrollFactor(0).setDepth(3); // setScrollFactor(0) para fixar o texto na tela
        
    }

    update() {
        this.robot.update();
        const referencia = this;
        this.humans.forEach(human => {
            human.update();
            this.robot.bullets.forEach(bullet => {
                if (human.y < bullet.y && human.y + human.height > bullet.y + bullet.height &&
                    human.x < bullet.x && human.x + human.width > bullet.x + bullet.width) {
                    human.life--;
                    bullet.destroy();
                }
            });
        });
        this.minions.forEach(minion => {
            minion.update();
        });
        
        // Filtrar e remover humanos e balas destruídos
        this.humans = this.humans.filter(human => human.active);
        this.robot.bullets = this.robot.bullets.filter(bullet => bullet.active);
        
        this.humanspawner += 0.05;

        if(this.humanspawner >= 15){
            const human = new Human(this, 400, 375, 'robot', 0);
            const human0 = new Human(this, 4000, 375, 'robot', 0);
            this.add.existing(human).setDepth(1);
            this.humans.push(human);
            this.add.existing(human0).setDepth(1);
            this.humans.push(human0);
            this.humanspawner = 0;
            this.humansalive += 2;
        }
        if(this.minioncount >= 2){
            const minion = new Minion(this, this.robot.x,475, 'robot', 0);
            this.add.existing(minion).setDepth(1);
            this.minions.push(minion);
            this.minioncount = 0;
        }
        this.scoreText.setText('DEADLY HUMANS: ' + this.deathhumans + '/50 :) HUMANS ALIVE : ' + this.humansalive + '/12 :(');
        if(this.humansalive >= 12)
        {
            this.scene.start('lose');
        }
        else
        if(this.deathhumans >= 50)
            {
                this.scene.start('won');
            }
    }
}
