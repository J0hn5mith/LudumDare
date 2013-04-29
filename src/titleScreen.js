var TitleScreen = me.ScreenObject.extend({
    init: function() {
              this.parent(true);
              this.bgImage = null;
          },

    onResetEvent: function() {
                      if(!this.bgImage){
                          this.bgImage = me.loader.getImage("menu_screen");
                         
                      }
                  },


    update: function() {
                if (me.input.isKeyPressed('enter')) {
                    me.state.change(me.state.PLAY);
                }
            },

    draw: function(context) {
              cWidth = context.canvas.width;
              cHeight = context.canvas.height;
              context.drawImage(this.bgImage,0,0,cWidth, cHeight);
          },


    onDestroyEvent: function() {

                    }
});