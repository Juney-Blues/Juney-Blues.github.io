function selectChoice(choice, branch, persistent=false) {
  // When the user interacts with a choice dialogue,
  // hide the dialogue and reveal the selected branch
  
  // Select all elements on the page with a matching class
  // This is in the format of `choice-branch`
  let branchPanels = document.querySelectorAll(`.choice-${branch}`);

  // Iterate through each element that matches and reveal it
  branchPanels.forEach((panel) => {
    panel.style.display = "";
    panel.style.opacity = "";
  });

  // If the choice is persistent, save to local storage
  if (persistent) {
    saveChoice(choice, branch);
  }
}

function saveChoice(choice, branch) {
  // Store choices in local storage as a JSON object
  // When saving a new choice, parse the value to an object
  // then parse the object back to a string to save
  let savedChoices = JSON.parse(localStorage.getItem("choices"));
  savedChoices[choice] = branch;
  localStorage.setItem("choices", JSON.stringify(savedChoices));
}

function getChoice(choice) {
  // Store choices in local storage as a JSON object
  // When retrieving a choice, parse the value to an object
  // then return the value for the "choice" key
  let selectedBranch = JSON.parse(localStorage.getItem("choices"))[choice];

  // Select all elements on the page with a matching class
  // This is in the format of `choice-branch`
  let branchPanels = document.querySelectorAll(`.choice-${selectedBranch}`);

  // Iterate through each element that matches and reveal it
  branchPanels.forEach((panel) => {
    panel.style.display = "";
    panel.style.opacity = "";
  });
}