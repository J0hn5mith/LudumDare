var CreditScreen  = me.ScreenObject.extend({
    // constructor
    init: function() {
              this.parent(true);
              this.font = null;
              this.isLoaded = false;
              this.textLabel = null;
              this.smallFontRatio = 0.6;
              this.largeFontSize = 32;
              this.bgImage = null;
          },
    onResetEvent: function() {

                      if(!this.isLoaded  ){
                          this.font = new me.BitmapFont("32x32_font", 32);
                          this.font.set("center");
                          this.titleLabel = "CREDITS";
                          this.pCredits = "PROGRAMMING: JULI, JAN";
                          this.gCredits = "GRAPHICS: TOM, JULI, JAN";
                          this.sCredits = " SOUND: JULI"; 
                          this.mCredits ="MUSIC: VOGT";

                          this.bgImage = me.loader.getImage("game_over_screen320x480")

    this.isLoaded = true;
                      }
                     
                  },

    update: function(){
                if (me.input.isKeyPressed('enter')) {
                    me.state.change(me.state.MENU);
                }
                return true;
            },
    draw: function(context){
              // Draw BG Image
              context.drawImage(this.bgImage,0,0, context.canvas.width, context.canvas.height);
              // Draw the game over label
              // TODO Automatic spacing
              xPos = 250;
              yPos = 200;
              gap = 18;
              tHeight = 32;
              this.font.resize(1.0);
              this.font.draw(context, this.titleLabel, xPos, yPos);
              this.font.resize(this.smallFontRatio);
              yPos += tHeight + gap + 5;
              this.font.draw(context, this.pCredits,xPos, yPos );
              yPos += tHeight * this.smallFontRatio + gap;
              this.font.draw(context, this.gCredits,xPos, yPos );
              yPos += tHeight * this.smallFontRatio + gap;
              this.font.draw(context, this.sCredits,xPos, yPos );
              yPos += tHeight * this.smallFontRatio + gap;
              this.font.draw(context, this.mCredits,xPos, yPos );

          },
    onDestroyEvent: function(){  } 

});