var HeroEntity  = me.ObjectEntity.extend({
  init: function(x, y, settings){
            // Constants
            this.FLICKER_TIME = 45,
            this.parent(x, y, settings);

            this.setVelocity(3,15);
	    this.updateColRect(2, 28, 10, 54);            
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

                
                this.getPowerUp(res.obj.powerupcolor);
      
	          
                
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
           me.game.HUD.updateItemValue("credits", -1);
           if(me.game.HUD.getItemValue("credits") < 0){
               //console.log("No credits left");
               me.state.change(me.state.GAME_OVER);
              
		//disable HUD
		
		//me.game.HUD.removeItem("score");
		me.game.HUD.removeItem("lifes");
		me.game.HUD.removeItem("coins");
		me.game.HUD.removeItem("credits");
		 
		// TODO: command to continue
           }
           else{
		//console.log("lifelog");
		//console.log(me.lifeStart);
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
