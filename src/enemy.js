var EnemyEntity = me.ObjectEntity.extend({
    init: function(x, y, settings) {
 
        // call the parent constructor
        this.parent(x, y, settings);
 
        // Set velocity
        if(settings.velocity){
            this.setVelocity(settings.velocity, 6);
        }
        else{
            this.setVelocity(4,6);
        }
		
		// Set movement area
        this.startX = x;
        this.endX = x + settings.width - settings.spritewidth;
 
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