//CONSTRUCTORA DE ELEMENTOS DEL MAPA
var gameObject = function(game, sprite, posX, posY, anchorX, anchorY, scaleX, sacaleY, sizeX, sizeY, relativeCX, relativeCY, gravity, movable)
{
  Phaser.Sprite.call(this, game, posX, posY, sprite);
  this.anchor.set(anchorX, anchorY);
  this.scale.setTo(scaleX, sacaleY);
  this.game.physics.enable(this,Phaser.Physics.ARCADE);
  this.body.setSize(sizeX, sizeY, relativeCX, relativeCY);
  this.body.collideWorldBounds = true;
  this.body.immovable = movable;
  this.body.allowGravity = gravity;
  this.game.world.addChild(this);
  
}
gameObject.prototype = Object.create(Phaser.Sprite.prototype);
gameObject.prototype.constructor = gameObject;

//CONSTRUCOTRA DE CHARACTERS
var character = function(game, sprite, posX, posY, anchorX, anchorY, scaleX, sacaleY, sizeX, sizeY, relativeCX, relativeCY, gravity, movable)
{
  this.vidas = 3;
  gameObject.call(this, game, sprite, posX, posY, anchorX, anchorY, scaleX, sacaleY, sizeX, sizeY, relativeCX, relativeCY, gravity, movable);
};
character.prototype = Object.create(gameObject.prototype);
character.prototype.constructor = character;

//CONSTRUCTORA DE PLAYER
var player=function(game, sprite, posX, posY, anchorX, anchorY, scaleX, sacaleY,cursors,firebutton,weapon, sizeX, sizeY, relativeCX, relativeCY, gravity, movable)
{
  this.game = game;
  this.cursors=cursors;
  this.firebutton=firebutton;
  this.weapon=weapon;
  this.inLand = false;
  this.actualScale = 1;
  this.inPlatform = false;
  character.call(this, game, sprite, posX, posY, anchorX, anchorY, scaleX, sacaleY, sizeX, sizeY, relativeCX, relativeCY, gravity, movable);
//ANIMACIONES
this.animations.add('wait', [0,1,2,3,4,5,6,7]);
this.animations.add('walk', [16,17,18,19,21]);
};
player.prototype = Object.create(character.prototype);
player.prototype.constructor = player;

//CONSTRUCTORA DE ENEMIGO
var enemigo=function(game, sprite, posX, posY, anchorX, anchorY, scaleX, sacaleY, sizeX, sizeY, relativeCX, relativeCY, gravity, movable)
{
  this.game = game;
  this.muerto = false;
  character.call(this, game, sprite, posX, posY, anchorX, anchorY, scaleX, sacaleY, sizeX, sizeY, relativeCX, relativeCY, gravity, movable);

//ANIMACIONES
this.animations.add('walk', [18,19,20,21,22, 23, 24]);
this.animations.add('muerte',[7, 8]);
};
enemigo.prototype = Object.create(character.prototype);
enemigo.prototype.constructor = enemigo;


player.prototype.update = function(){
  
  this.weapon.trackSprite(this, 55*this.actualScale, -8, true);
  this.weapon.bulletSpeed = 900*this.actualScale;

  if(this.body.onFloor() || this.inPlatform)
  {
    this.inLand = true;
  }
  else
  {
    this.inLand = false;
  }

  if (this.firebutton.isDown)
  {
    this.weapon.fire();
  }

  if (this.cursors.up.isDown && (this.body.onFloor() || this.inPlatform))
    {
        this.inPlatform = false;
        this.body.velocity.y = -350;
    }

    if (this.cursors.left.isDown)
    {
      this.actualScale = -1;
      this.body.velocity.x = -150;
      this.scale.setTo(-1, 1);
      this.animations.play('walk', 10, true);
    }
    else if (this.cursors.right.isDown)
    {
      this.actualScale = 1;
      this.body.velocity.x = 150;
      this.scale.setTo(1, 1);
      this.animations.play('walk', 10, true);
    }
    else { 
      this.animations.play('wait', 10, true);

      this.body.velocity.x = 0;

      
  }


}

player.prototype.suelo = function(plataformas){
 this.game.physics.arcade.collide(this, plataformas, 
    function()
    {
      this.inPlatform = true;
    }
    ,null,this)
}

enemigo.prototype.update = function(){
  
  if(!this.muerto){
    this.body.velocity.x = -30;
  this.animations.play('walk', 10, true);
  }

  else{
    this.body.velocity.x = 0;
    this.animations.play('muerte', 1, false);
    this.game.time.events.add(Phaser.Timer.SECOND*1.5,
        
      function()
      {
        this.kill()
      },
    this)
  }
}

enemigo.prototype.daño=function(weapon)
{
  if(this.vidas <= 0)
  this.muerto = true;
  else{
  this.game.physics.arcade.collide(this,weapon.bullets,
    function(sprite,bullet)
    { 
    bullet.kill();
    this.vidas--;
    console.log(this.vidas);
    }
    ,null,this);
  }
}

module.exports=
{
  gameObject,
  player,
  enemigo,
}