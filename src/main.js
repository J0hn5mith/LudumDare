/*!
 * 
 *   melonJS
 *   http://www.melonjs.org
 *		
 *   Step by step game creation tutorial
 *
 **/

// game resources
var g_resources= [{
    name: "level1",
    type: "tmx",
    src: "data/map/level1.tmx"
},{
    name: "level2",
    type: "tmx",
    src: "data/map/level2.tmx"
},{
    name: "level3",
    type: "tmx",
    src: "data/map/level3.tmx"
},{
    name: "level4",
    type: "tmx",
    src: "data/map/level4.tmx"
},{
    name: "level5",
    type: "tmx",
    src: "data/map/level4.tmx"
},{
    name: "level6",
    type: "tmx",
    src: "data/map/level4.tmx"
},{
    name: "level7",
    type: "tmx",
    src: "data/map/level4.tmx"
},{
    name: "secret1",
    type: "tmx",
    src: "data/map/secret1.tmx"
},{
    name: "tileset32x32",
    type: "image",
    src: "data/tileset/tileset32x32.png"
},{
    name: "black_hero",
    type: "image",
    src: "data/sprites/black_hero_64x32.png"
},{
    name: "white_hero",
    type: "image",
    src: "data/sprites/white_hero_64x32.png"
},{
    name: "red_acid256x256",
    type: "image",
    src: "data/sprites/red_acid256x256.png"
},{
    name: "blue_acid256x256",
    type: "image",
    src: "data/sprites/blue_acid256x256.png"
},{
    name: "green_acid256X256",
    type: "image",
    src: "data/sprites/green_acid256x256.png"
  },{
    name: "black_enemy1",
    type: "image",
    src: "data/sprites/black_enemy1_28x28.png"
},{
    name: "black_enemy2",
    type: "image",
    src: "data/sprites/black_enemy2_28x28.png"
},{
    name: "white_enemy1",
    type: "image",
    src: "data/sprites/white_enemy1_28x28.png"
},{
    name: "red_powerup",
    type: "image",
    src: "data/sprites/red_powerup_32x32.png"
},{
    name: "blue_powerup",
    type: "image",
    src: "data/sprites/blue_powerup_32x32.png"
},{
    name: "green_powerup",
    type: "image",
    src: "data/sprites/green_powerup_32x32.png"
},{
    name: "white_enemy2",
    type: "image",
    src: "data/sprites/white_enemy2_28x28.png"
},{
    name: "white_coin",
    type: "image",
    src: "data/sprites/white_coin_32x32.png"
},{
    name: "black_coin",
    type: "image",
    src: "data/sprites/black_coin_32x32.png"
}];


var jsApp	= 
{	
	/* ---
	
		Initialize the jsApp
		
		---			*/
	onload: function()
	{
		
		// init the video
		if (!me.video.init('jsapp', 640, 480, false, 1.0))
		{
			alert("Sorry but your browser does not support html 5 canvas.");
         return;
		}
				
		// initialize the "audio"
		me.audio.init("mp3,ogg");
		
		// set all resources to be loaded
		me.loader.onload = this.loaded.bind(this);
		
		// set all resources to be loaded
		me.loader.preload(g_resources);

		// load everything & display a loading screen
		me.state.change(me.state.LOADING);

        // Init the game stats
        me.gamestat.add("credits", 5);
        me.gamestat.add("score", 0);
        me.gamestat.add("currentLevel", 0);

	},
	
	
	/* ---
	
		callback when everything is loaded
		
		---										*/
	loaded: function ()
	{
		// set the "Play/Ingame" Screen Object
		me.state.set(me.state.PLAY, new PlayScreen());
      // Entity pool
        me.entityPool.add("heroEntity", HeroEntity);
        me.entityPool.add("redAcidEntity", RedAcidEntity);
        me.entityPool.add("blueAcidEntity", BlueAcidEntity);
        me.entityPool.add("greenAcidEntity", GreenAcidEntity);
        me.entityPool.add("coinEntity", CoinEntity);
        me.entityPool.add("powerupEntity", PowerupEntity);
        me.entityPool.add("Enemy1Entity", Enemy1Entity);
        me.entityPool.add("Enemy2Entity", Enemy2Entity);
      // Key bindings
      me.input.bindKey(me.input.KEY.LEFT,  "left");
      me.input.bindKey(me.input.KEY.RIGHT, "right");
      me.input.bindKey(me.input.KEY.l, "right");
      me.input.bindKey(me.input.KEY.UP,     "jump", true);
      // start the game 
		me.state.change(me.state.PLAY);
	}

}; // jsApp

/* the in game stuff*/
var PlayScreen = me.ScreenObject.extend(
{

   onResetEvent: function()
	{	
      me.levelDirector.loadLevel("level1");
	},
	
	
	/* ---
	
		 action to perform when game is finished (state change)
		
		---	*/
	onDestroyEvent: function()
	{
	
   }

});


//bootstrap :)
window.onReady(function() 
{
	jsApp.onload();
});
