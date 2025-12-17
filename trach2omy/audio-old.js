// Ambience audio
let backgroundAmbience1 = document.getElementById("backgroundAmbience1")
let backgroundAmbience2 = document.getElementById("backgroundAmbience2")
backgroundAmbience1.volume = 0;
backgroundAmbience2.volume = 0;

let audioElements = [backgroundAmbience1, backgroundAmbience2]

// Having 2 audio tracks so we can crossfade between them
let ambActiveIndex = 0;
let ambPageLink = ""
let ambFadeTime = 1;
let ambFadeInInterval;
let ambFadeOutInterval;

// Set up crossfade
const ambCrossFadeAudio = () => {
	// Clear intervals from previous page
	if (ambFadeInInterval) { clearInterval(ambFadeInInterval) }
	if (ambFadeOutInterval) { clearInterval(ambFadeOutInterval) }

	// If durations are the same
	if (getInactiveAudio().duration = getActiveAudio().duration) {
		getActiveAudio().currentTime = getInactiveAudio().currentTime
	}

	// Fade out inactive audio
	getInactiveAudio().volume = 1
	ambFadeOutInterval = fadeAudioOut(getInactiveAudio(), 1, ambFadeTime)

	// Fade in active audio
	getActiveAudio.volume = 0;
	ambFadeInInterval = fadeAudioIn(getActiveAudio(), 1, ambFadeTime)
}
backgroundAmbience1.onloadedmetadata = ambCrossFadeAudio
backgroundAmbience2.onloadedmetadata = ambCrossFadeAudio

// Music Audio (Currently Unused)
// let activeMusicAudio = backgroundMusic1;
// let pageMusicLink = ""

// Set music and ambience
const setPageSound = async (page) => {

	// Fade between Ambience
	pageAmbienceLink = page.ambience ? comicObject.linkPrefix + page.ambience : ""
	if (pageAmbienceLink != getActiveAudio().src) {

		// Switch active audio element
		ambActiveIndex = (ambActiveIndex + 1) % 2

		if (pageAmbienceLink) {
			getActiveAudio().src = pageAmbienceLink
		} else {
			// Fade out inactive audio
			getInactiveAudio().volume = 1
			ambFadeOutInterval = fadeAudioOut(getInactiveAudio(), 1, ambFadeTime)
		}
	}

	// Set music (Currently Unused)
	// pageMusicLink = page.music ? comicObject.linkPrefix + page.music : ""
	// if (pageMusicLink != activeMusic.src) {
	// 	activeMusic.src = pageMusicLink;
	// }
}

let getActiveAudio = () => audioElements[ambActiveIndex]
let getInactiveAudio = () => audioElements[(ambActiveIndex + 1) % 2]

// Fade in
let fadeAudioIn = (audioElement, setVolume, fadeTime) => {
	let interval = setInterval(() => {
		audioElement.volume += setVolume / fadeTime / 10
		// Accounts for float error
		if (audioElement.volume + setVolume / fadeTime / 10 >= setVolume) {
			clearInterval(interval)
			audioElement.volume = setVolume
		}
	}, 100)
	return interval
}

// Fade out
let fadeAudioOut = (audioElement, currentVolume, fadeTime) => {
	let interval = setInterval(() => {
		audioElement.volume -= currentVolume / fadeTime / 10
		// Accounts for float error
		if (audioElement.volume - currentVolume / fadeTime / 10 <= 0) {
			clearInterval(interval)
			audioElement.volume = 0
		}
	}, 100)
	return interval
}