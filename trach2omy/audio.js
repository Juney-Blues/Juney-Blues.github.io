//code by flare, everyone say "thank you flare"
//minor edits by juney, if something seems stupid, everyone say "what the hell, juney?"
let fade_speed = 0.02
let current_track = ""
let current_time = 0

let generate_audio = (page) => {
	
	new_track = page.sound

	// Don't make duplicate tracks
	if (new_track == current_track) {
		return;
	}

    // Create Audio element
    let new_audio      = document.createElement("audio")
	new_audio.id       = new_track
    new_audio.volume   = 0
	new_audio.autoplay = "true"
	new_audio.loop     = "true"
	new_audio.controls = "true"
	current_track      = new_audio.id
	
	// Sync audio tracks between pages
	if (page.syncsound  == true) {
		new_audio.currentTime = current_time 
	}
	else {
		new_audio.currentTime = 0
	}
	
	//undefined check, can't go earlier or other stuff breaks
	if (new_track == undefined) {
		return
	}
	else {
		new_audio.src = comicObject.linkPrefix + new_track //moved to after the undefined check to avoid console errors - jnue
		document.body.appendChild(new_audio)
	}
	
    // Interval to manage audio track every seccond
    let interval_is_playing = true
    let audio_interval = setInterval(() => {

        // If the track is playing
        if (interval_is_playing) {
            // If a new track is created start fading out
            if (current_track != new_audio.id) {
                interval_is_playing = false
            } else {
                new_audio.volume = Math.min(new_audio.volume + fade_speed, 1)
				current_time = new_audio.currentTime //doing it here means the sync will only be good as our interval time. if this is too janky maybe find a different way?
			}
        }

        // If track has stopped, start fading out
        if (!interval_is_playing) {
            if (new_audio.volume < 0.1) {
                new_audio.remove()
                clearInterval(audio_interval)
            } else {
                new_audio.volume = Math.max(new_audio.volume - fade_speed, 0)
            }
        }

    }, 100)

}