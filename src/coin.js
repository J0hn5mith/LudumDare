/*----------------
 a Coin entity
------------------------ */
var CoinEntity = me.CollectableEntity.extend({
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init: function(x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);
    },
 
    // this function is called by the engine, when
    // an object is touched by something (here collected)
    onCollision: function() {
        // do something when collected
	// give some score & coins and handle lifes
    	me.game.HUD.updateItemValue("score", Properties.coinPoints);
	if(me.game.HUD.getItemValue("coins") == Properties.coinsForLife){
		me.game.HUD.updateItemValue("credits", 1); 
		me.game.HUD.setItemValue("coins",0);
	} else{
		me.game.HUD.updateItemValue("coins", 1); }
 
        // make sure it cannot be collected "again"
        this.collidable = false;
        // remove it
        me.game.remove(this);
 } }); 


