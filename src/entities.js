var HeroEntity  = me.ObjectEntity.extend({
  init: function(x, y, settings){
            // Constants
            this.FLICKER_TIME = 45,
            this.parent(x, y, settings);

            this.setVelocity(3,15);
	    this.updateColRect(1, 30, 10, 54);            
            me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
            this.collidable = true;
            this.powerUpColor = "none";
            this.credits = 5;
            this.life = 3;
                } 
        ,
  update: function(){
        if (me.input.isKeyPressed('left')) {
            this.flipX(true);
            this.vel.x -= this.accel.x * me.timer.tick;

        } else if (me.input.isKeyPressed('right')) {
            this.vel.x += this.accel.x * me.timer.tick;
        }else{

            this.vel.x = 0;
        }

        if(me.input.isKeyPressed('jump')){
            if(!this.jumping && ! this.falling){
		me.audio.play("jump", false);
		this.vel.y = - this.maxVel.y * me.timer.tick;
                this.jumping = true;
            }
        }
          this.updateMovement();

          // Collision
          var res = me.game.collide(this);
          if (res){
              // Handle collision with acid
              if(res.obj.isAcid == true){
                  if(res.obj.acidColor != this.powerUpColor){
                     this.getDamage();
                  } 
              }

              // Handle collision with enemy
                  if (res.obj.type == me.game.ENEMY_OBJECT){
                      if(res.obj.name == "enemy1entity"){
                          this.getDamage();
                      }
                      else if(res.obj.name == "enemy2entity"){
                          if ((res.y > 0) && ! this.jumping){
			      me.audio.play("jump_on_enemy");
                              me.game.HUD.updateItemValue("score", 150);
		   	      this.falling = false;
                              this.vel.y = -this.maxVel.y * me.timer.tick;
                              this.jumping = true;
                          }
                          else{
                              this.getDamage();
                          }
                      }
                  }

            // Handle collision with power up
            if(res.obj.type == "powerup"){

                console.log(res.obj);
                this.getPowerUp(res.obj.powerupcolor);
      
	          console.log("got powerup");
                
            };

          }

          
          // Check if hero de fall from the map
          if(this.pos.y + this.height > me.game.currentLevel.height * me.game.currentLevel.tileheight){
              this.die();
          }
          
          if (this.vel.x!=0 || this.vel.y!=0) {
              this.parent();
              return true;
          }

          return false;

          },
  // The hero has no lives left and dies
  die: function(){
<<<<<<< HEAD
           tmpCredits = me.gamestat.getItemValue("creditsCurrent")
          me.gamestat.setValue("creditsCurrent", --tmpCredits);
           if(tmpCredits < 0){
=======
           console.log("The hero died.");
           me.game.HUD.updateItemValue("credits", -1);   
           if(me.game.HUD.getItemValue("credits") < 0){
>>>>>>> 0dcf5002a63e2f30b0302589a03137b2d80e4fc5
               console.log("No credits left");
               me.state.change(me.state.GAME_OVER);
              
		//disable HUD
		
		//me.game.HUD.removeItem("score");
		me.game.HUD.removeItem("lifes");
		me.game.HUD.removeItem("coins");
		me.game.HUD.removeItem("credits");
		 
		// TODO: command to continue
           }
           else{
		console.log("lifelog");
		console.log(me.lifeStart);
               me.game.HUD.setItemValue("lifes", me.lifeStart);
           }
           me.levelDirector.reloadLevel()
       },

  // The hero gets  damage
  getDamage: function(){
                 if(!this.isFlickering()){
                 me.game.HUD.updateItemValue("lifes", -1);   
		 if(me.game.HUD.getItemValue("lifes") <= 0)  {
                        this.die();
                        return;
                    }
                    this.flicker(this.FLICKER_TIME);
                 }
             },

  // Hero gets a powerup
  // @param color string with the color of the powerup
  getPowerUp: function(color){
                  this.powerUpColor = color;
                  console.debug(this);
                  console.debug(color);
                  // Set image
                  if(color == "red"){
                     this.image = me.loader.getImage("red_hero");
                  } else if(color == "blue"){
                     this.image = me.loader.getImage("blue_hero");
                  } else if(color == "green"){
                     this.image = me.loader.getImage("green_hero");
                  }
              }

});

/*-------------- 
a score HUD Item
--------------------- */
 
var ScoreObject = me.HUD_Item.extend({
    init: function(x, y) {
        // call the parent constructor
        this.parent(x, y);
        // create a font
        this.font = new me.BitmapFont("32x32_font", 32);
    },
 
    /* -----
 
    draw our HUD
 
    ------ */
    draw: function(context, x, y) {
        this.font.draw(context, this.value, this.pos.x + x, this.pos.y + y);
    }
 
});




/*----------------
 a Coin entity
------------------------ */
var CoinEntity = me.CollectableEntity.extend({
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init: function(x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);
    },
 
    // this function is called by the engine, when
    // an object is touched by something (here collected)
    onCollision: function() {
        // do something when collected
	// give some score & coins and handle lifes
    	me.game.HUD.updateItemValue("score", 100);
	if(me.game.HUD.getItemValue("coins") == 99){
		me.game.HUD.updateItemValue("credits", 1); 
		me.game.HUD.setItemValue("coins",0);
	} else{
		me.game.HUD.updateItemValue("coins", 1); }
 
        // make sure it cannot be collected "again"
        this.collidable = false;
        // remove it
        me.game.remove(this);
    } }); 
