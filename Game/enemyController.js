import Enemy from "./Enemy.js";
export default class EnemyController {
    enemies = [];
    constructor(spawnX, spawnY) {
        this.spawnX = spawnX;
        this.spawnY = spawnY;
    }
    
    spawnEnemy(speed, image, health, enemyWidth, enemyHeight, score) {
        const spawnX = Math.random() < 0.2? -10 : this.spawnX;
        this.enemies.push(new Enemy(spawnX, this.spawnY, enemyWidth, enemyHeight, image, speed, health, score))
    }

    draw(context) {
        this.enemies.forEach(enemy => enemy.draw(context))
    }
    update(playerPositionX, bulletController) {
        this.enemies.forEach(enemy => enemy.update(playerPositionX));
        const colissionPoints = bulletController.getBulletPositions();
        const bullet_indexes_to_remove = [];
        const enemies_hit = [];
        colissionPoints.forEach((point, index) => {
            const x = point.x;
            const y = point.y;
            this.enemies.forEach((enemy, enemyIndex) => {
                if (enemy.isColliding(x,y)) {
                    bullet_indexes_to_remove.push(index);
                    enemies_hit.push(enemyIndex);
                }
            })
        })
        bullet_indexes_to_remove.reverse();
        bullet_indexes_to_remove.forEach(index => bulletController.destroyIndex(index));
        enemies_hit.reverse();
        enemies_hit.forEach(index => {
            const enemy = this.enemies[index];
            enemy.takeDamage();
            if (enemy.isDead()) {
                const score = document.getElementById("score");
                score.innerHTML = parseInt(score.innerHTML, 10) + enemy.score
                this.enemies.splice(index, 1);
            }
        })
    }

    spawnPurpleSlime() {
        this.spawnEnemy(4, document.getElementById("enemyPurple"), 2, 80, 80, 10);
    }

    spawnOrangeSlime() {
        this.spawnEnemy(6, document.getElementById("enemyOrange"), 1, 80, 80, 5);
    }

    spawnPinkSlime() {
        this.spawnEnemy(5, document.getElementById("enemyPink"), 4, 80, 80, 20);
    }

    spawnRedSlime() {
        this.spawnEnemy(2, document.getElementById("enemyRed"), 5, 80, 80, 20);
    }

    spawnTealSlime() {
        this.spawnEnemy(4, document.getElementById("enemyTeal"), 3, 80, 80, 15);
    }

    spawnRandom() {
        const methods = [
            this.spawnPurpleSlime,
            this.spawnOrangeSlime,
            this.spawnPinkSlime,
            this.spawnRedSlime,
            this.spawnTealSlime
        ];
    
        const randomIndex = Math.floor(Math.random() * methods.length);
        methods[randomIndex].call(this);
    }
    getEnemyBoxes() {
        return this.enemies.map(enemy => ({x: enemy.x, y: enemy.y, width: enemy.width, height: enemy.height}))
    }
}
