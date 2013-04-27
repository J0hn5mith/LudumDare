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

var TrinagleUpEntity = me.ObjectEntity.extend({
  init: function(x, y, settings){
            this.parent(x, y, settings);
        },
  update: function(){

          },
  
  onCollision: function(){
               }

});

var TriangleDownEntity = me.ObjectEntity.extend({
  init: function(x, y, settings){
            this.parent(x, y, settings);
        },
  update: function(){

          },
  
  onCollision: function(){
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
            console.log("Acid was created");
            this.isAcid = true;
            
        },
  update: function(){

          },
  
  onCollision: function(){
                console.log("Acid was touched");
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
                console.log("Red acid was touched");
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
