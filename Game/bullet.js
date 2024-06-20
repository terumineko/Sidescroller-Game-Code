export default class bullet{
    constructor(x,y,speed, damage) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.damage = damage;
        this.image = document.getElementById("bullet");
        this.width = 50;
        this.height = 50;
        this.isFacingRight = speed>0;
        
    }
    draw(context) {
        this.x += this.speed
        
        if (this.isFacingRight) {
            context.drawImage(this.image, this.x, this.y);
        }
        // flip the image if player is facing left
        else {
            context.save();
            const posX = -this.x - this.width;
            context.scale(-1, 1);
            context.drawImage(this.image, posX, this.y);
            context.restore();
        }
    }
}

