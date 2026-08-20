//global variables
var isKeyNavAllowed = true;
let chapter;
// LOAD COMIC OBJECT

var currentComic = 0;
var comicLength = 1;
const subPage = "/knuckles"

const comicList = [
	{
		"title": "Knuckles and Friends go to Hell",
		"imgprefix": "./knuckles/",
		"length": 11
	},
	{
		"title": "Knuckles and Friends go to Hell SPECIAL",
		"imgprefix": "./SPECIAL/",
		"length": 14
	}
]

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

var comicSelector = document.getElementById("comicSelect");

function changeComicValue() {
   currentComic = comicSelector.value;
   loadPage();
}
comicSelector.onchange = changeComicValue;


const getUrlPage = () => {
	const urlParams = new URLSearchParams(window.location.search);
	const p = urlParams.get("pg")
	return p ? p : "0"
}

const getUrlComic = () => {
	const urlParams = new URLSearchParams(window.location.search);
	const c = urlParams.get("c")
	return c ? c : "0"
}

var currentComic = parseInt(getUrlComic());

//all this code was by flare for tracheotomy, i have repurposed it because i am lazy! ty flare <3
//i did fuck around with some things though. so if anything looks stupid that's why ^_^;
const loadPage = async () => {
	const pageIndex = parseInt(getUrlPage())
	
	comicLength = comicList[currentComic].length 
	
	// LOAD PAGE
		// Load basic page
		let img = document.createElement("img")
		img.src = comicList[currentComic].imgprefix + pageIndex + ".png"
		document.getElementById("pageContent").innerHTML = ""
		document.getElementById("pageContent").append(img)

	// Set next and prev
	const firstPage  = document.getElementById("firstPage")
	const nextPage 	 = document.getElementById("nextPage")
	const prevPage 	 = document.getElementById("prevPage")
	const lastPage   = document.getElementById("lastPage")
	const randomPage = document.getElementById("randomPage")

	firstPage.href  = subPage + "/?c=" + currentComic + "&pg=" + "0"
	nextPage.href   = subPage + "/?c=" + currentComic + "&pg=" + (pageIndex + 1)
	prevPage.href   = subPage + "/?c=" + currentComic + "&pg=" + (pageIndex - 1)
	lastPage.href   = subPage + "/?c=" + currentComic + "&pg=" + comicLength
	randomPage.href = subPage + "/?c=" + currentComic + "&pg=" + getRandomInt(comicLength)
	
	nextPage.style.display = pageIndex > comicLength - 1 ? "none" : "inline-block"
	lastPage.style.display = pageIndex > comicLength - 1 ? "none" : "inline-block"
	
	prevPage.style.display = pageIndex < 1 ? "none" : "inline-block"
	firstPage.style.display = pageIndex < 1 ? "none" : "inline-block"
	
	// Preload next pages
	if (pageIndex < comicLength - 2) {
		document.getElementById("preloadNext").src = "./knuckles/" + (pageIndex+1) + ".png"
	}
	if (pageIndex > 1) {
		document.getElementById("preloadPrev").src = "./knuckles/" + (pageIndex-1) + ".png"
	}

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

loadPage();