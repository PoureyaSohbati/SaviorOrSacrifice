/*------------------- 
a player entity
-------------------------------- */
var b = false;
var bFlag = false;
var interval = false;
game.PlayerEntity = me.Entity.extend({
 
  /* -----
 
  constructor
 
  ------ */
  
  init: function(x, y, settings) {
    // call the constructor
    this._super(me.Entity, 'init', [x, y, settings]);
    // set the default horizontal & vertical speed (accel vector)
    this.body.setVelocity(5, 15);
    this.blendInMode = false;
    this.hasClothes = false;
    this.hasSword = false;
    this.type = 'player';
    this.walkLeft = false;
    this.hasKey = false;
    this.mode = false;
    this.killed = 0;
    this.showVision = false;
    // set the display to follow our position on both axis
    me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
    this.body.setCollisionMask(me.collision.types.WORLD_SHAPE | me.collision.types.COLLECTABLE_OBJECT | me.collision.types.ENEMY_OBJECT | me.collision.types.ACTION_OBJECT);
    // ensure the player is updated even when outside of the viewport
    this.alwaysUpdate = true;
  
    this.renderable.addAnimation("walk",  [0, 1, 0, 2]);
    this.renderable.addAnimation("swordWalk",  [3, 4, 3, 5]);
    this.renderable.addAnimation("blendInWalk",  [12, 13]);
    this.renderable.addAnimation("attack",  [6, 7, 8], 250);
    this.renderable.addAnimation("die",  [9, 10, 11], 225);
    this.renderable.addAnimation("stayDead", [11, 11 , 11], 500);
    this.renderable.addAnimation("stand",  [0]);
    this.renderable.addAnimation("swordStand",  [3]);
    this.renderable.addAnimation("blendInStand",  [12]);
    this.renderable.addAnimation("giveUp", [14, 15, 16], 200);
    this.renderable.addAnimation("stayGiveUp", [16, 16, 16], 500);
    this.renderable.addAnimation("changeToStealth", [17, 18, 19, 20, 21]);
    this.renderable.addAnimation("changeToNormal", [22, 23, 24, 25, 26]);
 
    if(this.mode == false) {
      this.renderable.setCurrentAnimation("stand");
    } else {
      this.renderable.setCurrentAnimation("swordStand");
    }
    // if(player === undefined)
    //   console.log("ASDF");
    // else
    //   console.log("adsf");
    if (game.data.score !== 0 && currentLevel !== "area01"){
      if(player !== undefined){
        this.mode = player.mode;
        this.hasClothes = player.hasClothes;
        this.killed = player.killed;
        this.hasSword = player.hasSword;
      }
    }
    if(me.levelDirector.getCurrentLevelId() != currentLevel){
      for(i = 0; i < levelFromTo.length; ++i){
        if(levelFromTo[i].level.from == currentLevel && levelFromTo[i].level.to == me.levelDirector.getCurrentLevelId()){
          this.pos.x = levelFromTo[i].pos.x;
          this.pos.y = levelFromTo[i].pos.y;
        }
      }
      currentLevel = me.levelDirector.getCurrentLevelId();
      /*if(player !== undefined){
        this.mode = player.mode;
        this.hasClothes = player.hasClothes;
        this.killed = player.killed;
        this.hasSword = player.hasSword;
      }*/
    }
    else if(game.data.score !== 0 && checkpoint.level === me.levelDirector.getCurrentLevelId()){
      if(player !== undefined){
        if(checkpoint.xpos !== undefined){
          this.pos.x = checkpoint.xpos;
          this.pos.y = checkpoint.ypos;
        }
        /*this.mode = player.mode;
        this.hasClothes = player.hasClothes;
        this.killed = player.killed;
        this.hasSword = player.hasSword;*/
      }
    }
    
      //this = player;
  },
 
  /* -----
 
  update the player pos

  ------ */
  update: function(dt) {
    if(b) {
      this.body.setCollisionMask(me.collision.types.WORLD_SHAPE | me.collision.types.COLLECTABLE_OBJECT | me.collision.types.ACTION_OBJECT);
      blendInMode = true;
    }
    else if(bFlag){
      this.body.setCollisionMask(me.collision.types.WORLD_SHAPE | me.collision.types.COLLECTABLE_OBJECT | me.collision.types.ENEMY_OBJECT | me.collision.types.ACTION_OBJECT);
      blendInMode = false;
      bFlag = false;
    }
    if(this.alive && !this.renderable.isCurrentAnimation("attack") && !this.renderable.isCurrentAnimation("changeToStealth") && !this.renderable.isCurrentAnimation("changeToNormal")){
      if (me.input.isKeyPressed('left')) {
        // flip the sprite on horizontal axis
        this.walkLeft = true;
        this.renderable.flipX(this.walkLeft);
        // update the entity velocity
        this.body.vel.x -= this.body.accel.x * me.timer.tick;
        // change to the walking animation
        if(this.blendInMode){
          if (!this.renderable.isCurrentAnimation("blendInWalk")) {
            this.renderable.setCurrentAnimation("blendInWalk");
          }
        }
        else if (this.mode == false) {
          if (!this.renderable.isCurrentAnimation("walk")) {
            this.renderable.setCurrentAnimation("walk");
          }
        } else{
            if (!this.renderable.isCurrentAnimation("swordWalk")) {
              this.renderable.setCurrentAnimation("swordWalk");
            }
          }
      } else if (me.input.isKeyPressed('right')) {
        // unflip the sprite
        this.walkLeft = false;
        this.renderable.flipX(this.walkLeft);
        // update the entity velocity
        this.body.vel.x += this.body.accel.x * me.timer.tick;
        // change to the walking animation
        // change to the walking animation
        if(this.blendInMode){
          if (!this.renderable.isCurrentAnimation("blendInWalk")) {
            this.renderable.setCurrentAnimation("blendInWalk");
          }
        }
        else if (this.mode == false) {
          if (!this.renderable.isCurrentAnimation("walk")) {
            this.renderable.setCurrentAnimation("walk");
          }
        } else {
            if (!this.renderable.isCurrentAnimation("swordWalk")) {
              this.renderable.setCurrentAnimation("swordWalk");
            }
          }
      } else {
        this.body.vel.x = 0;
        // change to the standing animation
        // change to the walking animation
        if(this.blendInMode){
          if (!this.renderable.isCurrentAnimation("blendInStand")) {
            this.renderable.setCurrentAnimation("blendInStand");
          }
        }
        else if (this.mode == false){
          if (!this.renderable.isCurrentAnimation("stand"))
           this.renderable.setCurrentAnimation("stand");
        } else {
            if (!this.renderable.isCurrentAnimation("swordStand"))
              this.renderable.setCurrentAnimation("swordStand");
        }
      }
      if (me.input.isKeyPressed('V') && !this.showVision){
          this.showVision = true;
          interval = true;
          visionInterval = setTimeout(function(){interval = false,  clearTimeout(visionInterval)}, 2000);
      }
      if(interval === false)
        this.showVision = false;
      
      if (me.input.isKeyPressed('jump')) {
        // make sure we are not already jumping or falling
        if (!this.body.jumping && !this.body.falling) {
          // set current vel to the maximum defined value
          // gravity will then do the rest
          this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
          // set the jumping flag
          this.body.jumping = true;
          // play some audio
          me.audio.play("jump");
        }
      }
      if (me.input.isKeyPressed('X') &&  this.hasClothes && !this.body.falling && !this.body.jumping ){
        /*if(this.hasKey === false){
          if(this.blendInMode){
            this.body.setCollisionMask(me.collision.types.WORLD_SHAPE | me.collision.types.COLLECTABLE_OBJECT | me.collision.types.ENEMY_OBJECT);
            this.body.setVelocity(5, 15);
            this.blendInMode = false;
            if(this.mode)
              this.renderable.setCurrentAnimation("changeToNormal", "swordStand");
            else
              this.renderable.setCurrentAnimation("changeToNormal", "stand");
          }
          else{
            this.body.setCollisionMask(me.collision.types.WORLD_SHAPE | me.collision.types.COLLECTABLE_OBJECT);
            this.body.setVelocity(3, 9);
            this.blendInMode = true;
            this.renderable.setCurrentAnimation("changeToStealth", "blendInStand");
          }
        }
        else{*/
          if(this.blendInMode){
            this.body.setCollisionMask(me.collision.types.WORLD_SHAPE | me.collision.types.COLLECTABLE_OBJECT | me.collision.types.ENEMY_OBJECT | me.collision.types.ACTION_OBJECT);
            this.body.setVelocity(5, 15);
            this.blendInMode = false;
            if(this.mode)
              this.renderable.setCurrentAnimation("changeToNormal", "swordStand");
            else
              this.renderable.setCurrentAnimation("changeToNormal", "stand"); 
          }
          else{
            this.body.setCollisionMask(me.collision.types.WORLD_SHAPE | me.collision.types.COLLECTABLE_OBJECT | me.collision.types.ACTION_OBJECT);
            this.body.setVelocity(3, 9);
            this.blendInMode = true;
            this.renderable.setCurrentAnimation("changeToStealth", "blendInStand");
          }
        //}
        me.audio.play("clothesChanging");
      } 
   }
    else{
      this.body.vel.x = 0;
    }
    if(!this.alive)
      this.body.setCollisionMask(me.collision.types.WORLD_SHAPE);
    // apply physics to the body (this moves the entity)
    this.body.update(dt);
    player = this;
    // handle collisions against other shapes
    me.collision.check(this);
    // return true if we moved or if the renderable was updated
    return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
  },
   
  /**
   * colision handler
   * (called when colliding with other objects)
   */
  onCollision : function (response, other) {
    
    if (response.b.type === 'sword'){
      this.mode = true;
      this.hasSword = true;
    }
    //else if(response.b.type === 'key')
      //this.hasKey = true;
    
    return true;
  },

  makeKnife: function(){
      this.knife = new game.knifeEntity({image: 'knife', spritewidth: 32, width: 32, height: 32});
      me.game.world.addChild(this.knife);
      return;
  }
});
/*----------------
  a Food entity
 ----------------- */
