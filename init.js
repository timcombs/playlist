// Keep track of all loaded buffers.
var BUFFERS = {};
const buffersArr = [];

// Page-wide audio context.
var context = null;

// counter to keep track of which song to play
 var count = 0;

// An object to track the buffers to load {name: path}
var BUFFERS_TO_LOAD = {
  s1: 'https://ia800207.us.archive.org/1/items/f_pass012/pass012_-_01_clouds_in_my_home_-_s1.mp3',
  r: 'https://ia803109.us.archive.org/10/items/s65038/02.%20R.mp3',
  dwor: 'https://ia800207.us.archive.org/7/items/f_pass007/pass007_-_08_lazzich_-_dwor.mp3',
  frettervine: 'https://ia800708.us.archive.org/6/items/Miss_Parka-17349/Bitmoth_-_03_-_frettervine.mp3',
  oozingEyes: 'https://ia800303.us.archive.org/21/items/ns41/05-kidsok_nuit_-_oozing_from_her_eyes_noor_rmx.mp3',
  autumnDay: 'https://ia600207.us.archive.org/7/items/f_pass007/pass007_-_02_lazzich_-_autumn_day.mp3',
  myosote: 'https://ia902708.us.archive.org/9/items/PhobodekidsokNuit-Sgur/03-Myosote.mp3',
  autumnFog: 'https://ia903005.us.archive.org/14/items/hw014/hw014_03_denis_mati_-_autumn_fog.mp3',
  mythmagic1: 'https://ia904505.us.archive.org/19/items/MythMagic/01__.mp3',
  block6: 'https://ia600901.us.archive.org/5/items/block_o/BLOCK6_vbr.mp3',
  amazingGraze: 'https://ia903407.us.archive.org/2/items/vvaa-emit-one-emit-one-/10-Amazing%20Graze.mp3',
  spike: 'https://ia903407.us.archive.org/2/items/vvaa-emit-one-emit-one-/09-Spike.mp3',
  colouredSuns: 'https://ia600207.us.archive.org/7/items/f_pass007/pass007_-_05_lazzich_-_coloured_suns.mp3',
  gelid: 'https://ia800708.us.archive.org/6/items/Miss_Parka-17349/Bitmoth_-_05_-_gelid.mp3',
  sleevetunnel: 'https://ia600708.us.archive.org/6/items/Miss_Parka-17349/Bitmoth_-_04_-_sleevetunnel.mp3'
};

// Loads all sound samples into the buffers object.
function loadBuffers() {
  // Array-ify
  var names = [];
  var paths = [];
  for (var name in BUFFERS_TO_LOAD) {
    var path = BUFFERS_TO_LOAD[name];
    names.push(name);
    buffersArr.push(name);
    paths.push(path);
  }

  console.log('in loadBuffers', context);
  if (context.state === 'suspended') {
    context.resume();
  }

  bufferLoader = new BufferLoader(context, paths, function(bufferList) {
    for (var i = 0; i < bufferList.length; i++) {
      var buffer = bufferList[i];
      var name = names[i];
      BUFFERS[name] = buffer;
      console.log('in bufferLoader for-loop', context);
    }
  });

  bufferLoader.load();
}

function loadAudioCtx() {
  try {
    // Fix up prefixing
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    context = new AudioContext();
    if (context) {
      load.classList.add('goodbye');
      playPause.classList.add('hello');
      playPause.classList.remove('invisible')
    }
  }
  catch(e) {
    alert("Web Audio API is not supported in this browser");
  }
  loadBuffers();
};
