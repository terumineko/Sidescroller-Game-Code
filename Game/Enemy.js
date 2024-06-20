export default class Enemy  {
    constructor(x, y, width, height, image, speed, health, score) {
        this.x = x;
        this.y =y;
        this.height = height;
        this.width = width;
        this.image = image;
        this.speed = speed;
        this.isFacingRight = false;
        this.health = health;
        this.score = score
    }

    draw(context){
        if (this.isFacingRight){
            context.drawImage(this.image, this.x, this.y);        }
        else {
            context.save();
            const posX = -this.x - this.width;
            context.scale(-1, 1);
            context.drawImage(this.image, posX, this.y);
            context.restore();
        }
    }

    update(playerPositionX) {
        if (Math.abs(this.x - playerPositionX) <= this.speed) {
            return;
        }
        this.isFacingRight = this.x >= this.speed;
        this.x += playerPositionX > this.x? this.speed: -this.speed;        
    }

    isColliding(x, y) {
        return x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height;
    }

    takeDamage() {
        this.health -= 1;
    }
    isDead() {
        return this.health <= 0;
    }
}