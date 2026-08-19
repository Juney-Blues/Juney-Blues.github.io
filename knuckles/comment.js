
const commentDiv = document.getElementById("comments");
const commentBox = document.getElementById("commentInput");
let commentHTML = "";
let usernameText = "";
let OffsetX = 0;
let OffsetY = 0;


const randomText = [
	"mastrGuardian1993",
	"xxXnever-chuckleXxx",
	"divorce",
	"redfuck",
	"Kay-Knocks",
	"FistingChampion",
	"ilikegrapes",
	"unknown_from_Me",
	"Knuckles The Echidna",
	"guest",
	"get_red_spheres",
	"Fist-Metal-Crackem",
	"RedSonic",
	"SHUT_UP",
];

const addComment = () =>{
	offsetX = Math.floor(4*Math.random()) * 64;
	offsetY = Math.floor(4*Math.random()) * 64;
	
	usernameText = randomText[Math.floor(randomText.length*Math.random())];

	commentHTML = `
			<div class="pfpContainer">
				<p class="username">${usernameText}</p>
				<div class="commentPfp" style="background-position-x:${offsetX}px; background-position-y:${offsetY}px;"></div>
			</div>
			<p class="commentText">knuckles.</p>
	`;
	commentNode = document.createElement("div");
	commentNode.className = "comment";
	commentNode.innerHTML = commentHTML;
	commentDiv.prepend(commentNode);
	
	commentBox.value= "";
}

document.querySelector("textarea").addEventListener("keydown", function (event) {

  if (event.key == "Enter") {
	  addComment();
  }

}, true);