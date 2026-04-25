function fsin(freq, phase, t) {
  return Math.sin(2 * Math.PI * freq * t + phase)
}

function linearChirp(startFreq, endFreq, duration, sampleRate) {
  if (duration === undefined) {
    duration = 1; // seconds
  }
  if (sampleRate === undefined) {
    sampleRate = 44100; // per second
  }
  var numSamples = Math.floor(duration * sampleRate);
  var chirp = new Array(numSamples);
  var df = (endFreq - startFreq) / numSamples;
  for (var i = 0; i < numSamples; i++) {
    chirp[i] = fsin(startFreq + df * i, 0, i / sampleRate);
  }
  return chirp;
}

function AnalyzeWithFFT() {
  var numChannels = 1; // mono
  var duration = 1; // seconds
  var sampleRate = 44100; // Any value in [22050, 96000] is allowed
  var chirp = linearChirp(10000, 20000, duration, sampleRate);
  var numSamples = chirp.length;

  // Now we create the offline context to render this with.
  var ctx = new OfflineAudioContext(numChannels, numSamples, sampleRate);
  
  // Our example wires up an analyzer node in between source and destination.
  // You may or may not want to do that, but if you can follow how things are
  // connected, it will at least give you an idea of what is possible.
  //
  // This is what computes the spectrum (FFT) information for us.
  var analyser = ctx.createAnalyser();

  // There are abundant examples of how to get audio from a URL or the
  // microphone. This one shows you how to create it programmatically (we'll
  // use the chirp array above).
  var source = ctx.createBufferSource();
  var chirpBuffer = ctx.createBuffer(numChannels, numSamples, sampleRate);
  var data = chirpBuffer.getChannelData(0); // first and only channel
  for (var i = 0; i < numSamples; i++) {
    data[i] = 128 + Math.floor(chirp[i] * 127); // quantize to [0,256)
  }
  source.buffer = chirpBuffer;

  // Now we wire things up: source (data) -> analyser -> offline destination.
  source.connect(analyser);
  analyser.connect(ctx.destination);

  // When the audio buffer has been processed, this will be called.
  ctx.oncomplete = function(event) {
    console.log("audio processed");
    // To get the spectrum data (e.g., if you want to plot it), you use this.
    var frequencyBins = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(frequencyBins);
    console.log(frequencyBins);
    // You can also get the result of any filtering or any other stage here:
    console.log(event.renderedBuffer);
  };

  // Everything is now wired up - start the source so that it produces a
  // signal, and tell the context to start rendering.
  //
  // oncomplete above will be called when it is done.
  source.start();
  ctx.startRendering();
}