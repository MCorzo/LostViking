var asteroidSpeed = 2;
var bulletSpeed = 10;
var shipSpeed = 5;
var ship;
var asteroids;
var bullets;
var shootType = 1;

function setup() {
    createCanvas(600, 600);

    ship = createSprite(width / 2, height - 50, 35, 35);
    ship.shapeColor = color(255);
    ship.setCollider('rectangle', 0, 0, 35, 35);
    ship.hp = 5;

    asteroids = new Group();
    bullets = new Group();
}

function draw() {
    background(0);

    fill(800);
    textAlign(CENTER);
    text('Lifes : ' + ship.hp, width - 60, 20);

    if (ship.hp > 0) {
        if (keyWentDown(LEFT_ARROW)) ship.setSpeed(shipSpeed, 180);
        if (keyWentUp(LEFT_ARROW)) ship.setSpeed(0, 180);
        if (keyWentDown(RIGHT_ARROW)) ship.setSpeed(shipSpeed, 0);
        if (keyWentUp(RIGHT_ARROW)) ship.setSpeed(0, 0);
        if (keyWentDown(UP_ARROW)) ship.setSpeed(shipSpeed, 270);
        if (keyWentUp(UP_ARROW)) ship.setSpeed(0, 270);
        if (keyWentDown(DOWN_ARROW)) ship.setSpeed(shipSpeed, 90);
        if (keyWentUp(DOWN_ARROW)) ship.setSpeed(0, 90);
        if (keyWentDown('1')) shootType = 1;
        if (keyWentDown('2')) shootType = 2;
        if (keyWentDown('3')) shootType = 3;

        if (random(50).toFixed(0) == 1) drawEnemy();

        asteroids.overlap(bullets, asteroidHit);
        asteroids.overlap(ship, shipHit);
    } else {
        fill(1800);
        textAlign(CENTER);
        text('GAME OVER !!!', width / 2, height / 2);
    }
    drawSprites();
}

function keyPressed() {
    if (ship.hp > 0) {
        if (key == ' ') { shoot(); }
    }
    return false;
}

function drawEnemy() {
    asteroid = createSprite(25 * random(20).toFixed(0), 0, 15, 15);
    asteroid.rotationSpeed = .8;
    asteroid.setSpeed(asteroidSpeed, 90);
    asteroid.setCollider('rectangle', 0, 0, 15, 15);
    asteroid.life = 300;
    asteroid.hp = 3;
    asteroids.add(asteroid);
}

function shoot() {
    switch (shootType) {
        case 1:
            bullet = createSprite(ship.position.x, ship.position.y, 5, 5);
            bullet.shapeColor = color(255);
            bullet.setCollider('rectangle', 0, 0, 5, 5);
            bullet.setSpeed(bulletSpeed, 270);
            bullet.life = 65;

            bullets.add(bullet);
            break;
        case 2:
            bullet2 = createSprite(ship.position.x, ship.position.y, 5, 45);
            bullet2.shapeColor = color(255);
            bullet2.setCollider('rectangle', 0, 0, 5, 45);
            bullet2.setSpeed(bulletSpeed, 270);
            bullet2.life = 65;

            bullets.add(bullet2);
            break;
        case 3:
            bullet1 = createSprite(ship.position.x, ship.position.y, 5, 5);
            bullet1.shapeColor = color(255);
            bullet1.setCollider('rectangle', 0, 0, 5, 5);
            bullet1.setSpeed(bulletSpeed, 270);
            bullet1.life = 65;

            bullet2 = createSprite(ship.position.x, ship.position.y, 5, 5);
            bullet2.shapeColor = color(255);
            bullet2.setCollider('rectangle', 0, 0, 5, 5);
            bullet2.setSpeed(bulletSpeed, 315);
            bullet2.life = 65;

            bullet3 = createSprite(ship.position.x, ship.position.y, 5, 5);
            bullet3.shapeColor = color(255);
            bullet3.setCollider('rectangle', 0, 0, 5, 5);
            bullet3.setSpeed(bulletSpeed, 225);
            bullet3.life = 65;

            bullets.add(bullet1);
            bullets.add(bullet2);
            bullets.add(bullet3);
            break;
        default:
            break;
    }
}

function asteroidHit(asteroid, bullet) {
    asteroid.hp--;
    if (asteroid.hp == 0) asteroid.remove();
    bullet.remove();
}

function shipHit(asteroid) {
    ship.hp--;
    if (ship.hp == 0) {
        ship.remove();
    }

    asteroid.remove();
}