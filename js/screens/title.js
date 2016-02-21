var sound = true;

game.TitleScreen = me.ScreenObject.extend({
 
  /**    
   *  action to perform on state change
   */
  onResetEvent : function() {
     
    // title screen
    me.game.world.addChild(
      new me.Sprite (
        0,0, 
        me.loader.getImage('title_screenEnd')
      ),
      1
    );

   //Background music(Menu)
    me.audio.playTrack("Savior-or-Sacrifice-Menu");
    // add a new renderable component with the scrolling text
    me.game.world.addChild(new (me.Renderable.extend ({
      // constructor
      init : function() {
        this._super(me.Renderable, 'init', [0, 0, me.game.viewport.width, me.game.viewport.height]);
        // font for the scrolling text
        this.font = new me.BitmapFont("32x32_font", 32);
         
         // a tween to animate the arrow
        this.scrollertween = new me.Tween(this).to({scrollerpos: -2200 }, 10000).onComplete(this.scrollover.bind(this)).start();
     
        this.scroller = "LOVE WILL MAKE YOU DO THINGS YOU NEVER THOUGHT IMAGINABLE!!!     ";
        this.scrollerpos = 600;
      },
       
      // some callback for the tween objects
      scrollover : function() {
        // reset to default value
        this.scrollerpos = 640;
        this.scrollertween.to({scrollerpos: -2200 }, 10000).onComplete(this.scrollover.bind(this)).start();
      },
     
      update : function (dt) {
        return true;
      },
       
      draw : function (renderer) {
        //this.font.draw(renderer, "SAVIOR OR SACRIFICE", 200, 260);
        this.font.draw(renderer, "PLAY - ENTER", 10, 550);
        //this.font.draw(renderer, "LOAD CHECKPOINT - L", 200, 280);
        //this.font.draw(renderer, "MUTE AUDIO - M", 200, 440);
        this.font.draw(renderer, this.scroller, this.scrollerpos, 600);
      },
      onDestroyEvent : function() {
        //just in case
        this.scrollertween.stop();

      }
    })), 2);
     
    // change to play state on press Enter or click/tap
    me.input.bindKey(me.input.KEY.ENTER, "enter", true);
    me.input.bindPointer(me.input.mouse.LEFT, me.input.KEY.ENTER);
    me.input.bindKey(me.input.KEY.L, "load", true);
    //me.input.bindPointer(me.input.mouse.LEFT, me.input.KEY.L);
    me.input.bindKey(me.input.KEY.M, "mute", true);
    //me.input.bindPointer(me.input.mouse.LEFT, me.input.KEY.M);
  
    this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
      if (action === "enter") {
        // play something on tap / enter
        // this will unlock audio on mobile devices
        me.audio.play("cling");
        me.state.change(me.state.PLAY);
      }
      if (action === "load") {
        me.state.change(me.state.MENU);
      }
      if(action === "mute") {
        if(sound){
          me.audio.stopTrack();
          sound = false;
        }
        else{
          me.audio.playTrack("Savior-or-Sacrifice-Menu");
          sound = true;
        }
      }
      
    });
  },
 
  /**    
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent : function() {
    me.input.unbindKey(me.input.KEY.ENTER);
    me.input.unbindPointer(me.input.mouse.LEFT);
    me.event.unsubscribe(this.handler);
    // stop the current audio track
        me.audio.stopTrack();
   }
});

// /*----------------------
 
//     Credits screen
 
//   ----------------------*/
game.EndingCredits = me.ScreenObject.extend({
 
  /**    
   *  action to perform on state change
   */
  onResetEvent : function() {
     
    // title screen
    me.game.world.addChild(
      new me.Sprite (
        0,0, 
        me.loader.getImage('credits')
      ),
      1
    );

   //Background music(Menu)
    me.audio.playTrack("credits");
    // add a new renderable component with the scrolling text
    me.game.world.addChild(new (me.Renderable.extend ({
      // constructor
      init : function() {
        this._super(me.Renderable, 'init', [0, 0, me.game.viewport.width, me.game.viewport.height]);
        // font for the scrolling text
        this.font = new me.BitmapFont("22x22_font", 22);
         
         // a tween to animate the arrow
        this.scrollertween = new me.Tween(this).to({scrollerpos: -2200 }, 10000).onComplete(this.scrollover.bind(this)).start();
     
        this.scroller = "THANKS FOR PLAYING! PRESS ENTER TO PLAY AGAIN";
        this.scrollerpos = 600;
      },
       
      // some callback for the tween objects
      scrollover : function() {
        // reset to default value
        this.scrollerpos = 640;
        this.scrollertween.to({scrollerpos: -1200 }, 10000).onComplete(this.scrollover.bind(this)).start();
      },
     
      update : function (dt) {
        return true;
      },
       
      draw : function (renderer) {
        //this.font.draw(renderer, "SAVIOR OR SACRIFICE", 200, 260);
        //this.font.draw(renderer, "PLAY - ENTER", 20, 300);
        //this.font.draw(renderer, "LOAD CHECKPOINT - L", 200, 280);
        //this.font.draw(renderer, "MUTE AUDIO - M", 200, 440);
        this.font.draw(renderer, this.scroller, this.scrollerpos, 600);
      },
      onDestroyEvent : function() {
        //just in case
        this.scrollertween.stop();

      }
    })), 2);
     
    // change to play state on press Enter or click/tap
    me.input.bindKey(me.input.KEY.ENTER, "enter", true);
    me.input.bindPointer(me.input.mouse.LEFT, me.input.KEY.ENTER);
    //me.input.bindKey(me.input.KEY.L, "load", true);
    //me.input.bindPointer(me.input.mouse.LEFT, me.input.KEY.L);
    //me.input.bindKey(me.input.KEY.M, "mute", true);
    //me.input.bindPointer(me.input.mouse.LEFT, me.input.KEY.M);
  
    this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
      if (action === "enter") {
        // play something on tap / enter
        // this will unlock audio on mobile devices
        me.audio.play("cling");
        me.state.change(me.state.PLAY);
      }
      // if (action === "load") {
      //   me.state.change(me.state.MENU);
      // }
      // if(action === "mute") {
      //   if(sound){
      //     me.audio.stopTrack();
      //     sound = false;
      //   }
      //   else{
      //     me.audio.playTrack("Savior-or-Sacrifice-Menu");
      //     sound = true;
      //   }
      //}
      
    });
  },
 
  /**    
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent : function() {
    me.input.unbindKey(me.input.KEY.ENTER);
    me.input.unbindPointer(me.input.mouse.LEFT);
    me.event.unsubscribe(this.handler);
    // stop the current audio track
        me.audio.stopTrack();
   }
});

// /*----------------------
 
//     Game Over
 
//   ----------------------*/
game.GameOver = me.ScreenObject.extend({
 
  /**    
   *  action to perform on state change
   */
  onResetEvent : function() {
     
    // title screen
    me.game.world.addChild(
      new me.Sprite (
        0,0, 
        me.loader.getImage('gameover')
      ),
      1
    );
    if(me.levelDirector.getCurrentLevelId() !== "area01")
      tutorial = false;
    console.log(me.levelDirector.getCurrentLevelId());
   //Background music(Menu)
    me.audio.playTrack("credits");
    // add a new renderable component with the scrolling text
    me.game.world.addChild(new (me.Renderable.extend ({
      // constructor
      init : function() {
        this._super(me.Renderable, 'init', [0, 0, me.game.viewport.width, me.game.viewport.height]);
        // font for the scrolling text
        this.font = new me.BitmapFont("22x22_font", 22);
         
         // a tween to animate the arrow
        this.scrollertween = new me.Tween(this).to({scrollerpos: -1200 }, 10000).onComplete(this.scrollover.bind(this)).start();
     
        this.scroller = "YOUR SACRIFICE WAS FOR NOTHING!!!";
        this.scrollerpos = 600;
      },
       
      // some callback for the tween objects
      scrollover : function() {
        // reset to default value
        this.scrollerpos = 640;
        this.scrollertween.to({scrollerpos: -1200 }, 10000).onComplete(this.scrollover.bind(this)).start();
      },
     
      update : function (dt) {
        return true;
      },
       
      draw : function (renderer) {
        //this.font.draw(renderer, "SAVIOR OR SACRIFICE", 200, 260);
        this.font.draw(renderer, "PRESS ENTER TO PLAY GAIN", 200, 400);
        //this.font.draw(renderer, "LOAD CHECKPOINT - L", 200, 280);
        //this.font.draw(renderer, "MUTE AUDIO - M", 200, 440);
        this.font.draw(renderer, this.scroller, this.scrollerpos, 500);
      },
      onDestroyEvent : function() {
        //just in case
        this.scrollertween.stop();

      }
    })), 2);
     
    // change to play state on press Enter or click/tap
    me.input.bindKey(me.input.KEY.ENTER, "enter", true);
    me.input.bindPointer(me.input.mouse.LEFT, me.input.KEY.ENTER);
    //me.input.bindKey(me.input.KEY.L, "load", true);
    //me.input.bindPointer(me.input.mouse.LEFT, me.input.KEY.L);
    //me.input.bindKey(me.input.KEY.M, "mute", true);
    //me.input.bindPointer(me.input.mouse.LEFT, me.input.KEY.M);
  
    this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
      if (action === "enter") {
        // play something on tap / enter
        // this will unlock audio on mobile devices
        me.audio.play("cling");
        me.state.change(me.state.PLAY);
      }
      // if (action === "load") {
      //   me.state.change(me.state.MENU);
      // }
      // if(action === "mute") {
      //   if(sound){
      //     me.audio.stopTrack();
      //     sound = false;
      //   }
      //   else{
      //     me.audio.playTrack("Savior-or-Sacrifice-Menu");
      //     sound = true;
      //   }
      //}
      
    });
  },
 
  /**    
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent : function() {
    me.input.unbindKey(me.input.KEY.ENTER);
    me.input.unbindPointer(me.input.mouse.LEFT);
    me.event.unsubscribe(this.handler);
    // stop the current audio track
        me.audio.stopTrack();
   }
});

// /*----------------------
 
//     Credits screen
 
//   ----------------------*/
 
