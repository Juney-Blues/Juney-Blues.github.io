// Usernames
const knownUsers = {
	yellow: {
		color: "#cfa630",
		username: "Laikaboss7008"
	},
	teal: {
		color: "#007880",
		username: "SpringInsect113"
	},
	none: {
		color: "#007880",
		username: ""
	},
}

//global variables
var isKeyNavAllowed = true;
let chapter;
// LOAD COMIC OBJECT
let comicObject
let subPage = "/trach2omy"
fetch('./tracheotomyComic.json').then((response) => response.json()).then((json) => initComic(json));

const initComic = json => {
	comicObject = json
	loadPage()
}

const getUrlPage = () => {
	const urlParams = new URLSearchParams(window.location.search);
	const p = urlParams.get("pg")
	return p ? p : "0"
}

const loadPage = async () => {
	const pageIndex = parseInt(getUrlPage())
	//console.log(pageIndex)
	const page = comicObject.pages[pageIndex]
	const comicLength = comicObject.pages.length
	//get current chapter
	chapter = comicObject.chapters.find((e) => e.endPage >= pageIndex);
	// LOAD PAGE
	if ("custom" in page) {
		// Load custom page
		let pageHtml = await fetch(`./customPages/${pageIndex}.html`).then(e => e.text())
		pageHtml = pageHtml.replace("MAINIMAGE", comicObject.linkPrefix + page.img)
		document.getElementById("pageContent").innerHTML = pageHtml
		initCustomPage()
	} else {
		// Load basic page
		let img = document.createElement("img")
		img.src = comicObject.linkPrefix + page.img
		document.getElementById("pageContent").innerHTML = ""
		document.getElementById("pageContent").append(img)
	}

	// Set Theme
	document.body.className = page.theme ?? ""
	
	// Set Header Title
	if (chapter.defaultheader != null){
		document.getElementById("pageTitle").innerHTML = chapter.defaultheader;
	}
	if (page.header != null) {
		document.getElementById("pageTitle").innerHTML = page.header;
	}
	
	// Set next and prev
	const nextPage = document.getElementById("nextPage")
	const prevPage = document.getElementById("prevPage")

	nextPage.href = subPage + "/?pg=" + (pageIndex + 1)
	prevPage.href = subPage + "/?pg=" + (pageIndex - 1)

	nextPage.style.display = pageIndex > comicLength - 2 ? "none" : "inline"
	prevPage.style.display = pageIndex < 1 ? "none" : "inline"

	// Preload next pages
	if (pageIndex < comicLength - 2) {
		document.getElementById("preloadNext").src = comicObject.linkPrefix + comicObject.pages[pageIndex + 1].img
	}
	if (pageIndex > 1) {
		document.getElementById("preloadPrev").src = comicObject.linkPrefix + comicObject.pages[pageIndex - 1].img
	}

	// Load additional credits
	if (page.credit != null) {
		document.getElementById("pageCredits").innerHTML = page.credit
	} else {
		document.getElementById("pageCredits").innerHTML = ""
	}
	// Get whether key navigation is allowed
	if (page.keynav == false) {
		isKeyNavAllowed = false;
	}
	else {
		isKeyNavAllowed = true;
	}
	// Scroll to top
	window.scrollTo(0, 0);

	//load audio
	setPageSound(page);
}

// Init custom page events
const initCustomPage = () => {

	// Check for dissonancelog
	const dissonancelogs = document.querySelectorAll(".dissonancelog")

	dissonancelogs.forEach(log => {
		let prevUser = ""

		log.querySelectorAll("p").forEach(msg => {
			let user = msg.dataset.user
			if (prevUser != user) {
				let knownUser = knownUsers[user]

				if (knownUser.username) {
					msg.innerHTML = `<b style="color: ${knownUser.color}">${knownUser.username}:</b> <br>` + msg.innerHTML
					msg.className = "newMsgUser"
				}

			}
			prevUser = user
		})
	})

}

// Handle click events
const clickLink = (event, link) => {
	event.preventDefault()
	history.pushState(null, '', link)
	loadPage()
}
// reload page on popstate
window.onpopstate = (event) => {
	loadPage();
}



document.querySelectorAll(".pageLink").forEach(a => {
	a.addEventListener("click", evt => clickLink(evt, a.href))
})

//handle key navigation
window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }

  switch (event.key) {
    case "ArrowLeft":
      if (document.getElementById("prevPage").style.display != "none" && isKeyNavAllowed && event.repeat == false) {
		  document.getElementById("prevPage").dispatchEvent(new Event('click')); 
	  }
      break;
    case "ArrowRight":
      if (document.getElementById("nextPage").style.display != "none" && isKeyNavAllowed && event.repeat == false) {
		  document.getElementById("nextPage").dispatchEvent(new Event('click')); 
	  }
      break;
    default:
      return; // Quit when this doesn't handle the key event.
  }
  event.preventDefault();
}, true);