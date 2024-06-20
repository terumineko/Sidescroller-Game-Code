const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const canvasWidth = canvas.width = 1000;
const canvasHeight = canvas.height = 700;
let gameSpeed = 5;

const Layer1 = new Image();
Layer1.src = "./Background/1.png";
const Layer2 = new Image();
Layer2.src = "./Background/2.png";
const Layer3 = new Image();
Layer3.src = "./Background/3.png";
const Layer4 = new Image();
Layer4.src = "./Background/4.png";
const Layer5 = new Image();
Layer5.src = "./Background/5.png";

class LayerSettings {
    constructor(image, scrollSpeed) {
        this.width = 2400;
        this.height = 700;
        this.x = 0;
        this.x2 = this.width;
        this.y = 0;
        this.image = image;
        this.scrollSpeed = scrollSpeed;
        this.speed = gameSpeed * this.scrollSpeed;
    }
    update() {
        this.speed = gameSpeed * this.scrollSpeed;
        if (this.x <= -this.width) {
            this.x = this.width + this.x2 - this.speed;
        }
        if (this.x2 <= -this.width) {
            this.x2 = this.width + this.x - this.speed;
        }
        this.x = Math.floor(this.x - this.speed);
        this.x2 = Math.floor(this.x2 - this.speed);
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
    }
}

class Background {
    constructor() {
        const layer1 = new LayerSettings(Layer1, 0.1);
        const layer2 = new LayerSettings(Layer2, 0.2);
        const layer3 = new LayerSettings(Layer3, 0.4);
        const layer4 = new LayerSettings(Layer4, 0.6);
        const layer5 = new LayerSettings(Layer5, 1);
        this.AllLayers = [layer1, layer2, layer3, layer4, layer5];
    }

    update(){
        this.AllLayers.forEach(layer => layer.update());
    }
    draw(ctx){
        this.AllLayers.forEach(layer => layer.draw(ctx));
    }
    
}

export default Background;

// function animation() {
//     ctx.clearRect(0, 0, canvasWidth, canvasHeight);
//     AllLayers.forEach(layer => {
//         layer.update();
//         layer.draw();
//     });
//     requestAnimationFrame(animation);
// };
// animation();
