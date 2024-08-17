
let currentArt = artList.length - 1

artList.sort((a,b) => a.date > b.date);

document.getElementById("imagecontent").innerHTML = `<img class="art-gallery-image image-fit" src="${artList[currentArt].imgUrl}"/>`;
document.getElementById("imagedate").innerHTML = `${artList[currentArt].date.toLocaleDateString()}`;
document.getElementById("imagedescription").innerHTML = `${artList[currentArt].description}`;
document.getElementById("imagetitle").innerHTML = `${artList[currentArt].title}`;

//display image
function setGalleryImage(artNumber) {
	/*console.log(artNumber);*/
	currentArt = artNumber;
	document.getElementById("imagetitle").innerHTML = `${artList[currentArt].title}`;
	document.getElementById("imagecontent").innerHTML = `<img class="art-gallery-image image-fit" src="${artList[currentArt].imgUrl}"/>`;
	document.getElementById("imagedate").innerHTML = `${artList[currentArt].date.toLocaleDateString()}`;
	document.getElementById("imagedescription").innerHTML = `${artList[currentArt].description}`;
}


//populate gallery
let galleryString = ""
artList.forEach(item => {
    let date = item.date.toLocaleDateString()
    let imageUrl = item.imgUrl;
	let imageNum = artList.indexOf(item);
    let title = item.title;
	let category = item.category;
	
	if (document.getElementById(category) == null){
		document.querySelector(".gallery-container").insertAdjacentHTML("afterbegin", `<details id="${category}"><summary>${category}</summary></details>`) ;
	}
	
    document.getElementById(category).insertAdjacentHTML("afterbegin",`<img loading="lazy" class="gallery-thumbnail" src=${imageUrl}-thumb.jpg onclick="setGalleryImage(${imageNum});">`);
})
//document.querySelector(".gallery-container").innerHTML = galleryString; 