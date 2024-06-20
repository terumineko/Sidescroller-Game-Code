export default class Player {
    constructor(windowWidth, windowHeight, path_to_images, bulletController) {
        this.width = 65;
        this.height = 75;
        this.windowWidth = windowWidth;
        this.windowHeight = windowHeight;
        this.x = this.windowWidth/2;
        this.y = this.windowHeight - this.height;
        this.image = document.getElementById('player');
        this.hitImage = document.getElementById('playerDamage');
        this.framex = 0;
        this.framey = 0;
        this.speed = 10;
        this.y_velocity = 0;
        this.x_velocity = 0;
        this.x_dash_velocity = 80;
        this.last_dash = 0;
        this.last_jump = 0;
        this.path_to_images = path_to_images; // any image is in this.path_to_images + 'image_name'
        this.isFacingRight = true;
        this.walkingFrameIndex = 0
        this.bulletController = bulletController;
        this.last_shot = 0;
        this.health = 6;
        this.last_damage_taken = 0;
    }

    draw(context){
        const current_time = new Date().getTime() / 1000;
        const imageToUse = current_time - this.last_damage_taken > 0.25 || this.health >= 5? this.image: this.hitImage;

        if (this.isFacingRight){
            context.drawImage(imageToUse,this.x, this.y);
        }
        // flip the image if player is facing left
        else {
            context.save();
            const posX = -this.x - this.width;
            context.scale(-1, 1);
            context.drawImage(imageToUse, posX, this.y);
            context.restore();
        }
    }

    // Update player position based on velocity
    updateHorizontalPositionWithVelocity(){
        this.x += this.x_velocity;
        this.x_velocity /= 1.5;
    };
    
    // Update player position based on direction
    updateHorintalPositionAndVelocity(direction, inputs) {
        this.x += direction * this.speed;
        const current_time = Math.floor(new Date().getTime() / 1000);
        const isDashing = inputs.is_key_pressed(" ") && (current_time - this.last_dash > 0.2);
        if (isDashing) {
            this.last_dash = current_time;
            this.x_velocity = direction * this.x_dash_velocity;
        }
    };

    updateHorizontalPosition(inputs) {
        this.x-=4;        
        if (Math.abs(this.x_velocity) > this.speed) {
            this.updateHorizontalPositionWithVelocity();
        } else {

            if (inputs.is_key_pressed('d')) {
                this.updateHorintalPositionAndVelocity(1, inputs); // 1 for right direction
                this.isFacingRight = true;
            } else if (inputs.is_key_pressed('a')) {
                this.image.classList.add("Flipped");
                this.updateHorintalPositionAndVelocity(-1, inputs); // -1 for left direction
                this.isFacingRight = false;
            }
            else {
                this.walkingFrameIndex = 0
                this.image.src = "./PlayerImgs/Ranger/idle_0.png";
            }
        }
        if (this.x >= this.windowWidth - this.width) {
            this.x = this.windowWidth - this.width
        }
    }

    jumpingMechanic(inputs) {
        // Jump if player is on the ground and 'w' is pressed
        const current_time = Math.floor(new Date().getTime() / 1000);
        if (this.y === this.windowHeight - this.height - 111 && inputs.is_key_pressed('w') 
        && current_time - this.last_jump > 0.02) {
            this.y_velocity = -20; 
            this.last_jump = current_time;
        }
    }

    applyGravity() {
        if (this.y < this.windowHeight - this.height - 111) {
            this.y_velocity += 1;
        } else {
            this.y_velocity = 0;
            this.y = this.windowHeight - this.height - 111;
        }

    }
    // Update player position based on inputs
    updateVerticalPosition(inputs) {
        this.applyGravity()
        this.jumpingMechanic(inputs)
        this.y += this.y_velocity;
    }
    updateSpecials(inputs) {
        const current_time = new Date().getTime() / 1000;
        if (inputs.is_key_pressed('u') && current_time - this.last_shot > 0.3) {
            this.shoot()
            this.last_shot = current_time;
        }
    }
    update(inputs) {
        this.updateVerticalPosition(inputs);
        this.updateHorizontalPosition(inputs);
        this.updateSpecials(inputs);
    }

    shoot() {
        console.log("shoot");
        const speed = 20;
        const velocity = this.isFacingRight? speed: -speed;
        const damage = 1;
        const bulletX = this.x + this.width/2;
        const bulletY = this.y + this.height/3;
        this.bulletController.shoot(bulletX, bulletY, velocity, damage);
    }

    isCollidingWith(other) {
        return !(this.x + this.width < other.x ||
                 this.x > other.x + other.width ||
                 this.y + this.height < other.y ||
                 this.y > other.y + other.height);
    }
    checkCollisions(enemies) {
        for (let enemy of enemies) {
            if (this.isCollidingWith(enemy)) {
                return true; 
            }
        }
        return false; 
    }
    takeDamage() {
        const current_time = new Date().getTime() / 1000;
        if (current_time - this.last_damage_taken  > 2) {
            this.health -= 1;
            document.getElementById("healthDiv"). innerHTML = `<img class="heart" src="./PlayerImgs/Extras/heart.png"/>`.repeat(this.health)
            this.last_damage_taken = current_time;
        }
    }

    isDead() {
        return this.health <= 0;
    }
}