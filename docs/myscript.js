import { Mainmenu } from "./mainmenu.js";
import { Credits } from "./mainmenu.js";
import { Story } from "./story.js";
import { Tutorial } from "./turorial.js";
import { Warning } from "./warning.js";
import { Gamescene } from "./gamescene.js";
import { Lose } from "./gamescene.js";
import { Won } from "./gamescene.js";
// defini��o da tela do jogo
var config = {
    type: Phaser.AUTO,
    width: 960,
    height: 540,
    parent: document.querySelector('.game-container'), 
    scene: null,
    player_name : null
};
//aderindo a tela ao jogo
export var game = new Phaser.Game(config);
//adicionando cenas ao game
game.scene.add('mainmenu', new Mainmenu());
game.scene.add('credits', new Credits());
game.scene.add('warning', new Warning());
game.scene.add('story', new Story());
game.scene.add('tutorial', new Tutorial());
game.scene.add('gamescene', new Gamescene());
game.scene.add('lose', new Lose());
game.scene.add('won', new Won());
//iniciandio a primeira cena
game.scene.start('mainmenu');
