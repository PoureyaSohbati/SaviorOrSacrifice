
/* Game namespace */
var eatenFood = [];
var gottenKey = [];
var gottenClothes = [];
var killedEnemy = [];
var gottenSword = [];
var gottenNote = [];
var tutorial = true;
var player = undefined;
var checkpoint = {xpos: undefined, ypos: undefined};
var currentLevel = "area01";
var levelFromTo = [{level: {from: "area01", to: "area02"}, pos: {x: 10, y: 10}},
                   {level: {from: "area02", to: "area01"}, pos: {x: 608, y: 3648}},
                   {level: {from: "area02", to: "area10"}, pos: {x: 10, y: 10}},
                   {level: {from: "area10", to: "area02"}, pos: {x: 10, y: 10}},
                   {level: {from: "area01", to: "area02"}, pos: {x: 10, y: 10}}
                   ];

var game = {

    // an object where to store game information
    data : {
        // score
        score : 1
    },


    // Run on page load.
    "onload" : function () {
    // Initialize the video.
    if (!me.video.init("screen",  me.video.CANVAS, 960, 640, true, 'auto')) {
        alert("Your browser does not support HTML5 canvas.");
        return;
    }

    // add "#debug" to the URL to enable the debug Panel
    if (document.location.hash === "#debug") {
        window.onReady(function () {
            me.plugin.register.defer(this, me.debug.Panel, "debug", me.input.KEY.V);
        });
    }

    // Initialize the audio.
    me.audio.init("mp3,ogg");

    // Set a callback to run when loading is complete.
    me.loader.onload = this.loaded.bind(this);

    // Load the resources.
    me.loader.preload(game.resources);

    // Initialize melonJS and display a loading screen.
    me.state.change(me.state.LOADING);
},

    // Run on game resources loaded.
   "loaded" : function () {

      // set the "Play/Ingame" Screen Object
      me.state.set(me.state.MENU, new game.TitleScreen());
      // set the "Play/Ingame" Screen Object
      me.state.set(me.state.CREDITS, new game.EndingCredits());
      // set the "Play/Ingame" Screen Object
      me.state.set(me.state.GAMEOVER, new game.GameOver());
	    // set the "Play/Ingame" Screen Object
	    me.state.set(me.state.PLAY, new game.PlayScreen());
      // set the "Credits" Screen Object
      //me.state.set(me.state.CREDITS, new game.CreditsScreen());
      // set a global fading transition for the screen
      me.state.transition("fade", "#FFFFFF", 250);
	   
	  // register our player entity in the object pool
    
	  me.pool.register("mainPlayer", game.PlayerEntity);
    me.pool.register("FoodEntity", game.FoodEntity);
    me.pool.register("keyEntity", game.keyEntity);
    me.pool.register("StealthClothes", game.StealthClothes);
    me.pool.register("PlayerInstructions", game.PlayerInstructions);
    me.pool.register("NoteEntity", game.NoteEntity);
    me.pool.register("CreditsEnding", game.CreditsEnding);
    me.pool.register("FallEntity", game.FallEntity);
    me.pool.register("sword", game.sword);
	  me.pool.register("EnemyEntity", game.EnemyEntity);
    me.pool.register("SpikeEntity", game.SpikeEntity);
    me.pool.register("visionEntity", game.visionEntity);
    me.pool.register("doorEntity", game.doorEntity);
    me.pool.register("boxEntity", game.boxEntity);
    me.pool.register("checkpointEntity", game.checkpointEntity);

	  // enable the keyboard
    me.input.bindKey(me.input.KEY.ESC, "removeStory");
	  me.input.bindKey(me.input.KEY.LEFT,  "left");
	  me.input.bindKey(me.input.KEY.RIGHT, "right");
	  me.input.bindKey(me.input.KEY.SPACE, "jump", true);
	  me.input.bindKey(me.input.KEY.X, "X", true);
    me.input.bindKey(me.input.KEY.V, "V", true);

	  
	  // start the game 
	  me.state.change(me.state.MENU);
	}
};
