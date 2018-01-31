'use strict';

var GO = require('.//characters.js');

var PlayScene = {
  create: function () {

    /*VARS DE UN PERSONAJE AL CREARLO, TODAS SUS COMPONENTES BODY
    this.player = this.game.add.sprite(100, 100, 'gunnyGuy');
    this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.player.body.collideWorldBounds = true;
    this.player.body.setSize(80, 70, 5, 16);
    this.player.anchor.setTo(0.5,0.5);
    */

    /*GRUPO DE BALAS, COMO CREARLO VER DISPARO EN PHASER EXAMPLES
    this.bullets = this.game.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(30, 'bullet', 0, false);
    this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 0.5);
    this.bullets.setAll('outOfBoundsKill', true);
    this.bullets.setAll('checkWorldBounds', true);
    */    
    
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.add.tileSprite(0, 0, 1700, 1820, 'BG');
    this.game.world.setBounds(0, 0, 1400, 1200);
    this.game.physics.arcade.gravity.y = 250;

    this.plataformas = this.game.add.physicsGroup();
    this.plataformas.add(new GO.gameObject(this.game, 'plataforma',500,1100, 0.5,0.5, 0.5,0.5, 950, 100, 0, 40,false, true));
    this.plataformas.add(new GO.gameObject(this.game, 'plataforma',600,900, 0.5,0.5, 0.5,0.5, 950, 100, 0, 40,false, true));
    this.plataformas.add(new GO.gameObject(this.game, 'plataforma',700,700, 0.5,0.5, 0.5,0.5, 950, 100, 0, 40,false, true));
    this.plataformas.add(new GO.gameObject(this.game, 'plataforma',800,500, 0.5,0.5, 0.5,0.5, 950, 100, 0, 40,false, true));


    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.ShootButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.NextShoot = 0;
    this.fireRate = 100;
    this.actualScale = 1;

    /*WEAPON*/
    //////////////
    this.weapon = this.game.add.weapon(30, 'bullet');
    this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    this.weapon.fireRate = 100;

    this.jugador = new GO.player(this.game, 'gunnyGuy', 32, 32, 0.5, 0.5, 1, 1, this.cursors, this.ShootButton, this.weapon, 55, 80, 17, 8, true, false);
    this.enemy = new GO.enemigo(this.game, 'enemy', 800, 32, 0.5, 0.5, 1.5, 1.5, 30, 50, 15, 5, true, false);
    
    this.game.camera.follow(this.jugador, Phaser.Camera.FOLLOW_LOCKON, 0.8, 0.8);
  },

  update: function() {
  this.jugador.suelo(this.plataformas); 
  this.enemy.daño(this.weapon);
  },
};

module.exports = PlayScene;