/*----------------
 a Powerup entity
------------------------ */
var PowerupEntity = me.CollectableEntity.extend({
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init: function(x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);
        this.powerupcolor = settings.color;

        // Power up parameters
        this.type = "powerup";
        

        this.startX = x;
        this.endX = x + settings.width - settings.spritewidth;
        // size of sprite
 
        // make them start from startposition
        if (!settings.startposition ){
		this.pos.x = x + settings.width - settings.spritewidth;
       	}else{
		this.pos.x = x + settings.startposition * settings.spritewidth;
	}
	 this.walkLeft = true;
	this.move = settings.move; 
        // walking & jumping speed
        this.setVelocity(4, 6);
 
        // make it collidable
        this.collidable = true;

    },


    // manage the powerup movement
    update: function() {
        // do nothing if not visible
        if (!this.inViewport)
            return true;
 
        if (this.alive) {
            if (this.walkLeft && this.pos.x <= this.startX) {
                this.walkLeft = false;
            } else if (!this.walkLeft && this.pos.x >= this.endX) {
                this.walkLeft = true;
            }
            // make it walk
            this.flipX(this.walkLeft);
            this.vel.x += (this.walkLeft) ? -this.accel.x * me.timer.tick : this.accel.x * me.timer.tick;
                 
        } else {
            this.vel.x = 0;
        }
        
	//console.log(this.move);
	 
        // check and update movement if move is true
        if (this.move == "1"){
		this.updateMovement();
	}
         
        // update animation if necessary
        if (this.vel.x!=0 || this.vel.y!=0) {
            // update object animation
            this.parent();
            return true;
        }
        return false;
    },
 
    // this function is called by the engine, when
    // an object is touched by something (here collected)
    onCollision: function() {
        // do something when collected
 
        // make sure it cannot be collected "again"
        this.collidable = false;
        // remove it
        me.game.remove(this);
    }
});