// game.CreditsScreen = me.ScreenObject.extend({
//     // constructor
//     init: function() {
//         this._super(me.Renderable, 'init', [0, 0, me.game.viewport.width, me.game.viewport.height]);
 
//         // title screen image
//         this.title = null;
 
//         this.font = null;
//         this.scrollerfont = null;
//         this.scrollertween = null;
 
//         this.scroller = "THANK YOU FOR PLAYING!       ";
//         this.scrollerpos = 600;
//     },
 
//     // reset function
//     onResetEvent: function() {
//         if (this.title == null) {
//             // init stuff if not yet done
//             this.title = me.loader.getImage("credits");
//             // font to display the menu items
//             this.font = new me.BitmapFont("32x32_font", 32);
 
//             // set the scroller
//             this.scrollerfont = new me.BitmapFont("32x32_font", 32);
//         }
 
//         // reset to default value
//         this.scrollerpos = 640;
 
//         // a tween to animate the arrow
//         this.scrollertween = new me.Tween(this).to({
//             scrollerpos: -2200
//         }, 10000).onComplete(this.scrollover.bind(this)).start();
 
//         // enable the keyboard
//         me.input.bindKey(me.input.KEY.ENTER, "enter", true);
     
//    // play the credits track
//    me.audio.playTrack("Savior-or-Sacrifice-InGame");
//     },
 
//     // some callback for the tween objects
//     scrollover: function() {
//         // reset to default value
//         this.scrollerpos = 640;
//         this.scrollertween.to({
//             scrollerpos: -2200
//         }, 10000).onComplete(this.scrollover.bind(this)).start();
//     },
 
//     // update function
//     update: function()
//  {
//         // enter pressed ?
//         if (me.input.isKeyPressed('enter'))
//    {
//             me.state.change(me.state.MENU);
//         }
//         return true;
//     },
 
//     // draw function
//     draw: function(context) {
//         context.drawImage(this.title, 0, 0);
 
//         this.scrollerfont.draw(context, this.scroller, this.scrollerpos, 20);
//     },
 
//     // destroy function
//     onDestroyEvent: function() {
//         me.input.unbindKey(me.input.KEY.ENTER);
    
//    // stop the current audio track
//    me.audio.stopTrack();
 
//         //just in case
//         this.scrollertween.stop();
//     }
// });