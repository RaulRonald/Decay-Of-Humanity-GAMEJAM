export class Warning extends Phaser.Scene {
    constructor() {
        super({ key: 'warning' });
    }
    preload() {
        this.load.image('warning', 'assets/sprites/warning.png');
        this.load.image('startbutton0', 'assets/sprites/startButton.png');
    }

    create() {
        //interface com elementos html
        let referencia = this;
        this.mainimage = this.add.image(480, 920, 'warning');
        this.mainimage.setScale(1);
    }

    update() {
        // Atualize a l�gica do jogo aqui
        this.mainimage.y -= 0.5;
        if (this.mainimage.y <= -50) this.scene.start("story");
    }
}
