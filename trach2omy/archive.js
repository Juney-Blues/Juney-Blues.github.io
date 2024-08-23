//blame june for this mess

let comicObject
fetch('../tracheotomyComic.json').then((response) => response.json()).then((json) => initArchive(json));

const initArchive = json => {
	comicObject = json
	loadArchive()
}

const loadArchive = async () => {
	//constants, sorted by date
	const pageList    = comicObject.pages.sort((a,b) => a.date > b.date)
	const archiveList = comicObject.archive.sort((a,b) => a.date > b.date)
	const chapterList = comicObject.chapters
	
	//variables i'm not defining yet
	let archiveString,chapterDateStart,chapterDateEnd = " "

	//add chapters to webpage 
	//==========================================================================================================
	for (let i = 0; i < chapterList.length; i++) {
		let chapter = chapterList[i]
			
		document.querySelector("#main").insertAdjacentHTML("afterbegin",`
		<details class="archivecontainer">
			<summary class="archive-header collapsible" id="chapter${i}">
				<B>${chapter.title1}</B><br>${chapter.title2}<br><i>${chapterDateStart} - ${chapterDateEnd}</i>
			</summary>
			<ul id="list${i}"></ul>
		</details>
		`)	
	}
	//==========================================================================================================
	//add pages to chapters
	//==============================================================================================================================================================
	for (let i = 0; i < pageList.length; i++) {
		let page = pageList[i]
		
		let pageDate = new Date(page.date).toLocaleDateString();
		let pageTitle = page.title ? page.title : i ? `Page ${i}` : "Update" //flare wrote this line and it is dark javascript magic as far is i'm concerned - june
		let pageLink = `../?pg=${i}`
		
		let pageChapter = chapterList.findIndex(x => x.firstPage <= i); //...almost works, but not quite
		console.log(pageChapter)
		
		document.querySelector(`#list${pageChapter}`).insertAdjacentHTML("afterbegin", `<li><b>${pageDate}</b> - <a href="${pageLink}">${pageTitle}</a></li>`)
	}
	//==============================================================================================================================================================
	
	//make most recent chapter open by default
	document.getElementsByTagName("details")[0].setAttribute("open","");
}

