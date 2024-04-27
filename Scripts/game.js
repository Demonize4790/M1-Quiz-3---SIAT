
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var player, object, outcome, coin, controls, textScore;
var score = 0;

function preload() {
    this.load.image('background', 'Assets/temple.png');
    this.load.image('player', 'Assets/Frieren1.png');
    this.load.image('object', 'Assets/chest1.png');
    this.load.image('outcome', 'Assets/outcome.png');
    this.load.image('coin', 'Assets/flower.png');
    this.load.audio('owie', 'Assets/audio/Mimic.m4a');
    this.load.audio('flower', 'Assets/audio/Hm.m4a');
}

function create() {
    // Add background
    this.add.image(400, 300, 'background');

    // score and display score
    score = 0;
    let style = { font: "30px Arial", fill: "#ffffff" };
    textScore = this.add.text(30, 10, "Score: " + score, style);

    //  player
    player = this.physics.add.sprite(150, 350, 'player');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    //  object and coin
    object = this.physics.add.sprite(650, 355, 'object');
    coin = this.physics.add.sprite(370, 400, 'coin');

    // Cntrols
    controls = this.input.keyboard.createCursorKeys();

    // overlap checks
    this.physics.add.overlap(player, coin, collectCoin, null, this);
    this.physics.add.overlap(player, object, reachOutcome, null, this);
}

function update() {
    // Player movement
    if (controls.left.isDown) {
        player.x -= 2;
        player.flipX = false;
    } else if (controls.right.isDown) {
        player.x += 2;
        player.flipX = true;
    } else {
        player.setVelocityX(0);
    }
}

function collectCoin(player, coin) {
    // Increase score by 100
    score += 100;
    // Update score text
    textScore.setText("Score: " + score);
    // Play flower sound effect
    this.sound.play('flower');
    // Disable the coin sprite
    coin.disableBody(true, true);
}

function reachOutcome(player, object) {
    // Play outcome sound effect
    this.sound.play('owie');

    // Hide the player sprite
    player.setVisible(false);

    // Disable the player and object sprites
    player.disableBody(true, true);
    object.disableBody(true, true);

    // outcome sprite same coordinates as the object
    let outcomeSprite = this.add.sprite(object.x, object.y, 'outcome');

    // Display "Game Over" message
    let gameOverStyle = { font: "40px Arial", fill: "#ff0000", align: 'center' };
    let gameOverText = this.add.text(400, 300, "Game Over", gameOverStyle);
    gameOverText.setOrigin(0.5); // Center the "Game Over"

    // Stop the game
    this.physics.pause();
}
