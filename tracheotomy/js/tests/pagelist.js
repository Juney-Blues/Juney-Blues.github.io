
var pageList = [
	{
		"pgNum": "1", 
		"imgUrl": "https://file.garden/Y5hdfT_qkQx7G08g/Tracheotomy/Tests/Choices/ChoicePageBase.png",
		"date":new Date("2023-05-23T20:00:50Z"),
		"theme":"city",
		"additionalHtml":`
			<div class="branch-prompt">
			<button class="branch-option dissonancebutton" onclick="displayBranch(this, 'branch-floor'); setFlag('floorOrVandalism', 'floor');" style="position:absolute; top:270px; left:570px; transform:translateX(-50%); z-index:6;">Lie On Floor</button>
			<button class="branch-option dissonancebutton" onclick="displayBranch(this, 'branch-vandalism'); setFlag('floorOrVandalism', 'vandalism');" style="position:absolute; top:284px; left:700px; transform:translateX(-50%); z-index:6;">Vandalism!!</button>
			</div>
			<div>
			<img class="pageimage display-none branch panel branch-floor" src="https://file.garden/Y5hdfT_qkQx7G08g/Tracheotomy/Tests/Choices/ChoicePanel1A.png" style="position:absolute; top:388px; left:64px; transition-delay:0s">
			<img class="pageimage display-none branch panel branch-floor" src="https://file.garden/Y5hdfT_qkQx7G08g/Tracheotomy/Tests/Choices/ChoicePanel2A.png" style="position:absolute; top:385px; left:422px; transition-delay:1s">
			<img class="pageimage display-none branch panel branch-floor" src="https://file.garden/Y5hdfT_qkQx7G08g/Tracheotomy/Tests/Choices/FinalPanelBubbleA.png" style="position:absolute; top:770px; left:400px; z-index:10; transition-delay:2.3s">
			</div>
			<div>
			<img class="pageimage display-none branch panel branch-vandalism" src="https://file.garden/Y5hdfT_qkQx7G08g/Tracheotomy/Tests/Choices/ChoicePanel1B.png" style="position:absolute; top:388px; left:64px; transition-delay:0s">
			<img class="pageimage display-none branch panel branch-vandalism" src="https://file.garden/Y5hdfT_qkQx7G08g/Tracheotomy/Tests/Choices/ChoicePanel2B.png" style="position:absolute; top:385px; left:422px; transition-delay:1s">
			<img class="pageimage display-none branch panel branch-vandalism" src="https://file.garden/Y5hdfT_qkQx7G08g/Tracheotomy/Tests/Choices/FinalPanelBubbleB.png" style="position:absolute; top:770px; left:400px; z-index:10; transition-delay:2.3s">
			</div>
			<div>
			<img class="pageimage display-none branch panel branch-vandalism branch-floor" src="https://file.garden/Y5hdfT_qkQx7G08g/Tracheotomy/Tests/Choices/FinalPanel.png" style="position:absolute; top:716px; left:58px; transition-delay:2s">
			</div>
			`,
	},
	{
		"pgNum": "2", 
		"imgUrl": "https://file.garden/Y5hdfT_qkQx7G08g/Tracheotomy/Tests/DialogueTrees/DIalogueTree.png",
		"date":new Date("2023-05-25T23:00:50Z"),
		"additionalHtml":`
			<div class="dissonancelog" style="z-index: 6; height: 480px; width: 266px; top:424px; left:490px;">
			<p class="message"><b class="yellow">Laikaboss7008:</b><br>so you're testing out dialogue trees, huh?<br>૮ o ﻌoა</p>
			<div class="branch-prompt">
				<p class="branch-option dialogue-choice" onclick="displayBranch(this, 'branch-yeah')">somethin like that!!</p>
				<p class="branch-option dialogue-choice" onclick="displayBranch(this, 'branch-nah')">actually i don't think this is a good idea...</p>
			</div>
			<div>
				<p class="display-none branch branch-yeah message" style="transition-delay:0s"><b class="teal">SpringInsect113:</b><br>somethin like that!!</p>
				<p class="display-none branch branch-yeah message" style="transition-delay:2s"><b class="teal">SpringInsect113:</b><br>seems to be workin well~</p>
				<p class="display-none branch branch-yeah message" style="transition-delay:4s"><b class="yellow">Laikaboss7008:</b><br>wanna put on a cool top hat to celebrate how well this works?</p>
				<div class="display-none branch-prompt branch branch-yeah message" style="transition-delay:5s">
					<p class="branch-option dialogue-choice" onclick="displayBranch(this, 'branch-yes-hat'); setFlag('hat', 'hat-true');">yeah that sounds awesome</p>
					<p class="branch-option dialogue-choice" onclick="displayBranch(this, 'branch-no-hat'); setFlag('hat', 'hat-false');">no thank you!</p>
				</div>
					<div>
						<p class="display-none branch branch-yes-hat message" style="transition-delay:0s"><b class="teal">SpringInsect113:</b><br>yeah that sounds awesome</p>
						<p class="display-none branch branch-yes-hat message" style="transition-delay:1s">i'm gonna do that</p>
						<p class="display-none branch branch-yes-hat message" style="transition-delay:2s">on the next page i think</p>
						<p class="display-none branch branch-yes-hat message" style="transition-delay:4s"><b class="yellow">Laikaboss7008:</b><br>sounds good~~~</p>
						<p class="display-none branch branch-yes-hat message" style="transition-delay:6s">MESSAGE END.</p>
					</div>
					<div>
						<p class="display-none branch branch-no-hat message" style="transition-delay:0s"><b class="teal">SpringInsect113:</b><br>no thank you!</p>
						<p class="display-none branch branch-no-hat message" style="transition-delay:2s"><b class="yellow">Laikaboss7008:</b><br>aw alright</p>
						<p class="display-none branch branch-no-hat message" style="transition-delay:4s">MESSAGE END.</p>
					</div>
			</div>
			<div>
			<p class="display-none message branch branch-nah" style="transition-delay:0s"><b class="teal">SpringInsect113:</b><br>actually i don't think this is a good idea...</p>
			<p class="display-none branch branch-nah message" style="transition-delay:2s"><b class="yellow">Laikaboss7008:</b><br>why not?</p>
			<p class="display-none branch branch-nah message" style="transition-delay:4s">it seems like it's workin good to me ૮   ˆﻌˆა</p>
			<p class="display-none branch branch-nah message" style="transition-delay:6s">MESSAGE END.</p>
			
			</div>
		`,
		"theme":"city",
	},
	{
		"pgNum": "3", 
		"imgUrl": "https://file.garden/Y5hdfT_qkQx7G08g/Tracheotomy/Tests/consequences/ConsequencesMain.png",
		"date":new Date("2023-05-23T21:00:50Z"),
		"additionalHtml":`
			
			<img class="pageimage flaggedPage display-none" data-flags="floor" src="https://file.garden/Y5hdfT_qkQx7G08g/Tracheotomy/Tests/consequences/ConsequencesFloor.png" style="position:absolute; top:85px; left:82px;">
			<img class="pageimage flaggedPage display-none" data-flags="floor hat-true" src="https://file.garden/Y5hdfT_qkQx7G08g/Tracheotomy/Tests/consequences/ConsequencesFloorHat.png" style="position:absolute; top:395px; left:347px;">
			<img class="pageimage flaggedPage display-none" data-flags="vandalism" src="https://file.garden/Y5hdfT_qkQx7G08g/Tracheotomy/Tests/consequences/ConsequencesArrested.png" style="position:absolute; top:82px; left:89px;">
			<img class="pageimage flaggedPage display-none" data-flags="vandalism hat-true" src="https://file.garden/Y5hdfT_qkQx7G08g/Tracheotomy/Tests/consequences/ConsequencesArrestedHat.png" style="position:absolute; top:530px; left:590px;">
			<img class="pageimage flaggedPage display-none" data-flags="hat-true" src="https://file.garden/Y5hdfT_qkQx7G08g/Tracheotomy/Tests/consequences/ConsequencesMainHat.png" style="position:absolute; top:126px; left:225px;">
		`,
		"theme":"city",
	},
		{
		"pgNum": "3", 
		"imgUrl": "https://file.garden/Y5hdfT_qkQx7G08g/Tracheotomy/Tests/Shirt/ShirtTest.png",
		"date":new Date("2023-06-08T02:08:50Z"),
		"additionalHtml":`
			<div style="border: 1px dotted white; position:absolute; top:232px; left:61px; width:90px; height:94px; z-index:8;"></div>
			<div style="border: 1px dotted white; position:absolute; top:232px; left:61px; width:90px; height:94px; z-index:8;"></div>
			<div style="border: 1px dotted white; position:absolute; top:232px; left:61px; width:90px; height:94px; z-index:8;"></div>
			<div style="border: 1px dotted white; position:absolute; top:232px; left:61px; width:90px; height:94px; z-index:8;"></div>
"
			<img class="pageimage" src="https://file.garden/Y5hdfT_qkQx7G08g/Tracheotomy/Tests/Shirt/Shirt-Icons.png" style="position:absolute; top:210px; left:60px;">
			<img class="pageimage" src="https://file.garden/Y5hdfT_qkQx7G08g/Tracheotomy/Tests/Shirt/April-Record.png" style="position:absolute; top:181px; left:434px;">
		`,
		"theme":"",
		"backgroundMusic":"file:///D:/Music/The%20Genesis%20Project/Youtube%20Rip/%EF%BC%9F%EF%BC%9F%EF%BC%9F%20-%20Menuing.mp3",
	},
]

