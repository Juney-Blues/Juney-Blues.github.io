//let the complete shitshow begin, i cannot code to save my life so this should be interesting
//remembering choices code by FLARE :D 
function setFlag(key, value) {
  let flags = JSON.parse(localStorage.getItem("flags")) ?? {}
  flags[key] = value
  localStorage.setItem("flags", JSON.stringify(flags))
}

let loadFlag = () => {
  let flags = JSON.parse(localStorage.getItem("flags")) ?? {}
  let values = Object.values(flags) ?? []
  //console.log(values)
  
  document.querySelectorAll(".flaggedPage").forEach(e => {
    let elementFlagList = e.dataset.flags.split(" ")
    let showElement = true
    
    // don't show if flag isnt in elementflagList
    elementFlagList.forEach(flag => {
      if (!values.includes(flag)) { showElement = false }
    })
    
    if (showElement) {
      e.style.display = "block"
    }
    
  })
}

//stolen code from Rarebit lmao
let currentPage = Number(findGetParameter("pg"));

nextPage = currentPage + 1;
prevPage = currentPage - 1;
//draw page image and additional html
document.getElementById("pagecontent").innerHTML = `<img class="pageimage" src="${pageList[currentPage].imgUrl}" /> ${pageList[currentPage].additionalHtml ? pageList[currentPage].additionalHtml : ""}`;


setPageLinks(currentPage);
document.querySelector(".nextpage").addEventListener("click", goToPage)
document.querySelector(".prevpage").addEventListener("click", goToPage)

