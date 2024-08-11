export class Player extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);
        this.maxlife = 100;
        this.life = this.maxlife;
        this.speed = 1;
        this.cure = 1;
        this.damage = 1;
        this.resistence = 1;
        this.precision = 1;
        this.constitution = 1;
        this.item = this.item || [];
        // status aparecendo
        this.itemtext = '';
        this.statusread = "speed : " + this.speed + "\n" +
            "precision : " + this.precision * 100 + '%' + "\n" +
            "constitution : " + this.constitution * 100 + '%' + "\n" +
            "cure : " + this.cure + "\n" +
            "damage : " + this.damage + "\n" +
            "resistence : " + this.resistence + "\n" +
            "your item : " + this.itemtext + "\n" +
            "YOUR LIFE : " + this.life;

        this.statuswrite = scene.add.text(775, 0, this.statusread, { fontSize: '15px', fill: '#fff' });
        this.statuswrite.setOrigin(0, 0);
        this.add(this.statuswrite);

        //adicionando container
        scene.add.existing(this);
    }
    update() {
        if (this.item && this.item.length === 4)
            this.itemtext = this.item[0].toString(16) + this.item[1].toString(16) + this.item[2].toString(16) + this.item[3].toString(16);
        else
            this.itemtext = '';
        this.statusread = "speed : " + this.speed + "\n" +
            "precision : " + Math.floor(this.precision * 100) + '%' + "\n" +
            "constitution : " + Math.floor(this.constitution * 100) + '%' + "\n" +
            "cure : " + this.cure + "\n" +
            "damage : " + this.damage + "\n" +
            "resistence : " + this.resistence + "\n" +
            "your item : " + this.itemtext + "\n" +
            "YOUR LIFE : " + Math.floor(this.life);
        this.statuswrite.setText(this.statusread);
    }
}
