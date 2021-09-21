var CrossfadePlaylistSample = {
  FADE_TIME: 1, // Seconds
  playing: false
};

CrossfadePlaylistSample.play = function() {
  var ctx = this;
  console.log('this', ctx);
  playHelper(BUFFERS);

  function createSource(buffer) {
    var source = context.createBufferSource();
    var gainNode = context.createGain ? context.createGain() : context.createGainNode();
    source.buffer = buffer;
    // Connect source to gain.
    source.connect(gainNode);
    // Connect gain to destination.
    gainNode.connect(context.destination);

    return {
      source: source,
      gainNode: gainNode
    };
  }

  // pass in songBuffers object and 
  function playHelper(songBuffers) {
    console.log('songBuffers, count', songBuffers, count);
    let buffArr = Object.keys(songBuffers);
    let playListLen = buffArr.length;

    updateName(buffArr[count]);
    let bufferNow = songBuffers[buffArr[count]];
    let bufferLater = songBuffers[buffArr[count + 1]] || songBuffers[buffArr[0]];
    console.log('bufferNow', bufferNow, 'buffer before this');
    console.log('bufferLater', bufferLater);

    // name.innerHTML = buffersArr.name
    var playNow = createSource(bufferNow);
    var source = playNow.source;
    ctx.source = source;
    console.log('context', ctx);
    var gainNode = playNow.gainNode;
    var duration = bufferNow.duration;
    var currTime = context.currentTime;
    // Fade the playNow track in.
    gainNode.gain.linearRampToValueAtTime(0, currTime);
    gainNode.gain.linearRampToValueAtTime(1, currTime + ctx.FADE_TIME);
    // Play the playNow track.
    source.start ? source.start(0) : source.noteOn(0);
    // At the end of the track, fade it out.
    gainNode.gain.linearRampToValueAtTime(1, currTime + duration-ctx.FADE_TIME);
    gainNode.gain.linearRampToValueAtTime(0, currTime + duration);

    // recursive track change both songs playing during final second of 1st song
    count += 1; // external counter - c.f. 
    ctx.timer = setTimeout(function() {
      playHelper(songBuffers);
    }, (duration - ctx.FADE_TIME) * 1000);
  }
};

CrossfadePlaylistSample.stop = function() {
  clearTimeout(this.timer);
  this.source.stop ? this.source.stop(0) : this.source.noteOff(0);
};

CrossfadePlaylistSample.toggle = function() {
  this.playing ? this.stop() : this.play();
  this.playing = !this.playing;
};