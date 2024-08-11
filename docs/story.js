import { Button } from "./UIelements.js";
export class Story extends Phaser.Scene {
    constructor() {
        super({ key: 'story' });
    }
    preload() {
        this.load.image('next', 'assets/sprites/nextbutton.png');
        this.load.image('page', 'assets/sprites/page.png');
    }

    create() {
        this.add.image(0, 0, 'page').setOrigin(0).setScrollFactor(1).setScale(1);
        //interface com elementos html
        let referencia = this;
        let Button0 = new Button(this, 850, 350, 'next', '', () => { referencia.scene.start('tutorial'); });
    }

    update() {
        // Atualize a l�gica do jogo aqui
    }
}
