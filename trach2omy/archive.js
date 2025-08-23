//blame june for this mess

// let comicObject
fetch('../tracheotomyComic.json').then((response) => response.json()).then((json) => initArchive(json));

const initArchive = json => {
	// comicObject = json
	loadArchive(json)
}

const loadArchive = comicObject => {

	// Create pages
	let chapterList = comicObject.chapters
	let pageList = comicObject.pages

	let chapterHtml = ""
	let currentPage = 0

	chapterList.forEach((chapter, i) => {
		
		let pageListHtml = ""
		let startDate = new Date(pageList[currentPage].date).toLocaleDateString()

		while (currentPage < Math.min(chapter.endPage + 1, pageList.length)) {
			page = pageList[currentPage]
			pageDate = new Date(page.date).toLocaleDateString()
			pageTitle = page.title ?? "Page " + currentPage
			pageListHtml = `<li><b>${pageDate}</b> - <a href="../?pg=${currentPage}">${pageTitle}</a></li>` + pageListHtml

			currentPage += 1
		}

		let endDate = currentPage == pageList.length ? "Present" : new Date(pageList[currentPage - 1].date).toLocaleDateString()

		chapterHtml = `
		<details class="archive-chapter" open>
			<summary class="archive-header collapsible" id="chapter${i}">
				<B>${chapter.title1}</B>
				<br>${chapter.title2}<br>
				<i>${startDate} - ${endDate}</i>
			</summary>
			<ul id="list${i}">${pageListHtml}</ul>
		</details>
		` + chapterHtml
		
	});

	// Add pages
	document.getElementById("pageLog").innerHTML = chapterHtml

	// Add Archive Pages
	let archiveLogHtml = ""

	comicObject.archive.forEach(archive => {
		let date = new Date(archive.date).toLocaleDateString()
		archiveLogHtml += `<li><b>${date}</b> - <a href="${archive.url}">${archive.title}</a></li>`
	})

	document.getElementById("archiveLog").innerHTML = `
	<details class="archive-chapter bonus" open>
		<summary class="archive-header collapsible" id="archiveChapter">
			<B>News, etc.</B>
			<br>Etcetera and etcetera and etcetera...<br>
		</summary>
		<ul id="archivePageList">${archiveLogHtml}</ul>
	</details>
	`
}

const loadArchiveOld = async () => {
	//constants, sorted by date
	const pageList = comicObject.pages //.sort((a,b) => a.date > b.date)
	const archiveList = comicObject.archive //.sort((a,b) => a.date > b.date)
	const chapterList = comicObject.chapters


	//combine list (keeping track of the proper index for each page so it doesn't get messed up by sorting)
	//==============================================================================
	for (let i = 0; i < pageList.length; i++) {
		pageList[i].pgNum = i;
	}
	const combinedList = pageList.concat(archiveList).sort((a, b) => a.date > b.date)
	//==============================================================================
	//add chapters to webpage 
	//==========================================================================================================
	for (let i = 0; i < chapterList.length; i++) {
		let chapter = chapterList[i]
		let nextChapter = chapterList[i + 1]
		//get last page, this is a little messier than i'd like, feel free to clean it up if you want
		//=======================================
		if (i < chapterList.length - 1) {
			lastPage = nextChapter.firstPage - 1;
		} else {
			lastPage = combinedList.length - 1;
		}
		//=======================================
		//get dates
		let chapterDateStart = new Date(combinedList[chapter.firstPage].date).toLocaleDateString()
		let chapterDateEnd = new Date(combinedList[lastPage].date).toLocaleDateString()

		document.querySelector("#archiveContainer").insertAdjacentHTML("afterbegin", `
		<details class="archive-chapter">
			<summary class="archive-header collapsible" id="chapter${i}">
				<B>${chapter.title1}</B><br>${chapter.title2}<br><i>${chapterDateStart} - ${chapterDateEnd}</i>
			</summary>
			<ul id="list${i}"></ul>
		</details>
		`)
	}
	//==========================================================================================================
	//add pages/archive entries to chapters
	//==============================================================================================================================================================
	for (let i = 0; i < combinedList.length; i++) {
		let item = combinedList[i]

		let itemDate = new Date(item.date).toLocaleDateString()
		let itemTitle = item.title ? item.title : item.pgNum ? `Page ${item.pgNum}` : "Update" //flare wrote this line and it is dark javascript magic as far is i'm concerned - june
		let itemLink = item.url ? item.url : item.pgNum ? `../?pg=${item.pgNum}` : " "

		let itemChapter = chapterList.findLastIndex(x => x.firstPage <= i)

		document.querySelector(`#list${itemChapter}`).insertAdjacentHTML("afterbegin", `<li><b>${itemDate}</b> - <a href="${itemLink}">${itemTitle}</a></li>`)
	}
	//==============================================================================================================================================================


	//make most recent chapter open by default
	document.getElementsByTagName("details")[0].setAttribute("open", "");
}