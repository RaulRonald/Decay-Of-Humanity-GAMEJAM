
export class Button extends Phaser.GameObjects.Container {
    constructor(scene, x, y, key, text, targetCallback) {
        super(scene, x, y);

        // Adiciona a imagem do bot�o
        this.buttonimage = scene.add.image(0, 0, key);
        this.buttonimage.setScale(1);
        this.add(this.buttonimage);

        // Adiciona o texto do bot�o
        this.text = scene.add.text(0, 0, text, { fontSize: '32px', fill: '#fff' });
        this.text.setOrigin(0,0);
        this.add(this.text);

        // Ajusta o tamanho do bot�o (opcional)
        // this.button.setScale(0.5);

        // Habilita a interatividade do bot�o
        this.buttonimage.setInteractive();

        // Adiciona o callback ao evento 'pointerdown'
        this.buttonimage.on('pointerdown', () => {
            targetCallback();
        });

        // Adiciona eventos para hover (pointerover e pointerout)
        this.buttonimage.on('pointerover', () => {
            this.buttonimage.setTint(0x999999);  // Aplica uma sombra ao bot�o
        });

        this.buttonimage.on('pointerout', () => {
            this.buttonimage.clearTint();  // Remove a sombra do bot�o
        });

        // Adiciona o Container � cena
        scene.add.existing(this);
    }
}