game.FoodEntity = me.CollectableEntity.extend({
  // extending the init function is not mandatory
  // unless you need to add some extra initialization
  init: function(x, y, settings) {
    // call the parent constructor
    this.num = settings.foodNum;
    if(game.data.score === 0)
      eatenFood = [];
    this._super(me.CollectableEntity, 'init', [x, y , settings]);
    this.body.setVelocity(0, 0);
   
  },

   update : function(dt){
      
      for(i = 0; i < eatenFood.length; i++){
        if(eatenFood[i] === this.num){
          me.game.world.removeChild(this);
        }
      }
      this.body.update(dt);
      return (this._super(me.Entity, 'update', [dt]));
   },

  // this function is called by the engine, when
  // an object is touched by something (here collected)
  onCollision : function (response, other) {
    // do something when collected
    // play a "eating collected" sound
    if(response.a.type === 'player'){
      
      // give some score
      if(game.data.score < 3){
        me.audio.play("eating");
        game.data.score += 1;
      }
      else 
        me.audio.play("stomp");
      
      if(this.num !== undefined)
        eatenFood.push(this.num);
    // make sure it cannot be collected "again"
      this.body.setCollisionMask(me.collision.types.NO_OBJECT);
   
      // remove it
      me.game.world.removeChild(this);
       
    }
    return false
  }
});
/*----------------
  a Key entity
 ----------------- */