/* --------------------------
an enemy Entity
------------------------ */
var EnemyEntity = me.ObjectEntity.extend({
    init: function(x, y, settings) {
        // define this here instead of tiled
       // settings.image = "wheelie_right";
       // settings.spritewidth = 64;
 
        // call the parent constructor
        this.parent(x, y, settings);
 
        // Set velocity

        if(settings.velocity){
            this.setVelocity(settings.velocity, 6);
        }
        else{
            this.setVelocity(4,6);
        }

        this.startX = x;
        this.endX = x + settings.width - settings.spritewidth;
        // size of sprite
 
        // make them start from startposition
        if (!settings.startposition ){
		this.pos.x = x + settings.width - settings.spritewidth;
       	}else{
		this.pos.x = x + settings.startposition * settings.spritewidth;
	}
	 this.walkLeft = true;
 
        // make it collidable
        this.collidable = true;
        // make it a enemy object
        this.type = me.game.ENEMY_OBJECT;

        // Life
        this.life = 1;
 
    },
 
    // call by the engine when colliding with another object
    // obj parameter corresponds to the other object (typically the player) touching this one
    onCollision: function(res, obj) {
 
        // res.y >0 means touched by something on the bottom
        // which mean at top position for this one
        if (this.alive && (res.y > 0) && obj.falling) {
            this.flicker(45);
        }
    },
 
    // manage the enemy movement
    update: function() {
        // do nothing if not visible
        if (!this.inViewport)
            return true;
 
        if (this.alive) {
            if (this.walkLeft && this.pos.x <= this.startX) {
                this.walkLeft = false;
            } else if (!this.walkLeft && this.pos.x >= this.endX) {
                this.walkLeft = true;
            }
            // make it walk
            this.flipX(this.walkLeft);
            this.vel.x += (this.walkLeft) ? -this.accel.x * me.timer.tick : this.accel.x * me.timer.tick;
                 
        } else {
            this.vel.x = 0;
        }
         
        // check and update movement
        this.updateMovement();
         
        // update animation if necessary
        if (this.vel.x!=0 || this.vel.y!=0) {
            // update object animation
            this.parent();
            return true;
        }
        return false;
    },

    getDamage: function(){
                   this.life--;
                   if(this.life <=0){
                       this.collidable = false;
                        me.game.remove(this);
                   }
               }
});

var Enemy1Entity = EnemyEntity.extend({
  init: function(x, y, settings){
            this.parent(x, y, settings);
               },

    // call by the engine when colliding with another object
    // obj parameter corresponds to the other object (typically the player) touching this one
    onCollision: function(res, obj) {
 
    }
});
var Enemy2Entity = EnemyEntity.extend({
  init: function(x, y, settings){
            this.parent(x, y, settings);
               },

    onCollision: function(res, obj) {
 
        // res.y >0 means touched by something on the bottom
        // which mean at top position for this one
        if (this.alive && (res.y > 0) && obj.falling) {
            this.flicker(45);
            this.getDamage(1);
        }
    }
});

var AcidEntity  = me.ObjectEntity.extend({
  init: function(x, y, settings){
            ACID_HEIGHT = 8;

           // settings.spriteheight = settings.height;
            //settings.spritewidth = settings.width;
            settings.spritewidth = settings.width;
            settings.spriteheight = ACID_HEIGHT;
            y += (settings.height - ACID_HEIGHT);
            settings.height = ACID_HEIGHT;
            console.log(settings);
            this.parent(x, y, settings);
            this.setVelocity(0,0 );
            this.type = me.game.ENEMY_OBJECT;
            this.collidable = true;
            this.isAcid = true;
            
        },
  update: function(){

          },
  
  onCollision: function(){
               }

})
var RedAcidEntity = AcidEntity.extend({
  init: function(x, y, settings){
            settings.image = "red_acid256x256"
            this.parent(x, y, settings);
            this.acidColor="red" //TODO: Replace with enum 
        },
  update: function(){

          },
  
  onCollision: function(){
               }

});

var BlueAcidEntity = AcidEntity.extend({
  init: function(x, y, settings){
            settings.image = "blue_acid256x256"
            this.parent(x, y, settings);
            this.acidColor="blue" //TODO: Replace with enum 

        },
  update: function(){

          },
  
  onCollision: function(){
               }

});

var GreenAcidEntity  = AcidEntity.extend({
  init: function(x, y, settings){
            settings.image = "green_acid256x256"
            this.parent(x, y, settings);
            this.acidColor="green" //TODO: Replace with enum 
        },
  update: function(){
          },
  
  onCollision: function(){
               }

});


var Entity = me.ObjectEntity.extend({
  init: function(x, y, settings){
            this.parent(x, y, settings);
        },
  update: function(){

          },
  
  onCollision: function(){
               }

});
