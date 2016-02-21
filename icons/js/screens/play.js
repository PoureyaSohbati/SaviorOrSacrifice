game.PlayScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {
        // load a level
        if (tutorial)
            me.levelDirector.loadLevel("area01");
        else
            me.levelDirector.loadLevel("area02");
        //me.levelDirector.loadLevel("area02");
        // play the audio track in game

        me.audio.playTrack("Savior-or-Sacrifice-InGame");
        // reset the score
        game.data.score = 1;
        game.data.kill = 1;

        // add our HUD to the game world
        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD);
    },

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        // remove the HUD from the game world
        me.game.world.removeChild(this.HUD);
        // stop the current audio track
        me.audio.stopTrack();

    }
});
