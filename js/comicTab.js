var comicTabs = [
	{
		"title": `WATCH AS I PERFORM MY OWN TRACHEOTOMY (Working Title)`,
		"description":`
		<p>originally hosted on <a href="https://juney-blues.tumblr.com/tracheotomy">TUMBLR</a></p>
		<p>A girl dissociates in her apartment and has a generally normal time</p>
		<p><b id="tracheotomyLength"></b> pages and counting!</p>
		<p><a href="trach2omy">READ IT HERE.</a>`,
	},
	{
		"title": "Placeholder!",
		"description":`
		<p>I'll put something cool here later!</p>
		<p>I swear!</p>`,
	},
	{
		"title": "Placeholder2!",
		"description":`<p>blugh!</p>`,
	},
]



let currentComicTab = 0;


goToTab(0);


function goToTab(tabIndex) {
  currentComicTab = tabIndex;

  document.getElementById("comicTitle").innerHTML = `${comicTabs[currentComicTab].title}`;
  document.getElementById("comicDescription").innerHTML = `${comicTabs[currentComicTab].description}`;
  /*tracheotomy length*/
  if (document.getElementById("tracheotomyLength")) {
  document.getElementById("tracheotomyLength").innerHTML = pageList.length - 1;
  } 
  
    // VRiska virksa virksa
	comicarr = document.querySelectorAll(".comictab")
	for (let i = 0; i < comicarr.length; i++) {
    comicarr[i].className = "comictab low"
	}
	if (comicarr[tabIndex + 1]) comicarr[tabIndex + 1].className = "comictab medium"
	if (comicarr[tabIndex - 1]) comicarr[tabIndex - 1].className = "comictab medium"
	comicarr[tabIndex].className = "comictab high"
}
