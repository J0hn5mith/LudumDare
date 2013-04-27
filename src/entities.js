var HeroEntity  = me.ObjectEntity.extend({
  init: function(x, y, settings){
            this.parent(x, y, settings);

            this.setVelocity(3,15);
            
            me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

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

          if (this.vel.x!=0 || this.vel.y!=0) {
              this.parent();
              return true;
          }

          return false;

          }
      :                      
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
            this.parent(x, y, settings);
            this.setVelocity(0,0 );
            this.type = me.game.ENEMY_OBJECT;
            this.collidable = true;
        },
  update: function(){

          },
  
  onCollision: function(){
               }

})
var RedAcidEntity = AcidEntity({
  init: function(x, y, settings){
            this.parent(x, y, settings);
        },
  update: function(){

          },
  
  onCollision: function(){
               }

});

var BlueAcidEntity = AcidEntity({
  init: function(x, y, settings){
            this.parent(x, y, settings);
        },
  update: function(){

          },
  
  onCollision: function(){
               }

});
var GreenAcidEntity  = me.ObjectEntity.extend({
  init: function(x, y, settings){
            this.parent(x, y, settings);
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
