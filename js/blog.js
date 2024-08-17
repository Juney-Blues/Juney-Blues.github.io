let currentBlog = blogList.length - 1

blogList.sort((a,b) => a.date > b.date);

//code from flare, originally for tracheotomy
const getUrlPage = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const p = urlParams.get("p")
  return p ? p : currentBlog;
}

  // Load page
  async function loadBlog() {
	blogIndex = parseInt(getUrlPage())
    let blogHtml = await fetch(blogList[blogIndex].url).then(e => e.text())
    document.getElementById("blog-box").innerHTML = blogHtml 
	
	window.scrollTo(0, 0);
  }
  
  //populate blog archive

	blogList.forEach(item => {
    let date = item.date.toLocaleDateString();
	let blogNum = blogList.indexOf(item);
    let title = item.title;	
    document.getElementById("blog-archive").insertAdjacentHTML("afterbegin",`<li><a class="pageLink" href="?p=${blogNum}">${title}</a><br>${date}</li>`);
	})

  
// Handle click events
const clickLink = (event, link) => {
  event.preventDefault()
  history.pushState(null, '', link)
  loadBlog()
}

document.querySelectorAll(".pageLink").forEach(a => { a.addEventListener("click", evt => clickLink(evt, a.href)) })

loadBlog();