import bullet from './bullet.js';

export default class bulletController{
    bullets = [];

    constructor(canvas, width) {
        this.canvas = canvas;
        this.width = width;
    }

    shoot(x,y, speed, damage) {
        this.bullets.push(new bullet(x,y, speed, damage));
    }

    draw(ctx) {
        const bullets_to_be_deleted = []
        this.bullets.forEach((bullet, index) => {
            if(this.isBulletOutOfBounds(bullet)) {
                bullets_to_be_deleted.push(index)

            }else {
                bullet.draw(ctx)
            }
            
        });
        bullets_to_be_deleted.reverse();
        bullets_to_be_deleted.forEach(index => this.bullets.splice(index, 1))
    }

    isBulletOutOfBounds(bullet) {
        return bullet.x > this.width || bullet.x < 0
    }
    destroyIndex(index) {
        this.bullets.splice(index, 1);
    }
    destroy(bullet) {
        const index = this.array.indexOf(bullet);
        if (index > -1) {
            this.bullets.splice(index, 1);
        } 
    }
    getBulletPositions() {
        return this.bullets.map(obj => ({ x: obj.x + obj.width, y: obj.y + obj.height/2}));
    }
}

// import Bullet from "./Bullet.js";

// export default class BulletController {
//   bullets = [];
//   timerTillNextBullet = 0;

//   constructor(canvas) {
//     this.canvas = canvas;
//   }

//   shoot(x, y, speed, damage, delay) {
//     if (this.timerTillNextBullet <= 0) {
//       this.bullets.push(new Bullet(x, y, speed, damage));

//       this.timerTillNextBullet = delay;
//     }

//     this.timerTillNextBullet--;
//   }

//   draw(ctx) {
//     this.bullets.forEach((bullet) => {
//       if (this.isBulletOffScreen(bullet)) {
//         const index = this.bullets.indexOf(bullet);
//         this.bullets.splice(index, 1);
//       }
//       bullet.draw(ctx);
//     });
//   }

//   collideWith(sprite) {
//     return this.bullets.some((bullet) => {
//       if (bullet.collideWith(sprite)) {
//         this.bullets.splice(this.bullets.indexOf(bullet), 1);
//         return true;
//       }
//       return false;
//     });
//   }

//   isBulletOffScreen(bullet) {
//     return bullet.y <= -bullet.height;
//   }
// }