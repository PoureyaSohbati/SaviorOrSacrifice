//game resources
game.resources = [
  /**
   * Graphics.
   */
  // our level tileset
  {name: "area01_level_tiles",  type:"image", src: "data/img/map/area01_level_tiles.png"},
  {name: "area01_level_tiles3",  type:"image", src: "data/img/map/area01_level_tiles3.png"},
   {name: "area01_bkg01",         type:"image", src: "data/img/area01_bkg01.png"},
   {name: "area02_bkg02",         type:"image", src: "data/img/area02_bkg02.png"},
   {name: "area03_bkg03",         type:"image", src: "data/img/area03_bkg03.png"},
   {name: "area04_bkg04",         type:"image", src: "data/img/area04_bkg04.png"},
   {name: "area12_bkg12",         type:"image", src: "data/img/area12_bkg12.png"},
   {name: "area13_bkg13",         type:"image", src: "data/img/area13_bkg13.png"},
   {name: "area14_bkg14",         type:"image", src: "data/img/area14_bkg14.png"},


   // the main player spritesheet
  {name: "mainCharacter",    type:"image", src: "data/img/sprite/sprite_sheet6.png"},
  {name: "knife",    type:"image", src: "data/img/sprite/knife.png"},
  {name: "sword",            type:"image", src: "data/img/sprite/sword.png"},
  {name: "wheelie_right",    type:"image", src: "data/img/sprite/wheelie_right.png"},
  // title screen
  {name: "title_screen",     type:"image", src: "data/img/gui/title_screen.png"},
  {name: "title_screenEnd",     type:"image", src: "data/img/gui/title_screenEnd.png"},
  // game font
  {name: "32x32_font",       type:"image", src: "data/img/font/32x32_font.png"},
  {name: "22x22_font",       type:"image", src: "data/img/font/22x22_font.png"},
  // the spinning coin spritesheet
  {name: "spinning_coin_gold",  type:"image", src: "data/img/sprite/spinning_coin_gold.png"},
  // vision
  {name: "visionSprite",  type:"image", src: "data/img/sprite/visionSprite.png"},
  // key
  {name: "key",  type:"image", src: "data/img/sprite/key.png"},
  // stealth clothes
  {name: "stealthClothes",         type:"image", src: "data/img/sprite/stealthClothes.png"},
  // instructions
  {name: "instructions",         type:"image", src: "data/img/sprite/instructions.png"},
  {name: "instructions1",         type:"image", src: "data/img/sprite/instructions1.png"},
  {name: "instructions2",         type:"image", src: "data/img/sprite/instructions2.png"},
  {name: "instructions3",         type:"image", src: "data/img/sprite/instructions3.png"},
  {name: "instructions4",         type:"image", src: "data/img/sprite/instructions4.png"},
  {name: "instructions5",         type:"image", src: "data/img/sprite/instructions5.png"},
  {name: "instructions6",         type:"image", src: "data/img/sprite/instructions6.png"},
  {name: "instructions7",         type:"image", src: "data/img/sprite/instructions7.png"},
  {name: "instructions8",         type:"image", src: "data/img/sprite/instructions8.png"},
  {name: "instructions9",         type:"image", src: "data/img/sprite/instructions9.png"},
  // notes
  {name: "note", type:"image", src: "data/img/sprite/note.png"},
  {name: "note0", type:"image", src: "data/img/sprite/note_start.png"},
  {name: "note1", type:"image", src: "data/img/sprite/note1.png"},
  {name: "note2", type:"image", src: "data/img/sprite/note2.png"},
  {name: "note3", type:"image", src: "data/img/sprite/note3.png"},
  {name: "note4", type:"image", src: "data/img/sprite/note4.png"},
  {name: "note5", type:"image", src: "data/img/sprite/note5.png"},
  {name: "note6", type:"image", src: "data/img/sprite/note6.png"},
  {name: "note7", type:"image", src: "data/img/sprite/note7.png"},
  {name: "note8", type:"image", src: "data/img/sprite/note8.png"},
  {name:"dialogbox", type: "image", src: "data/img/sprite/dialog.png"},
  
  // credits/gameover
  {name: "credits",        type:"image",  src: "data/img/gui/credits.png"},
  {name: "gameover",        type:"image",  src: "data/img/gui/gameover.png"},

  /*
  * Sound effects.
  */
  {name: "eating", type: "audio", src: "data/sfx/"},
  {name: "swordCollection", type: "audio", src: "data/sfx/"},
  {name: "stomp", type: "audio", src: "data/sfx/"},
  {name: "jump",  type: "audio", src: "data/sfx/"},
  {name: "swordswing",  type: "audio", src: "data/sfx/"},
  {name: "dying",  type: "audio", src: "data/sfx/"},
  {name: "keys",  type: "audio", src: "data/sfx/"},
  {name: "stomp",  type: "audio", src: "data/sfx/"},
  {name: "shotgunreload", type: "audio", src: "data/sfx/"},
  {name: "clotheschanging", type: "audio", src: "data/sfx/"},
  {name: "grabitem", type: "audio", src: "data/sfx/"},
  {name: "page_turn", type: "audio", src: "data/sfx/"},

  //Background Menu music 
  {name: "Savior-or-Sacrifice-Menu",  type: "audio", src: "data/bgm/"},
  //In game music
  {name: "Savior-or-Sacrifice-InGame",  type: "audio", src: "data/bgm/"},
  // credits music
  {name: "credits",  type: "audio", src: "data/bgm/"},

  /*
   * Maps. 
   */
  {name: "area01", type: "tmx", src: "data/map/area01.tmx"},
  {name: "area02", type: "tmx", src: "data/map/area02.tmx"},
  {name: "area03", type: "tmx", src: "data/map/area03.tmx"},
  {name: "area04", type: "tmx", src: "data/map/area04.tmx"},
  {name: "area05", type: "tmx", src: "data/map/area05.tmx"},
  {name: "area10", type: "tmx", src: "data/map/area10.tmx"},
  {name: "area12", type: "tmx", src: "data/map/area12.tmx"},
  {name: "area13", type: "tmx", src: "data/map/area13.tmx"},
  {name: "area14", type: "tmx", src: "data/map/area14.tmx"}
  //{name: "area020", type: "tmx", src: "data/map/area020.tmx"}
  //{name: "area05", type: "tmx", src: "data/map/area05.tmx"}
];