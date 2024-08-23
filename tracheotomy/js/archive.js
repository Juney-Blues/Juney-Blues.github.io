
let combinedlist = pageList.concat(archiveList)
var chapters = [];
combinedlist.sort((a,b) => a.date > b.date)
//combinedlist.reverse()
//console.log(combinedlist)

//split by chapter
for (let i = 0; i < chapterList.length; i++) {
	//console.log(chapterList[i].firstPage);
	//console.log(combinedlist.slice(chapterList[i].firstPage));
	//console.log(combinedlist.indexOf(combinedlist.filter(x => x.pgNum == chapterList[i].firstPage)[0]));
	//chapters[i] = combinedlist.slice((combinedlist.indexOf(combinedlist.filter(x => x.pgNum == chapterList[i].firstPage)[0])));
	//let tempArray = combinedlist.slice((combinedlist.indexOf(combinedlist.filter(x => x.pgNum == chapterList[i].firstPage)[0])), (combinedlist.indexOf(combinedlist.filter(x => x.pgNum == chapterList[i + 1].firstPage)[0])));

	let firstPageOfChapter = combinedlist.indexOf(combinedlist.filter(x => x.pgNum == chapterList[i].firstPage)[0])
	let lastPageOfChapter = chapterList[i + 1] ? combinedlist.indexOf(combinedlist.filter(x => x.pgNum == chapterList[i + 1].firstPage)[0]) : -1
	let tempArray = chapterList[i + 1] ? combinedlist.slice(firstPageOfChapter, lastPageOfChapter) : combinedlist.slice(firstPageOfChapter)
	tempArray.reverse();
	chapters[i] = tempArray;

} 

for (let i = 0; i < chapterList.length; i++) {
	
	document.querySelector(".comicbackground").insertAdjacentHTML("afterbegin", `<div class="archivecontainer" id="chapter${i}"></div>`)
		
}
//if you are looking through this for code reference, please for the love of good look elsewhere i have no clue what i'm doing <3
for (let i = 0; i < chapterList.length; i++) {
		let archiveString = ""
		chapters[i].forEach(item => {
		let date = item.date.toLocaleDateString()
		let link = item.url ? item.url : item.pgNum ? "../?pg=" + item.pgNum : ""
		let title = item.title ? item.title : item.pgNum ? "Page " + item.pgNum : "Update"
		archiveString += `<li><b>${date}</b> - <a href="${link}">${title}</a></li>`
	})
	
		let chapterLastPage = chapters[i].length - 1;
	
	let chapterTitle1 = chapterList[i].title1;
	let chapterTitle2 = chapterList[i].title2;
	let chapterDateEnd = chapters[i][0].date.toLocaleDateString();
	let chapterDateStart = chapters[i][chapterLastPage].date.toLocaleDateString();

	console.log(chapterDateStart);
	//let chapterDateEnd = chapters[i][-1].date;
	document.querySelector("#chapter"+i).innerHTML += `<details><summary class="archive-header collapsible"><B>`+ chapterTitle1 + `</B><br>`+ chapterTitle2 + `<br><i>` + chapterDateStart + ` - ` + chapterDateEnd + `</i></summary>` +
		"<ul>" + archiveString + "</ul><p></details>";	
}

//make most recent chapter open by default
 document.getElementsByTagName("details")[0].setAttribute("open","");

//original archive code by flare for reference
/*
	let archiveString = ""
	combinedlist.forEach(item => {
		let date = item.date.toLocaleDateString()
		let link = item.url ? item.url : item.pgNum ? "../?pg=" + item.pgNum : ""
		let title = item.title ? item.title : item.pgNum ? "Page " + item.pgNum : "Update"
		archiveString += `<li><b>${date}</b> - <a href="${link}">${title}</a></li>`
	})
	document.querySelector(".archivecontainer").innerHTML += `<details><summary class="archive-header collapsible"><B>TRACHEOTOMY.1</B><br>Watch As I Perform My Own Tracheotomy (working title)<br><i>08/10/2022 - 10/09/2023</i></summary>` +
		"<ul>" + archiveString + "</ul><p></details>";
*/

/*Wonderful code by FlaringK but unfortunately it kinda relied on both arrays being sorted by date in the first place, which they can't be for page order reasons. whoops
let pageListClone = pageList
let archiveListClone = archiveList
let totalcount = pageList.length + archiveList.length
for (let i = 0; i < totalcount ; i++) {
  let page = pageListClone[0]
  let archive = archiveListClone[0]

  console.log(page, archive)

  if(!page) {
    orderedList.push(archiveListClone.shift())
    continue
  }

  if(!archive) {
    orderedList.push(pageListClone.shift())
    continue
  }

  console.log("vriska", page.date > archive.date)

  if(page.date < archive.date) {
    orderedList.push(pageListClone.shift())
  } else {
    orderedList.push(archiveListClone.shift())
  }
}

console.log(orderedList)
*/