//Some pages need dedicated functions because i'm a madwoman, so i'll toss them here because for some reason embedding <script> tags just doesn't wanna work
	function page34AnimateBubble(){
		document.querySelector(".bubble").style.animation = "1s cubic-bezier(.17,.84,.44,1) 0s 1 normal none running bubbleUpscale";
		document.querySelector(".bubble").style.transform = "translateY(0) scale(1,1)";
		document.querySelector(".dissonancebutton").remove();
		setTimeout(page34AnimateDissonance,1000);
	}
	function page34AnimateDissonance(){
		document.querySelector(".dissonancelog").style.opacity = 1;
		document.querySelector(".dissonancelog").style.pointerEvents = "auto";
		document.getElementById("message1").style.opacity = 1;
		document.getElementById("message1").style.animation = "1s steps(2, jump-none) messageAppear";
		document.getElementById("message2").style.opacity = 1;
		document.getElementById("message2").style.animation = "3.5s steps(2, jump-none) messageAppear";
		document.getElementById("message3").style.opacity = 1;
		document.getElementById("message3").style.animation = "6s steps(2, jump-none) messageAppear";
		document.getElementById("message4").style.opacity = 1;
		document.getElementById("message4").style.animation = "8s steps(2, jump-none) messageAppear";
		document.getElementById("message5").style.opacity = 1;
		document.getElementById("message5").style.animation = "10s steps(2, jump-none) messageAppear";
		document.getElementById("message6").style.opacity = 1;
		document.getElementById("message6").style.animation = "12s steps(2, jump-none) messageAppear";
	};
const archiveList = [

	{
		"title": "Archive Added!",
		"url":"/tracheotomy/archive/",
		"date":new Date("2022-10-13"),
	},
	{
		"title": "Mirrored on Neocities!",
		"url":"/tracheotomyOld/",
		"date":new Date("2022-12-03T13:00:00Z"),
	},
	{
		"title": "Javascript Overhaul!",
		"url":"/tracheotomy/",
		"date":new Date("2022-12-18"),
	},
]

