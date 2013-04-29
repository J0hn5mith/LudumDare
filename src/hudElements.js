var LabelObject = me.HUD_Item.extend({

    init: function(x, y) {
              // call the parent constructor
              this.parent(x, y);
              // create a font
              this.font = new me.BitmapFont("32x32_font", 32);
              this.font.set("left");
          },

    /* -----
     *

     draw our HUD

     ------ */
    draw: function(context, x, y) {
              levelName = me.levelName.toString();
              this.font.draw(context,levelName.toString(), this.pos.x + x, this.pos.y + y);
          }

});

var ScoreObject = me.HUD_Item.extend({
    init: function(x, y) {
              // call the parent constructor
              this.parent(x, y);
              // create a font
              this.font = new me.BitmapFont("32x32_font", 32);
              this.font.set("left");
          },

    /* -----
     *

     draw our HUD

     ------ */
    draw: function(context, x, y) {
              this.font.draw(context, this.value, this.pos.x + x, this.pos.y + y);
          }

});

var HUDImageObject = ScoreObject.extend({
    init: function(x,y,image){
              this.parent(x,y);
              this.image = image;
              this.imageW = 32; // Fixed size
              this.imageH = 32;
              this.gap = 5; // Gap between image and text label
          },

    draw: function(context, x,y){
              imageX = this.pos.x+x;
              imageY = this.pos.y+y;
              labelX = imageX + this.imageW  + this.gap;
              labelY = imageY;// If font < 32 is used this has to be implemented
              context.drawImage(this.image,imageX,imageY);
              this.font.draw(context, this.value, labelX, labelY);

          }
});
