import { Button } from "./UIelements.js";
export class Tutorial extends Phaser.Scene {
    constructor() {
        super({ key: 'tutorial' });
    }
    preload() {
        this.load.image('next', 'assets/sprites/nextbutton.png');
        this.load.image('tutorial', 'assets/sprites/tutorial.png');
    }

    create() {
        this.add.image(0, 0, 'tutorial').setOrigin(0).setScrollFactor(1).setScale(1);
        //interface com elementos html
        let referencia = this;
        let Button0 = new Button(this, 850, 450, 'next', '', () => { referencia.scene.start('gamescene'); });
    }

    update() {
        // Atualize a l�gica do jogo aqui
    }
}