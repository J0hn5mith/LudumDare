
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
    src: "data/map/level5.tmx"
},{
    name: "level6",
    type: "tmx",
    src: "data/map/level6.tmx"
},{
    name: "level7",
    type: "tmx",
    src: "data/map/level7.tmx"
},{
    name: "secret1",
    type: "tmx",
    src: "data/map/secret1.tmx"
},{
    name: "secret2",
    type: "tmx",
    src: "data/map/secret2.tmx"
},{
    name: "secret3",
    type: "tmx",
    src: "data/map/secret3.tmx"
},{
    name: "endmap",
    type: "tmx",
    src: "data/map/endmap.tmx"
},{
    // audio resources
    name: "jump",
    type: "audio",
    src: "data/audio/",
    channel: 1
}, {
    name: "jump_on_enemy",
    type: "audio",
    src: "data/audio/",
    channel: 2
}, {
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
    name: "red_hero",
    type: "image",
    src: "data/sprites/red_hero_64x32.png"
},{
    name: "green_hero",
    type: "image",
    src: "data/sprites/green_hero_64x32.png"
},{
    name: "blue_hero",
    type: "image",
    src: "data/sprites/blue_hero_64x32.png"
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
},{
    name: "32x32_font",
    type: "image",
    src: "data/font/32x32_font.png"
},{
    name: "game_over_screen320x480",
    type: "image",
    src: "data/images/game_over_screen960x640.png"
},{
    name: "menu_screen",
    type: "image",
    src: "data/images/menu_screen960x640.png"
},{
    name: "life_icon",
    type: "image",
    src: "data/sprites/life_icon32x32.png"
},{
    name: "coins_icon",
    type: "image",
    src: "data/sprites/coins_icon32x32.png"
},{
    name: "credits_icon",
    type: "image",
    src: "data/sprites/credits_icon32x32.png"
},{
    name: "points_icon",
    type: "image",
    src: "data/sprites/points_icon32x32.png"
},{
    name: "Background01",
    type: "image",
    src: "data/backgroundImages/Background01.png"
},{
    name: "Background02",
    type: "image",
    src: "data/backgroundImages/Background02.png"
},{
    name: "Background03",
    type: "image",
    src: "data/backgroundImages/Background03.png"
},{
    name: "Background04",
    type: "image",
    src: "data/backgroundImages/Background04.png"
},{
    name: "Background05",
    type: "image",
    src: "data/backgroundImages/Background05.png"
},{
    name: "Background06",
    type: "image",
    src: "data/backgroundImages/Background06.png"
},{
    name: "Background07",
    type: "image",
    src: "data/backgroundImages/Background07.png"
},{
    name: "Berg04",
    type: "image",
    src: "data/paralax/Berg04.png"
}];


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
        // start the game 
//        me.state.change(me.state.MENU);
        me.state.change(me.state.MENU);
    }

}; // jsApp

/* the in game stuff*/
var PlayScreen = me.ScreenObject.extend(
        {

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
    // Don't now how to change its value
    // me.game.HUD.addItem("levelName", new LabelObject(xName, yName)); 

    //me.game.HUD.setItemValue("levelName","Level name" );
    me.game.HUD.updateItemValue("coins",0 );
    me.game.HUD.updateItemValue("lifes", me.lifeStart);
    me.game.HUD.updateItemValue("credits", me.creditStart);
    me.levelName = "LEVEL";

    // make sure everything is in the right order
    me.game.sort();


    me.levelDirector.loadLevel("level1");
},


    /* ---

       action to perform when game is finished (state change)

       ---	*/
    onDestroyEvent: function()
{

                        me.game.HUD.removeItem("levelName");
    me.levelDirector.loadLevel("level1");
}

});


/*-------------- 
  a score HUD Item
  --------------------- */


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
                      me.input.bindKey(me.input.KEY.ENTER, "enter", true);
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


var TitleScreen = me.ScreenObject.extend({
    init: function() {
              this.parent(true);
              this.bgImage = null;
          },

    onResetEvent: function() {
                      if(!this.bgImage){
                          this.bgImage = me.loader.getImage("menu_screen");
                          me.input.bindKey(me.input.KEY.ENTER, 'enter', true);
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

//bootstrap :)
window.onReady(function() 
        {
            jsApp.onload();
        });

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
                      me.input.bindKey(me.input.KEY.ENTER, "enter", true);
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
