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
   
		// Removable
		if(settings.notRemoveable){
			this.removable = false;	
		}
		else{
			this.removable = true;
		}
		
		this.pointsCollected = false;

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
 	
		// First time power up is collected 
		if(!this.pointsCollected){
			me.game.HUD.updateItemValue("score", Properties.powerUpPoints);
			
			this.pointsCollected = true;
		}
		
        // make sure it cannot be collected "again"
		if(this.removable){
			this.collidable = false;
	        me.game.remove(this);
		}
		

        
    }
});