game.keyEntity = me.CollectableEntity.extend({
  // extending the init function is not mandatory
  // unless you need to add some extra initialization
  init: function(x, y, settings) {
    // call the parent constructor
    this.num = settings.keyNum;
    if(game.data.score === 0)
      gottenKey = [];
    this._super(me.CollectableEntity, 'init', [x, y , settings]);
    this.body.setVelocity(0, 0);
    this.type = 'key';
 
  },
 
  update : function(dt){
      
      for(i = 0; i < gottenKey.length; i++){
        if(gottenKey[i] === this.num){
          me.game.world.removeChild(this);
        }
      }
      this.body.update(dt);
      return (this._super(me.Entity, 'update', [dt]));
   },

  // this function is called by the engine, when
  // an object is touched by something (here collected)
  onCollision : function (response, other) {
    // do something when collected
    // play a "eating collected" sound
    if(response.a.type === 'player'){
      me.audio.play("keys");
      player.body.setCollisionMask(me.collision.types.WORLD_SHAPE | me.collision.types.COLLECTABLE_OBJECT | me.collision.types.ENEMY_OBJECT | me.collision.types.ACTION_OBJECT);
      player.body.setVelocity(5, 15);
      player.blendInMode = false;
      if(this.num !== undefined)
        gottenKey.push(this.num);
      // give some score
      // make sure it cannot be collected "again"
      this.body.setCollisionMask(me.collision.types.NO_OBJECT);
   
      // remove it
      me.game.world.removeChild(this);
    }
     
    return false
  }
});

