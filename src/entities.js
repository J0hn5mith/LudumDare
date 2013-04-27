var HeroEntity  = me.ObjectEntity.extend({
  init: function(x, y, settings){
            this.parent(x, y, settings);

            this.setVelocity(3,15);
            
            me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
            this.collidable = true;
            this.powerUpColor = "none";
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
                this.vel.y = - this.maxVel.y * me.timer.tick;
                this.jumping = true;
            }
        }
          this.updateMovement();

          // Collision
          var res = me.game.collide(this);
          if (res){
                  if (res.obj.type == me.game.ENEMY_OBJECT){
                  };
              if(res.obj.isAcid == true){
                  if(res.obj.acidColor != this.powerUpColor){
                     this.die();
                  } 
              }
          }

          if (this.vel.x!=0 || this.vel.y!=0) {
              this.parent();
              return true;
          }

          return false;

          },

  die: function(){
           console.log("The hero died.");
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
 
        this.startX = x;
        this.endX = x + settings.width - settings.spritewidth;
        // size of sprite
 
        // make him start from the right
        this.pos.x = x + settings.width - settings.spritewidth;
        this.walkLeft = true;
 
        // walking & jumping speed
        this.setVelocity(4, 6);
 
        // make it collidable
        this.collidable = true;
        // make it a enemy object
        this.type = me.game.ENEMY_OBJECT;
 
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
            return false;
 
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
    }
});

var Enemy1Entity = EnemyEntity.extend({
  init: function(x, y, settings){
            this.parent(x, y, settings);
               }

});
var Enemy2Entity = EnemyEntity.extend({
  init: function(x, y, settings){
            this.parent(x, y, settings);
               }

});

var AcidEntity  = me.ObjectEntity.extend({
  init: function(x, y, settings){
            settings.spriteheight = settings.height;
            settings.spritewidth = settings.width;
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
