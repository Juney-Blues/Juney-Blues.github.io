let currentArt = artList.length - 1
let currentBlog = blogList.length - 1

//update art preview
document.getElementById("artPreviewTitle").innerHTML = `<i>${artList[currentArt].title}</i>`;
document.getElementById("artPreviewImage").innerHTML = `<img class="art-gallery-image image-fit" src="${artList[currentArt].imgUrl}"/>`;

//update blog preview
  async function loadBlogPreview() {
	blogIndex = currentBlog
	const parser = new DOMParser();
	let blogHtml = await fetch(blogList[blogIndex].url).then(e => e.text())
	
	const doc = parser.parseFromString(blogHtml, "text/html");
	
	if (doc.getElementById("preview") != null){
			document.getElementById("blogPreview").innerHTML = doc.getElementById("preview").innerHTML + `<a href="/blog/">...</a>`; 
	}
	else{
		document.getElementById("blogPreview").innerHTML = blogHtml;
	}
  }
  
loadBlogPreview();