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

       	// Start Level
        // add a default HUD to the game mngr
        me.game.addHUD(0, 0, 640, 480);
 	

	creditsStart = 4;
        me.gamestat.add("creditsStart", creditsStart);
        me.gamestat.add("creditsCurrent", creditsStart);
        lifeStart = 3;
        me.gamestat.add("lifeStart", lifeStart);
        me.gamestat.add("lifeCurrent", lifeStart);
        me.gamestat.add("score", 0);
        me.gamestat.add("currentLevel", 0);
	me.gamestat.add("coins",97);


        // add a new HUD item
        me.creditStart = 4;
        me.lifeStart = 3;
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
        me.game.HUD.addItem("levelName", new LabelObject(xName, yName));

	//me.game.HUD.setItemValue("levelName","Level name" );
	me.game.HUD.updateItemValue("coins",0 );
	me.game.HUD.updateItemValue("lifes", me.lifeStart);
	me.game.HUD.updateItemValue("credits", me.creditStart);
    me.levelName = "level";

	// make sure everything is in the right order
        me.game.sort();

	//main sound
	
	me.audio.playTrack("sterni");	


        me.levelDirector.loadLevel("level1");
	},
	
	

});