/*----------------
  a stealth clothing entity
 ----------------- */
game.StealthClothes = me.CollectableEntity.extend({
  // extending the init function is not mandatory
  // unless you need to add some extra initialization
  init: function(x, y, settings) {
    // call the parent constructor
    this.num = settings.clothesNum;
    if(game.data.score === 0)
      gottenClothes = [];
    this._super(me.CollectableEntity, 'init', [x, y , settings]);
    this.body.setVelocity(0, 0);
    this.type = 'stealthClothes';
 
  },
 
  update : function(dt){
      
      for(i = 0; i < gottenClothes.length; i++){
        if(gottenClothes[i] === this.num){
          me.game.world.removeChild(this);
        }
      }
      this.body.update(dt);
      return (this._super(me.Entity, 'update', [dt]));
   },
  // this function is called by the engine, when
  // an object is touched by something (here collected)
  onCollision : function (response, other) {
    // do something when collected
    // play a "eating collected" sound
    if(response.a.type === 'player'){
      me.audio.play("grabItem");
      player.hasClothes = true;
      if(this.num !== undefined)
        gottenClothes.push(this.num);
      this.body.setCollisionMask(me.collision.types.NO_OBJECT);
   
      // remove it
      me.game.world.removeChild(this);
    }
     
    return false
  }
});

/*----------------
  a Instructions entity
 ----------------- */
game.PlayerInstructions = me.Entity.extend({
  // extending the init function is not mandatory
  // unless you need to add some extra initialization
  init: function(x, y, settings) {
    // call the parent constructor
    this._super(me.Entity, 'init', [x, y , settings]);
    this.body.setCollisionMask(me.collision.types.NO_OBJECT);
 
  }
});

/*----------------
  a credits ending entity
 ----------------- */
game.CreditsEnding = me.CollectableEntity.extend({
  // extending the init function is not mandatory
  // unless you need to add some extra initialization
  init: function(x, y, settings) {
    // call the parent constructor
    this._super(me.CollectableEntity, 'init', [x, y , settings]);
 
  },
  // this function is called by the engine, when
  // an object is touched by something (here collected)
  onCollision : function (response, other) {
    // do something when collected
    // play a "eating collected" sound
    if(response.a.type === 'player'){
      me.state.change(me.state.CREDITS);
      // remove it
      me.game.world.removeChild(this);
    }
     
    return false
  }
});

/*----------------
  a Sword entity
 ----------------- */
