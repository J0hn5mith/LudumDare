var GameOverScreen = me.ScreenObject.extend({
    init: function() {
              this.parent(true);
              this.font = null;
              this.isLoaded = false;
              this.textLabel = null;
              this.smallFontRatio = 0.6;
              this.largeFontSize = 32;
              this.bgImage = null;
          },

    onResetEvent: function(){
                      if(!this.isLoaded  ){
                          this.font = new me.BitmapFont("32x32_font", 32);
                          this.font.set("left");
                          this.textLabel = "GAME OVER";
                          this.bgImage = me.loader.getImage("game_over_screen320x480")

    					this.isLoaded = true; 
					}
    
     // Set level director to map 1, such that the next game start at // the first map again me.levelDirector.loadLevel("level1");

                  },

    update: function(){
                if (me.input.isKeyPressed('enter')) {

                    me.state.change(me.state.CREDITS);
                }
                return true;
            },
    draw: function(context){
              // Draw BG Image
              context.drawImage(this.bgImage,0,0, context.canvas.width, context.canvas.height);
              // Draw the game over label
              // TODO Automatic spacing
              labelWidth = this.font.measureText(context, this.textLabel);
              xPos = (context.rect.hwidth )/2;
              xPos = 0;
              this.font.resize(1.0);
              this.font.draw(context, this.textLabel, 105, 260);
              this.font.resize(this.smallFontRatio);
              this.font.draw(context, "PRESS ENTER TO CONTINUE", 45, 320);

          },
    onDestroyEvent: function(){
                        me.game.HUD.removeItem("score");
                    } 

});