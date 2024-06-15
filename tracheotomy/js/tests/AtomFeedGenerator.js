

/*
const groups = data.reduce((groups, game) => { // groups is the accumulator, game is the current value
  const date = game.time.split('T')[0]; // split the date from the time
  if (!groups[date]) { // if the groups object doesn't have a key with the date, create it
    groups[date] = []; // this is the same as groups[date] = groups[date] ?? [];
  }
  groups[date].push(game); // add the current value to the new object
  return groups;
}, {});
*/
var dateStringArray = [];

dateStringArray = dateStringArray.concat(pageList);

for(let i = 0; i < dateStringArray.length; i++)
{
	dateStringArray[i].dateWithoutTime = dateStringArray[i].date.toDateString();
}
 
datedArray = _.groupBy(dateStringArray, "dateWithoutTime"); //uses lodash
datedArray = Object.entries(datedArray);



function generateAtomEntry(entryNum)
{
    //console.log(entryNum);
	var entryLength = datedArray[entryNum][1].length;
	
	//console.log(entryLength);
		
		
	var FirstPageNum = datedArray[entryNum][1][0].pgNum;
	var LastPageNum = datedArray[entryNum][1][entryLength - 1].pgNum;
	
	//console.log(FirstPageNum, LastPageNum);
	
	var PageDate = datedArray[entryNum][1][0].date;
	var PageDateDate = new Date(PageDate);
	PageDateDate.setHours(PageDateDate.getHours() - 1);
	PageDate = PageDateDate.toISOString().split('.').shift() + 'Z';
	
	var FirstPageImage = datedArray[entryNum][1][0].imgUrl;
	if(FirstPageNum == LastPageNum){
		return(	
		`<entry>
	<title>Page ${FirstPageNum}</title>
	<link href="https://junebugjamboree.neocities.org/tracheotomy/?pg=${FirstPageNum}"/>
	<updated>${PageDate}</updated>
	<id>https://junebugjamboree.neocities.org/tracheotomy/?pg=${FirstPageNum}</id>
	<content type="html">
		&lt;a href="https://junebugjamboree.neocities.org/tracheotomy/?pg=${FirstPageNum}"&gt;&lt;img src="${FirstPageImage}" style="height: 500px;"/&gt;&lt;/a&gt; &lt;br&gt; 
	</content>
</entry>
`
		);
	}
	else{
		return(	
		`<entry>
	<title>Pages ${FirstPageNum}-${LastPageNum}</title>
	<link href="https://junebugjamboree.neocities.org/tracheotomy/?pg=${FirstPageNum}"/>
	<updated>${PageDate}</updated>
	<id>https://junebugjamboree.neocities.org/tracheotomy/?pg=${FirstPageNum}</id>
	<content type="html">
		&lt;a href="https://junebugjamboree.neocities.org/tracheotomy/?pg=${FirstPageNum}"&gt;&lt;img src="${FirstPageImage}" style="height: 500px;"/&gt;&lt;/a&gt; &lt;br&gt; 
	</content>
</entry>
`
		);
	}
}

function generateFeed(){
	
	var feedLength =  document.getElementById("lengthInput").valueAsNumber + 1; //for some reason you need to add 1 to the feed length to get the length you want???
	console.log(feedLength);
	var feedString = ``;
	
	for(let i = 1; i < feedLength; i++)
	{
		feedString += generateAtomEntry(datedArray.length - i);
	}
	//console.log(feedString);
	document.getElementById("feedbox").value = feedString
}
