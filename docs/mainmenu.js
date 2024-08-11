import { Button } from "./UIelements.js";
export class Credits extends Phaser.Scene {
    constructor() {
        super({ key: 'credits' });
    }
    preload() {
        this.load.image('next', 'assets/sprites/nextbutton.png');
    }

    create() {
        //interface com elementos html
        let referencia = this;
        let Button0 = new Button(this, 850, 350, 'next', '', () => { referencia.scene.start('mainmenu'); });
        this.scoreText = this.add.text( 50, 50, 'BY ONLY ME : RAUL RONALD', { 
            fontSize: '64px', 
            fill: '#FF0000',
            fontWeight: '900' 
        }).setScrollFactor(0).setDepth(3);
    }

    update() {
        // Atualize a l�gica do jogo aqui
    }
}
export class Mainmenu extends Phaser.Scene {
    constructor() {
        super({ key: 'mainmenu' });
    }
    preload() {
        // Carregue recursos aqui
        this.load.image('mainmenuBG', 'assets/sprites/menuBackGround.png');
        this.load.image('startbutton0', 'assets/sprites/startButton.png');
        this.load.image('startbutton1', 'assets/sprites/creditsButton.png');
    }

    create() {
        //interface com elementos html
        let referencia = this;
        this.add.image(0, 0, 'mainmenuBG').setOrigin(0).setScrollFactor(1).setScale(1);
        let Button0 = new Button(this, 500, 350, 'startbutton0', '', () => { referencia.scene.start('warning'); });
        let Button1 = new Button(this, 550, 450, 'startbutton1', '', () => { referencia.scene.start('credits');});
    }
}