game.sword = me.CollectableEntity.extend({
  // extending the init function is not mandatory
  // unless you need to add some extra initialization
  init: function(x, y, settings) {
    // call the parent constructor
    this.num = settings.swordNum;
    if(game.data.score === 0)
      gottenSword = [];
    this._super(me.CollectableEntity, 'init', [x, y , settings]);
    this.body.setVelocity(0, 0);
    this.type = 'sword';
  },
 
  update : function(dt){
      
      for(i = 0; i < gottenSword.length; i++){
        if(gottenSword[i] === this.num){
          me.game.world.removeChild(this);
        }
      }
      this.body.update(dt);
      return (this._super(me.Entity, 'update', [dt]));
  },
  // this function is called by the engine, when
  // an object is touched by something (here collected)
  onCollision : function (response, other) {
    // do something when collected
    // play a "sword collected" sound
    
    if(response.a.type === 'player'){
      me.audio.play("swordCollection");
      if(this.num !== undefined)
        gottenSword.push(this.num);
      // make sure it cannot be collected "again"
      this.body.setCollisionMask(me.collision.types.NO_OBJECT);
      // remove it
      me.game.world.removeChild(this);
    }
     
    return false
  }
});
/*----------------
  Note entity
------------------------ */
game.NoteEntity = me.CollectableEntity.extend({
  init: function(x,y, settings){
    if(game.data.score === 0)
      gottenNote = [];
    this._super(me.CollectableEntity, 'init', [x, y , settings]);
    this.noteNum = settings.noteNum; 
  },
  
  update: function(){
    for(i = 0; i < gottenNote.length; i++){
        if(gottenNote[i] === this.noteNum){
            me.game.world.removeChild(this);
        }
    }
  },

  // an object is touched by something (here collected)
  onCollision : function (response, other) {
    if(response.a.type === 'player'){
      me.audio.play("page_turn");
      if(this.noteNum !== undefined)
        gottenNote.push(this.noteNum);
      this.makeNote();
      //remove it
      me.game.world.removeChild(this);
    }
    return false
  },

  makeNote: function(){
      this.story = new game.storyEntity(this, {image: this.noteNum, spritewidth: this.noteWidth, width: 500, height: 96});
      me.game.world.addChild(this.story);
      return;
    }

});
/*----------------
  Spike entity
 ----------------- */
 game.SpikeEntity = me.CollectableEntity.extend(
{    
    init: function (x, y, settings)
    {

        this._super(me.CollectableEntity, 'init', [x, y , settings]);
        this.body.setVelocity(0, 0);
    },

    onCollision : function (response, other) {
      if (player.alive && response.a.type === 'player'){
          player.alive = false;
          game.data.score -= 1;
          if(game.data.score === 0){
            currentLevel = "area02";
            checkpoint = {xpos: undefined, ypos: undefined, level: undefined};
            player.renderable.setCurrentAnimation("die", function(){player.renderable.setCurrentAnimation("stayDead", function(){me.state.change(me.state.GAMEOVER)})});
          }
          else
            player.renderable.setCurrentAnimation("die", function(){player.renderable.setCurrentAnimation("stayDead", function(){me.levelDirector.reloadLevel()})});
          player.body.vel.x = 0;
          player.alive = false;
          me.audio.play("dying");
          me.game.world.removeChild(this);
        return false;
      }
      return true;
    }
});

/*----------------
  Enemy entity
 ----------------- */
