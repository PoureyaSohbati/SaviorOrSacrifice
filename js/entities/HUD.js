/**
* a HUD container and child items
*/
 var add;
 var added;
game.HUD = game.HUD || {};
 
 
game.HUD.Container = me.Container.extend({
 
  init: function() {
    // call the constructor
    this._super(me.Container, 'init');
     
    // persistent across level change
    this.isPersistent = true;
 
    // make sure we use screen coordinates
    this.floating = true;
 
    // make sure our object is always draw first
    this.z = Infinity;
 
    // give a name
    this.name = "HUD";
     
    // add our child score object at the top-right position
    this.addChild(new game.HUD.ScoreItem(850, 9));
    this.addChild(new game.HUD.Health(880,20));
    // add our child score object at the top-left position
    //this.addChild(new game.HUD.playerScoe(180, 20));
    // add our child Instructions object at the middle position
    // make sure we are not already jumping or falling
      //this.addChild(new game.HUD.playerControls(500, 20));
      // play some audio
      //me.audio.play("cling");
      
  }
});
 
//** 
/* a basic HUD item to display score
*/
game.HUD.ScoreItem = me.Renderable.extend( {    
  /** 
  * constructor
  */
  init: function(x, y) {
     
    // call the parent constructor 
    // (size does not matter here)
    this._super(me.Renderable, 'init', [x, y, 10, 10]);
     
    // create a font
    this.font = new me.BitmapFont("22x22_font", 22,1.7,29);
    this.font.set("right");

    
     
    // local copy of the global score
    this.score = 3;
  },
 
  /**
  * update function
  */
  update : function (dt) {
    return true;
  },
 
  /**
  * draw the score
  */
  draw : function (renderer) {
    this.font.draw (renderer, "!", this.pos.x, this.pos.y);
    //this.draw1(renderer, game.exten, 940, 20, 28, 32, 0);
  },

});
game.HUD.Health = me.Renderable.extend({
  init: function(x, y) {
    this._super(me.Renderable, 'init', [x, y, 10, 10]);
     
    // create a font
    this.font = new me.BitmapFont("22x22_font", 22);
    this.font.set("right");

    // local copy of the global score
    this.score = 3;
  },
 
  /**
  * update function
  */
  update : function (dt) {
    if (this.score !== game.data.score) {
      this.score = game.data.score;
      return true;
    }
    return false;
  },
 
  /**
  * draw the score
  */
  draw : function (renderer) {
    this.font.draw (renderer, " X " , this.pos.x, this.pos.y);
    this.font.draw (renderer, game.data.score, this.pos.x + 50, this.pos.y);
    //this.draw1(renderer, game.exten, 940, 20, 28, 32, 0);
  }
}),

//** 
/* a basic HUD item to display player score
*/
game.HUD.playerScoe = me.Renderable.extend( {    
  /** 
  * constructor
  */
  init: function(x, y) {
     
    // call the parent constructor 
    // (size does not matter here)
    this._super(me.Renderable, 'init', [x, y, 10, 10]);
     
    // create a font
    this.font = new me.BitmapFont("22x22_font", 22);
    this.font.set("right");

    
     
    // local copy of the global kill
    this.kill = 0;
  },
 
  /**
  * update function
  */
  update : function (dt) {
    // we don't draw anything fancy here, so just
    // return true if the kill has been updated
    if (this.kill !== game.data.kill) {
      this.kill = game.data.kill;
      return true;
    }
    return false;
  },
 
  /**
  * draw the kill
  */
  draw : function (renderer) {
    this.font.draw(renderer, "LEVEL: ", 150, 20);
    this.font.draw (renderer, game.data.kill, this.pos.x, this.pos.y);
    //this.font.draw(renderer, "S: ", this.pos.x, this.pos.y);
    //this.draw1(renderer, game.exten, 940, 20, 28, 32, 0);
  },

  /*draw1 : function(item, x, y, width, height, info) {
    item.x = x;
    item.y = y;
    item.width = width;
    item.height = height;
    item.info = info;
    world.addChild(item);
}*/
});

//** 
/* a basic HUD item to display player controls
*/
game.HUD.playerControls = me.Renderable.extend( {    
  /** 
  * constructor
  */
  init: function(x, y) {
     
    // call the parent constructor 
    // (size does not matter here)
    this._super(me.Renderable, 'init', [x, y, 10, 10]);
     
    // create a font
    this.font = new me.BitmapFont("22x22_font", 22);
    this.font.set("right");

    
     
    // local copy of the global instructions
    //this.instructions = 0;
  },
 
  /**
  * update function
  */
  update : function (dt) {
    // we don't draw anything fancy here, so just
    // return true if the instructions has been updated
    if (this.instructions !== game.data.instructions) {
      this.instructions = game.data.instructions;
      return true;
    }
    return false;
  },
 
  /**
  * draw the kill
  */
  draw : function (renderer) {
    this.font.draw(renderer, "USE <  > KEYS TO MOVE", 700, 50);
    this.font.draw(renderer, "PRESS X TO ENTER STEALTH MODE", 780, 100);
    this.font.draw(renderer, "PRESS V TO SEE ENEMIES VIEW POINT", 820, 150);
    this.font.draw (renderer, game.data.instructions, this.pos.x, this.pos.y);
    //this.font.draw(renderer, "S: ", this.pos.x, this.pos.y);
    //this.draw1(renderer, game.exten, 940, 20, 28, 32, 0);
  },

  /*draw1 : function(item, x, y, width, height, info) {
    item.x = x;
    item.y = y;
    item.width = width;
    item.height = height;
    item.info = info;
    world.addChild(item);
}*/
});