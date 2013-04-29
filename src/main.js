



var jsApp	= 
{	
    /* ---

       Initialize the jsApp

       ---			*/
    onLevelLoad: function(){
                     me.levelName = me.levelDirector();
                 },
    onload: function()
    {

        // init the video
        if (!me.video.init('jsapp', 640, 480, false, 1.0))
        {
            alert("Sorry but your browser does not support html 5 canvas.");
            return;
        }

        // initialize the "audio"
        me.audio.init("ogg,mp3,wav");

        // set all resources to be loaded
        me.loader.onload = this.loaded.bind(this);

        // set all resources to be loaded
        me.loader.preload(g_resources);

        // load everything & display a loading screen
        me.state.change(me.state.LOADING);

        // Set onLevelLoad function
        me.game.onLevelLoad = this.onLevelLoad.bind(this);

        // Init the game stats
    },


    /* ---

       callback when everything is loaded

       ---										*/
    loaded: function ()
    {
        // set the "Play/Ingame" Screen Object
        //
        me.state.set(me.state.PLAY, new PlayScreen());
        me.state.set(me.state.GAME_OVER, new GameOverScreen());
        me.state.set(me.state.MENU, new TitleScreen());
        me.state.set(me.state.CREDITS, new CreditScreen());
        // Set fade
        //me.state.transition("fade", "#000000", 1000);
        // If fading is set, state change does not work properly

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
        me.input.bindKey(me.input.KEY.P,     "pause", true);
        me.input.bindKey(me.input.KEY.M,     "mute", true);
		me.input.bindKey(me.input.KEY.ENTER,     "enter", true);
        // start the game 
        me.state.change(me.state.MENU);
    }

}; // jsApp

/* the in game stuff*/






//bootstrap :)
window.onReady(function() 
        {
            jsApp.onload();
        });


