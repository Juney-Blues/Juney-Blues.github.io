
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
  console.log(pageIndex)
  const page = comicObject.pages[pageIndex]
  const comicLength = comicObject.pages.length

  // LOAD PAGE
  if ("custom" in page) {
    // Load custom page
    const pageHtml = await fetch(`./customPages/${pageIndex}.html`).then(e => e.text())
    document.getElementById("pageContent").innerHTML = pageHtml 
  } else {
    // Load basic page
    let img = document.createElement("img")
    img.src = comicObject.linkPrefix + page.img
    document.getElementById("pageContent").innerHTML = ""
    document.getElementById("pageContent").append(img)
  }

  // Set Theme
  document.body.className = page.theme ?? ""

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

  // Scroll to top
  window.scrollTo(0, 0);
}

// Handle click events
const clickLink = (event, link) => {
  console.log(link)
  event.preventDefault()
  history.pushState(null, '', link)
  loadPage()
}

document.querySelectorAll(".pageLink").forEach(a => { a.addEventListener("click", evt => clickLink(evt, a.href)) })