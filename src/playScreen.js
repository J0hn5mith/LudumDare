var PlayScreen = me.ScreenObject.extend(
        {

            init: function(){
                      this.parent(true);
                      this.isPaused = false;
                  },

    onDestroyEvent: function()
{

                        me.game.HUD.removeItem("levelName");
},
    update: function()
	{
	     //console.log("hallo");
		//Mute the Game	
		if (me.input.isKeyPressed('mute')) {
			me.music = me.music * -1;
			//console.log(me.music);
			if (me.music == 1){
				me.audio.unmuteAll()
			}else{
				me.audio.muteAll();
			}
		}
		
		//Pause the Game
		if (me.input.isKeyPressed('pause')) {
			me.pause = me.pause * -1;
			//console.log(me.pause);
			if (me.pause == 1){
				me.state.resume();
			}else{
				me.state.pause();
				    var resume_loop = setInterval(function check_resume() {
						if (me.input.isKeyPressed("pause")) {
			    			me.pause = me.pause * -1;
			    			clearInterval(resume_loop);
			    			me.state.resume();
						}
		    			}, 100);
			}
		}
	},


   onResetEvent: function()
	{	
		
			// Load level
	        me.levelDirector.loadLevel(Properties.startLevel);
		
        // Create HUD
		this.createHUD();

		// Load background music	
		me.audio.playTrack("sterni");	

	
	},
	
	createHUD: function(){
		    me.game.addHUD(0, 0, 640, 480);
	        me.creditStart = Properties.creditsStart;
	        me.lifeStart = Properties.lifeStart;
	        me.music = 1;
			me.pause = 1;
			xOffset2Row = 440; 
	        yOffsetCredits = 10;
	        yOffsetLifes = 120;
	        yOffsetCoins = 230;
	        yOffsetPoints = 370;
	        xName = 400;
	        yName = 10;
	        me.game.HUD.addItem("score", new HUDImageObject(yOffsetPoints,xOffset2Row,me.loader.getImage("points_icon")));
	        me.game.HUD.addItem("lifes", new HUDImageObject(yOffsetLifes,xOffset2Row,me.loader.getImage("life_icon")));
	        me.game.HUD.addItem("coins", new HUDImageObject(yOffsetCoins,xOffset2Row,me.loader.getImage("coins_icon")));
	        me.game.HUD.addItem("credits", new HUDImageObject(yOffsetCredits,xOffset2Row,me.loader.getImage("credits_icon")));
	        // me.game.HUD.addItem("levelName", new LabelObject(xName, yName));

			me.game.HUD.updateItemValue("coins",0 );
			me.game.HUD.updateItemValue("lifes", me.lifeStart);
			me.game.HUD.updateItemValue("credits", me.creditStart);

		// make sure everything is in the right order
	        me.game.sort();
	}

});
