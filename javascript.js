// Array of all active keys
class Inputs {
    constructor() {
        this.keys = new Set();
        this.VALID_KEYS = new Set(["w", "a", "s", "d", " ", "u", "i", "o", "q", "e"]);
        
        // Event listener for keydown
        window.addEventListener('keypress', e => {
            if (this.VALID_KEYS.has(e.key)) {
                e.preventDefault();
                this.keys.add(e.key);
            }
        });

        // Event listener for keyup
        window.addEventListener('keyup', e => {
            e.preventDefault();
            this.keys.delete(e.key);
        });
    }

    is_key_pressed(key) {
        return this.keys.has(key);
    }
}


// Player animation as per Inputs
class Player {
    constructor(windowWidth, windowHeight, path_to_images, special1, special2) {
        this.width = 200;
        this.height = 200;
        this.windowWidth = windowWidth;
        this.windowHeight = windowHeight;
        this.x = 0;
        this.y = this.windowHeight - this.height;
        this.image = document.getElementById('player');
        this.framex = 0;
        this.framey = 0;
        this.speed = 5;
        this.y_velocity = 0;
        this.x_velocity = 0;
        this.x_dash_velocity = 80;
        this.last_dash = 0;
        this.last_jump = 0;
        this.path_to_images = path_to_images; // any image is in this.path_to_images + 'image_name'
        this.special1 = special1;
        this.special2 = special2;
        this.last_special1 = 0;
        this.last_special2 = 0;
    }
    draw(context){
        context.fillRect(this.x, this.y, this.width, this.height);
        context.fillStyle = 'black';
        context.drawImage(this.image, this.x, this.y);
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
        if (Math.abs(this.x_velocity) > this.speed) {
            this.updateHorizontalPositionWithVelocity();
        } else {
            if (inputs.is_key_pressed('d')) {
                this.updateHorintalPositionAndVelocity(1, inputs); // 1 for right direction
            } else if (inputs.is_key_pressed('a')) {
                this.updateHorintalPositionAndVelocity(-1, inputs); // -1 for left direction
            }
        }
    }

    jumpingMechanic(inputs) {
        // Jump if player is on the ground and 'w' is pressed
        const current_time = Math.floor(new Date().getTime() / 1000);
        if (this.y === this.windowHeight - this.height && inputs.is_key_pressed('w') 
        && current_time - this.last_jump > 0.02) {
            this.y_velocity = -20; 
            this.last_jump = current_time;
        }
    }

    applyGravity() {
        if (this.y < this.windowHeight - this.height) {
            this.y_velocity += 1;
        } else {
            this.y_velocity = 0;
            this.y = this.windowHeight - this.height;
        }

    }
    // Update player position based on inputs
    updateVerticalPosition(inputs) {
        this.applyGravity()
        this.jumpingMechanic(inputs)
        this.y += this.y_velocity;
    }
    updateSpecials(inputs) {
        const current_time = Math.floor(new Date().getTime() / 1000);
        if (inputs.is_key_pressed('u') && current_time - this.last_special1 > 0.2) {
            this.special1(this);
            this.last_special1 = current_time;
        }
        if (inputs.is_key_pressed('i') && current_time - this.last_special2 > 0.2) {
            this.special2(this);
            this.last_special2 = current_time;
        }
    }
    update(inputs) {
        this.updateVerticalPosition(inputs);
        this.updateHorizontalPosition(inputs);
        this.updateSpecials(inputs);
    }
}

// Background scrolling
class Background {

}

// Enemy spawning, despawning, and animating
class Enemy {

}

class Projectile {
    constructor(x,y, damage, image) {
        this.x = x;
        this.y = y;
        this.damage = damage;
        this.image = image
        this.start_time = Math.floor(new Date().getTime() / 1000);
    }
    update() {
        this.x += 5;
    }
}


class CircleProjectile extends Projectile {
    constructor(x,y, image, damage, radius) {
        super(x,y, image,damage);
        this.radius = radius;
        this.start_time = Math.floor(new Date().getTime() / 1000);
        super.image;
    }
    update() {
        const current_time = Math.floor(new Date().getTime() / 1000);
    }
}
class ConeProjectile extends Projectile {
    constructor(x,y, image, damage, angle, radius) {
        super(x,y, image,damage);
        this.angle = angle;
        this.radius = radius;
    }
}

const circleprojectile = new CircleProjectile(0,0, "./Projectile/circle.png", 10, 20);
const coneprojectile = new ConeProjectile(0,5, "./Projectile/cone.png", 10, 20);

// Score display and updating
function Score() {

}

const pirateSpecial1 = (player) => {
    EnemyList.push(new CircleProjectile(player.x + 10, player.y, "./Projectiles/pirateSpecial1.jpg", 10, 20));
    // throw new Error("Not implemented yet");
};
const pirateSpecial2 = (player) => {
    throw new Error("Not implemented yet");
};
const valkSpecial1 = (player) => {
    throw new Error("Not implemented yet");
};
const valkSpecial2 = (player) => {
    throw new Error("Not implemented yet");
};
const rangerSpecial1 = (player) => {
    throw new Error("Not implemented yet");
};
const rangerSpecial2 = (player) => {
    throw new Error("Not implemented yet");
};
const EnemyList = [];
const ProjectileList = [];

window.addEventListener('load', function() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1000;
    canvas.height = 700;

    const inputs = new Inputs();
    const player = new Player(canvas.width, canvas.height, "", () => {console.log("First skill")}, () => {console.log("Second skill");});

    // Main animation loop at 60fps
    function GameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        player.draw(ctx);
        player.update(inputs);
        EnemyList.forEach(enemy => {
            enemy.update();
        });
        ProjectileList.forEach(projectile => {
            projectile.update();
        });
        requestAnimationFrame(GameLoop);
    }
    GameLoop();
});
