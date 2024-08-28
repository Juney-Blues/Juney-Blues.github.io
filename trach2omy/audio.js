
let backgroundAmbience1 = document.getElementById("backgroundAmbience1")
let backgroundAmbience2 = document.getElementById("backgroundAmbience2")

//set volumes to 0 so we can fade them in
backgroundAmbience1.volume = 0;
backgroundAmbience2.volume = 0;
//having 2 audio tracks so we can crossfade between them
let activeAmbient = backgroundAmbience1;
let activeMusic = backgroundMusic1;

let pageMusic    = ""
let pageAmbience = ""

let fadeTime = 1;
let fadeInVolume = 1;
//set music and ambience
const setPageSound = async (page) =>{
	if (page.ambience == null) { 
		pageAmbience = ""
	}
	else {
		pageAmbience = comicObject.linkPrefix + page.ambience
	}
	if (page.music == null) { 
		pageMusic = ""
	}
	else {
		pageMusic = comicObject.linkPrefix + page.music
    }
	
    //keep ambience looping between pages without getting interrupted
	if(pageAmbience != activeAmbient.src){
		//fade out current audio
		fadeAudioOut(activeAmbient,activeAmbient.volume);
		// switch audio element to avoid gap in audio
		activeAmbient = activeAmbient == backgroundAmbience2 ? backgroundAmbience1 : backgroundAmbience2;
		//keep current time between ambience sounds
		prevTime = activeAmbient.currentTime;
		activeAmbient.src = pageAmbience;
		activeAmbient.currentTime = prevTime;	
		//fade in current audio
		fadeAudioIn(activeAmbient,fadeInVolume);
	}
	if(pageMusic != activeMusic.src){
		activeMusic.src = pageMusic;
	}
}

//fading code courtesy of flare >:D

//bwehhh these can break if you change pages fast enough that the fade intervals start interfering with themselves
//not sure how to fix it

// Fade in
let fadeAudioIn = (fadingInAudio,setVolume) => {
  let fadeInInterval = setInterval(() => {
    fadingInAudio.volume += setVolume / fadeTime / 10 
	
    // accounts for float error
    if (activeAmbient.volume + setVolume / fadeTime / 10 >= setVolume) {
      clearInterval(fadeInInterval)
      activeAmbient.volume = setVolume
    }
  }, 100)
}
// Fade out
let fadeAudioOut = (fadingOutAudio,currentVolume) => {
  let fadeOutInterval = setInterval(() => {
    fadingOutAudio.volume -= currentVolume / fadeTime / 10 
    // accounts for float error
    if (fadingOutAudio.volume - currentVolume / fadeTime / 10 <= 0) {
      clearInterval(fadeOutInterval)
      fadingOutAudio.volume = 0
    }
  }, 100)
}


//preload images and sounds, usually the next page's

