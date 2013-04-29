var AcidEntity  = me.ObjectEntity.extend({
  init: function(x, y, settings){
            ACID_HEIGHT = 8;

            settings.spritewidth = settings.width;
            settings.spriteheight = ACID_HEIGHT;
            y += (settings.height - ACID_HEIGHT);
            settings.height = ACID_HEIGHT;
            //console.log(settings);
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