game.EnemyEntity = me.Entity.extend(
{    
    init: function (x, y, settings)
    {
        this.vision = false;
        this.mVision = undefined;
        this.sightDist = settings.sightDist;
        if(game.data.score === 0)
          killedEnemy = [];
        this.enemyNum = settings.enemyNum;
        if(this.sightDist === undefined) this.sightDist = 200 + (100 * Math.round(Math.random()*1));

        // define this here instead of tiled
        settings.image = "wheelie_right";
        this.type = 'enemy';
        // save the area size defined in Tiled
        var width = settings.width;
        var height = settings.height;

        // adjust the size setting information to match the sprite size
        // so that the entity object is created with the right size
        settings.spritewidth = settings.width = 63;
        settings.spriteheight = settings.height = 90;
        
        // call the parent constructor
        this._super(me.Entity, 'init', [x, y , settings]);
        // set start/end position based on the initial area size
        x = this.pos.x;
        this.startX = x;
        this.endX   = x + width - settings.spritewidth;
        this.pos.x  = x + width - settings.spritewidth;

        this.renderable.addAnimation("stand",  [0]);
        this.renderable.addAnimation("walk",  [0, 1, 0, 2]);

        // manually update the entity bounds as we manually change the position
        this.updateBounds();

        // to remember which side we were walking
        this.walkLeft = false;

        // walking & jumping speed
        this.body.setVelocity(3, 6);
    },
        
    // manage the enemy movement
    update : function (dt)
    {            
        for(i = 0; i < killedEnemy.length; i++){
          if(killedEnemy[i] === this.enemyNum)
            me.game.world.removeChild(this);
        }
        if (this.alive)
        {
            //if (me.input.isKeyPressed('V') && player.alive){
            if(player !== undefined && player.showVision){
              if(!this.vision && this.sightDist !== 0){
                this.makeVision();
              }
            }
            if(player !== undefined && !player.showVision){
              if(this.vision){
                me.game.world.removeChild(this.mVision);
                this.vision = false;
              }
            }
              
            // if(this.vision && this.vEntity !== undefined){
            //   this.vision = false;
            //   //console.log("asdf");
            // }

            if (this.walkLeft && this.pos.x <= this.startX)
            {
                this.walkLeft = false;
            }
            else if (!this.walkLeft && this.pos.x >= this.endX)
            {
                this.walkLeft = true;
            }
            
            this.renderable.flipX(this.walkLeft);
            this.body.vel.x += (this.walkLeft) ? -this.body.accel.x * me.timer.tick : this.body.accel.x * me.timer.tick;
            
            if(player != undefined && player.renderable){
              if(((!player.blendInMode || player.renderable.isCurrentAnimation("changeToStealth")) && !b) && (Math.abs((player.pos.y + 85) - (this.pos.y + 90)) < 40)){
                if(((player.pos.x < this.pos.x && this.walkLeft) || (player.pos.x > this.pos.x && this.walkLeft === false)) && Math.abs(player.pos.x - this.pos.x) < this.sightDist){
                  this.getCaught();
                }
              }
            }

        }
        else
        {
            this.body.vel.x = 0;
        }
        // check & update movement
        this.body.update(dt);
        
        // handle collisions against other shapes
        me.collision.check(this);
            
        // return true if we moved or if the renderable was updated
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    },
  
    /**
     * colision handler
     * (called when colliding with other objects)
     */
    onCollision : function (response, other) {

      if (response.b.body.collisionType !== me.collision.types.WORLD_SHAPE){
        if (this.alive && response.b.body.collisionType !== me.collision.types.COLLECTABLE_OBJECT && other.type === 'player'){
          if (this.alive && player.alive && player.mode){
            if (response.overlapV.y > 0){
              this.alive = false;
              if(this.enemyNum !== undefined)
                killedEnemy.push(this.enemyNum);
              this.body.setCollisionMask(me.collision.types.NO_OBJECT);
              me.game.world.removeChild(this);
              player.renderable.setCurrentAnimation("attack", "swordStand");
              me.audio.play("SwordSwing");
              player.killed++;
              if(this.vision) me.game.world.removeChild(this.mVision);
              return false;
            }
            else if(player.renderable.isCurrentAnimation("changeToNormal"))
              return false;
            else if((player.walkLeft === this.walkLeft) && ((this.walkLeft && this.pos.x < player.pos.x) || (!this.walkLeft && this.pos.x > player.pos.x))){
              this.alive = false;
              if(this.enemyNum !== undefined)
                killedEnemy.push(this.enemyNum);
              this.body.setCollisionMask(me.collision.types.NO_OBJECT);
              me.game.world.removeChild(this);
              player.renderable.setCurrentAnimation("attack", "swordStand");
              me.audio.play("SwordSwing");
              player.killed++;
              if(this.vision) me.game.world.removeChild(this.mVision);
              return false;
            }
          }
          this.getCaught();
        }
        return false;
      }
      if(other.type === 'throwingKnife'){
        console.log("hoorey");
        return false;
      }
      // Make all other objects solid
      return true;
    },

    makeVision: function(){

      this.vision = true;
      this.mVision = new game.visionEntity(this, {image:'visionSprite', spritewidth: this.sightDist, width: this.sightDist*2, height: 77});
      me.game.world.addChild(this.mVision);
      return;
    },

    getCaught : function(){
      if(player.alive){
        this.renderable.setCurrentAnimation("stand"); 
        this.alive = false;
        game.data.score -= 1;
        if(game.data.score === 0){
          currentLevel = "area02";
          checkpoint = {xpos: undefined, ypos: undefined, level: undefined};
          player.renderable.setCurrentAnimation("giveUp", function(){player.renderable.setCurrentAnimation("stayGiveUp", function(){me.state.change(me.state.GAMEOVER)})});
        }
        else
          player.renderable.setCurrentAnimation("giveUp", function(){player.renderable.setCurrentAnimation("stayGiveUp", function(){me.levelDirector.reloadLevel()})});
        player.body.vel.x = 0;
        player.alive = false;
        me.audio.play("shotgunReload");
      }
    }
});
//----------------
// Vision Entity
//----------------
game.visionEntity = me.Entity.extend({
  init: function(enemy, settings){
    this.enemy = enemy;
    if(this.enemy.walkLeft)
      this.xPos = this.enemy.pos.x - (this.enemy.sightDist + ((this.enemy.sightDist === 200) ? 63 : 126));
    else
      this.xPos = this.enemy.pos.x - ((this.enemy.sightDist === 200) ? 63 : 126);
    this._super(me.Entity, 'init', [this.xPos, enemy.pos.y+13, settings]);
    this.body.setVelocity(0, 0);
  },

  update: function(){
    this.renderable.flipX(this.enemy.walkLeft);
    if(this.enemy.walkLeft)
      this.pos.x = this.enemy.pos.x - (this.enemy.sightDist + ((this.enemy.sightDist === 200) ? 63 : 126));
    else
      this.pos.x = this.enemy.pos.x - ((this.enemy.sightDist === 200) ? 63 : 126);
    this.pos.y = this.enemy.pos.y+13;
    this.body.update();
  }
});

