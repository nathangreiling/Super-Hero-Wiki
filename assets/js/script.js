/* ------------------------------- */
/* Project  : Super Hero Wiki      */
/* File     : script.js            */
/* Authors  : Ballard Ingram  (BI) */
/*          : Stephen Fike    (SF) */
/*          : Nathan Greiling (NG) */
/*          : Matthew Berti   (MB) */
/*          : Kevin Heaton    (KH) */
/*          : Vicente Garcia  (VG) */
/* Created  : 03/17/2022           */
/* Modified : 03/22/2022           */
/* ------------------------------- */
var characterNameInputEl = $("#characterNameInput");
var characterFormEl = $("#character-form"); // updated to match new html format - SF
var characterSelectEl = $(".characters");
var bioSelectEl = $(".description");
// Function to take form input and pass onto Marvel Api
var formSubmitHandler = function (event) {
  event.preventDefault();
  // get value from input element
  var characterName = characterNameInputEl.val().trim();

  if (characterName) {
    getMarvelApiData(characterName);
    characterNameInputEl.val("");
  } else {
    alert("Please enter a valid character name");
  }
};

var getMarvelApiData = function (character) {
  // format marvel api url
  var apiUrl =
    "https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=" +
    character +
    "&apikey=8aa203e41460eb91a6faf2e98ab88784";
  // make request to url
  fetch(apiUrl).then(function (response) {
    // successful response
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        // Display characters - SF
        displayMarvelApi(data);
        // Displays descriptions - NG
        displayMarvelHeroDesc(data);
      });
    } else {
      alert("Character not found");
    }
  });
  console.log(character);
};

// Function to display characters from Marvel Api - SF
var displayMarvelApi = function (character) {
  characterSelectEl.empty();
  // loop through characters array
  for (var i = 0; i < character.data.results.length; i++) {
    // create character container
    var characterContainerEl = document.createElement("div");
    characterContainerEl.classList = "characterContainer";
    // format name
    var name = character.data.results[i].name;
    // format description
    var description = character.data.results[i].description;
    // span element for character info
    var infoEl = document.createElement("card");
    
    var lineBreak = document.createElement("br");

    if(character.data.results[i].description === "") {
      infoEl.innerHTML = name + ": " + "No desctiption";
    } else {
      infoEl.innerHTML = name + ": " + description;
    }

    // appened to container
    characterContainerEl.appendChild(infoEl);
    // append to DOM
    characterSelectEl.append(characterContainerEl);
    characterSelectEl.append(lineBreak);
  }
};

// function displaying a description of the character from the Marvel API - NG
var displayMarvelHeroDesc = function (bio) {
  // loop through array of descriptions
  for (var i = 0; i < bio.data.results.length; i++) {
    // creates the description container
    var bioContainerEl = document.createElement("div");
    bioContainerEl.classList = "descriptionContainer";
    // holds desired result from API 
    var description = bio.data.results[i].description;
    // creates span element and sets the content as the description
    var descriptionEl = document.createElement("span");
    descriptionEl.textContent = description;
    // appeneds the span element to the created div
    bioContainerEl.appendChild(descriptionEl);
    // appends the div to the specified element in the HTML
    bioSelectEl.append(bioContainerEl);
  }
};


// Change to id character-form - VG
$("#character-form").on("submit", formSubmitHandler);
