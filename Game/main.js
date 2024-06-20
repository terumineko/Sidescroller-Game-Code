import Background from "./background.js";
import BulletController from "./bulletcontroller.js";
import Player from "./Player.js";
import EnemyController from "./enemyController.js"
// Array of all active keys
class Inputs {
    constructor() {
        this.keys = new Set();
        this.VALID_KEYS = new Set(["w", "a", "s", "d", " ", "u", "i", "o", "q", "e"]);
        
        // Event listener for keydown
        window.addEventListener('keypress', e => {
            const key = e.key.toLowerCase();
            if (this.VALID_KEYS.has(key)) {
                e.preventDefault();
                this.keys.add(key);
            }
        });

        // Event listener for keyup
        window.addEventListener('keyup', e => {
            e.preventDefault();
            this.keys.delete(e.key.toLowerCase());
        });
    }

    is_key_pressed(key) {
        return this.keys.has(key);
    }
}


// Player animation as per Inputs

const gameover = () => {
    alert(`Game over!\nYou scored ${document.getElementById("score").innerHTML} points`)
    window.location.href = '../Menu/index.html';
}



const background = new Background();

window.addEventListener('load', function() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1000;
    canvas.height = 700;
    const ground_y = canvas.height-161;
    const bulletController = new BulletController(canvas, canvas.width);
    const enemyController = new EnemyController(canvas.width+100, ground_y);
    const inputs = new Inputs();
    const player = new Player(canvas.width, canvas.height, "./PlayerImgs/Pirate/attack_0.png", bulletController);
    player.takeDamage();
    // Main animation loop at 60fps
    let last_enemy_spawn = 0;
    function GameLoop() {
        const current_time = new Date().getTime() / 1000;
        if (current_time - last_enemy_spawn > 2) {
            enemyController.spawnRandom();
            if (Math.random() < 0.5) {
                enemyController.spawnRandom();
                if (Math.random() < 0.5) {
                    enemyController.spawnRandom();
                }
            }
            last_enemy_spawn = current_time;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        background.update()
        background.draw(ctx);

        bulletController.draw(ctx);

        player.update(inputs);
        player.draw(ctx);
        if (player.checkCollisions(enemyController.getEnemyBoxes())){
            player.takeDamage();
            if (player.isDead()) {
                gameover();
            }
        }
        

        enemyController.update(player.x +  player.width/2, bulletController);
        enemyController.draw(ctx);

        if (player.x + player.width < 0) {
            gameover();
        } 
        requestAnimationFrame(GameLoop);
    }
    GameLoop();
});