//----------------
// Story Entity
//----------------
game.storyEntity = me.Entity.extend({
    init: function(note, settings){
    //this.note = note;
    //this._super(me.Entity, 'init', [note.pos.x+32, note.pos.y-32, settings]);
    this._super(me.Entity, 'init', [5, 5, settings]);
    this.floating = true;
  },

  update: function(){
    if (me.input.isKeyPressed('removeStory'))
      me.game.world.removeChild(this);
  }
});

//----------------
// Door Entity
//----------------
game.doorEntity = me.Entity.extend({
  init: function(x, y, settings){
    this.doorNum = settings.doorNum;
    this._super(me.Entity, 'init', [x, y, settings]);
    this.body.setVelocity(0, 0);

  },

  update: function(){
    for(i = 0; i < gottenKey.length; i++){
        if(gottenKey[i] === this.doorNum){
            me.game.world.removeChild(this);
        }
    }
  },

  onCollision : function (response, other) {
    if(other.type === 'player')
      return false;
  }
});

//----------------
// box Entity
//----------------
game.boxEntity = me.Entity.extend({
  init: function(x, y, settings){
    this._super(me.Entity, 'init', [x, y, settings]);
    this.body.setVelocity(0, 0);
    this.body.collisionType = me.collision.types.NPC_OBJECT;

  },

  update: function(){
    if(player != undefined && player.renderable && !player.blendInMode){
      if(player.pos.x > this.pos.x && player.pos.x < this.pos.x + this.width - 32){
        b = true;
        bFlag = true;
      }
      else
        b = false;
    }
  },
});

//----------------
// checkpoint Entity
//----------------
game.checkpointEntity = me.Entity.extend({
  init: function(x, y, settings){
    this._super(me.Entity, 'init', [x, y, settings]);
    this.body.setVelocity(0, 0);
  },

  onCollision : function (response, other) {
    if(other.type === 'player'){
      me.game.world.removeChild(this);
      checkpoint.xpos = this.pos.x;
      checkpoint.ypos = this.pos.y;
      checkpoint.level = me.levelDirector.getCurrentLevelId();
    }
  }
});

//----------------
// knife Entity
//----------------1
game.knifeEntity = me.Entity.extend({
  init: function(settings){
    this.type = 'throwingKnife';
    this._super(me.Entity, 'init', [player.pos.x, player.pos.y+23, settings]);
    this.body.setCollisionMask(me.collision.types.WORLD_SHAPE | me.collision.types.ENEMY_OBJECT);
    this.body.setVelocity(9, 1);
  },

  update: function(dt){
    this.body.update(dt);
    this.body.vel.x += this.body.accel.x * me.timer.tick;
    return (this._super(me.Entity, 'update', [dt]));
  },

  onCollision : function (response, other) {
    if(other.type === 'enemy')
      console.log("adsf");
    console.log("adsf");
    //if(response.b.type )
    if (response.b.body.collisionType === me.collision.types.ENEMY_OBJECT){
      other.alive = false;
      if(other.vision) me.game.world.removeChild(other.mVision);
      me.game.world.removeChild(this.other);
      me.game.world.removeChild(this);
      return true;
    }
    return true;
  }
});