document.documentElement.className = pageList[currentPage].theme
loadFlag();
function findGetParameter(parameterName) { //function used to write a parameter to append to the url, to give each comic page its own unique url
    let result = null,
    tmp = []; 
    let items = location.search.substr(1).split("&");
    for (let index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
}

//code suggestion by Saphire Lattice @magenta-luna on cohost

//add event listener to history.popstate to make the back and forward shit work

window.addEventListener("popstate", (event) => {
   document.location.reload()
});



/*	old janky button functions
function next()
{

	if (nextPage > pageList.length - 1){
		nextPage = currentPage;
	}
		
	window.location.href = `?pg=${nextPage}`;

}

function prev()
{

		if (prevPage < 0){
		prevPage = currentPage;
	}
	window.location.href = `?pg=${prevPage}`;
	
}
*/
function setPageLinks(pg) {
  let nextPage = document.querySelector(".nextpage")
  let prevPage = document.querySelector(".prevpage")

  nextPage.href = "?pg=" + (pg + 1)
  prevPage.href = "?pg=" + (pg - 1)

  if (pg - 1 < 0) { prevPage.style.display = "none" }
  else { prevPage.style.display = "unset" }

  if (pg + 1 >= pageList.length) { nextPage.style.display = "none" }
  else { nextPage.style.display = "unset" }
}

//set volumes to 0 so we can fade them in
backgroundAmbience1.volume = 0;
backgroundAmbience2.volume = 0;
//having 2 audio tracks so we can crossfade between them
let activeAmbient = backgroundAmbience1;
let activeMusic = backgroundMusic1;

let fadeTime = 1;
let fadeInVolume = 1;
//set music and ambience
function setPageSound(){
    //keep ambience and music looping between pages without getting interrupted
	if(pageList[currentPage].ambience != activeAmbient.src){
		//fade out current audio
		fadeAudioOut(activeAmbient,activeAmbient.volume);
		// switch audio element to avoid gap in audio
		activeAmbient = activeAmbient == backgroundAmbience2 ? backgroundAmbience1 : backgroundAmbience2;
		//keep current time between ambience sounds
		prevTime = activeAmbient.currentTime;
		activeAmbient.src = pageList[currentPage].ambience;
		activeAmbient.currentTime = prevTime;	
		//fade in current audio
		fadeAudioIn(activeAmbient,fadeInVolume);
  }
  if(pageList[currentPage].music != activeMusic.src){
		activeMusic.src = pageList[currentPage].music;
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
function preloadImage(url){
	let img = new Image();
	img.src = url;
}
function preloadSound(url){
	let aud = new Audio();
	aud.src = url;
}


function goToPage(event) {


  event.preventDefault()
  history.pushState(null, '', this.href); 

  let linkedPage = parseInt(this.href.split("=")[1])
  currentPage = linkedPage
  goToPage(linkedPage);
  // Set new links for page arrows
  setPageLinks(linkedPage)
  //clear image
  document.querySelector("#pagecontent img").src = ""
  // Set new image
  document.getElementById("pagecontent").innerHTML = `<img class="pageimage" src="${pageList[linkedPage].imgUrl}" /> ${pageList[linkedPage].additionalHtml ? pageList[linkedPage].additionalHtml : ""}`;
  //get new theme
  document.documentElement.className = pageList[currentPage].theme
  // Scroll Up 
  window.scrollTo(0, 0);
  //document.getElementById("pagecontent").scrollIntoView();
  //Load flags
  loadFlag();
  //preload next page's content
  //throws an error on the last page if i don't put it in its own if statement like this >:P
  if(currentPage < pageList.length - 1){
	preloadImage(pageList[currentPage + 1].imgUrl);
	preloadSound(pageList[currentPage + 1].ambience);
  }
  //set music and ambience
  setPageSound();
  
}
/*
function displayBranch(choiceID,branchID) {
	console.log(choiceID);
	console.log(branchID);
	choiceID.style.display = `none`;
	choiceID.style.opacity = `0`;
	branchID.style.display = `initial`;
	branchID.style.opacity = `1`;
	
	let childCount = branchID.children.length;
	for (let i = 1; i < childCount + 1; i++){
		console.log(document.querySelector(`${branchID} :nth-child(${i})`));
	}
}


function displayBranch (branchID) {
  // Hide the branch prompt
  //this.style.opacity = '0';
  //this.style.display = 'none';
  // Show the selected branch
  let branch = document.getElementById(branchID);
  branch.style.opacity = '1';
  branch.style.display = 'initial';
}
*/

//ty to my friend who wishes to remain uncredited for these <3
function displayBranch (prompt, branch) {
  // Hide the branch prompt
  prompt.parentElement.style.opacity = '0';
  prompt.parentElement.style.display = 'none';
  // Show the selected branch
  let branchPanels = document.getElementsByClassName(branch);
  for (let panel of branchPanels) {
	panel.classList.remove('display-none');
	//hacky stolen code to make animating with display: none work, don't ask
	setTimeout(function () {
      panel.classList.add('active');
    }, 20);
  }
}



function showAnimatedDissonanceLog(options) {
  const trigger = event.target;
  const dissonanceLog = event.target.parentElement;
  const dissonanceMessages = bubble.children.filter(element => element.matches(".message"));

  // Animate the bubble
  // The dissonance trigger should be inside the bubble element
  // Any css can just be in the css
  dissonanceLog.style.transform = options.scale;
  trigger.style.display = "none";

  // Animate the dissonance log
  for (message of dissonanceMessages) {
    setTimeout(function() {
      message.style.display = "inline";
    }, options.messageDelay);
  }
}

function revealHiddenElements(elementClass) {
    const trigger = event.target,
          targets = document.querySelectorAll(elementClass);

    trigger.data.visible = false;
    for (element of targets) {
        element.data.visible = true;
    }
}



//title header stuff

let pageTitleString = document.getElementById("pageTitle").textContent;
let tempString = "";
let newTitleString = "TRACHEOTOMY!!";

function eraseTitle() {
	pageTitleString = document.getElementById("pageTitle").textContent;
	tempString = pageTitleString;
	for (let i = 0; i < pageTitleString.length; i++)
	{
		eraseCharacter(i);
	}
}

function eraseCharacter(num) {
	
	setTimeout(function(){
		tempString = tempString.slice(0, -1);
		document.getElementById("pageTitle").textContent = tempString;
	}, 50 * num );

}

/////////////////////////////////

function writeTitle() {
	tempString = "";
	for (let i = 0; i < pageTitleString.length; i++)
	{
		writeCharacter(i);
	}
}

function writeCharacter(num) {
	
	setTimeout(function(){
		tempString += newTitleString.charAt(num);
		document.getElementById("pageTitle").textContent = tempString;
	}, 50 * num );

}


