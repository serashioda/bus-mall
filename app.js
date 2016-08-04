'use strict';

// GLOBAL DECLARATION
var imageArray = [];
var shownItems = [];
var clicks = 0;
var resultsButton = document.getElementById('results');
var imageArrayStringified;

// OBJECT DECLARATION
function CatalogItem(newImageName, newFilePath) {
//PROPERTIES
  this.imageName = newImageName;
  this.filePath = newFilePath;
  this.tallyclicked = 0;
  this.tallyDisplayed = 0;
//PUSH VALUE OF THIS IN
  imageArray.push(this);
}

//FUNCTION TO STORE ALL OBJECTS LOCALLY
function newObjects(){
new CatalogItem('Bag', 'images/bag.jpg'); //eslint-disable-line
new CatalogItem('Banana', 'images/banana.jpg');
new CatalogItem('Bathroom', 'images/bathroom.jpg');
new CatalogItem('Boots', 'images/boots.jpg');
new CatalogItem('Breakfast', 'images/breakfast.jpg');
new CatalogItem('Bubblegum', 'images/bubblegum.jpg');
new CatalogItem('Chair', 'images/chair.jpg');
new CatalogItem('Cthulhu', 'images/cthulhu.jpg');
new CatalogItem('DuckMuzzle', 'images/dog-duck.jpg');
new CatalogItem('Dragon', 'images/dragon.jpg');
new CatalogItem('Pen', 'images/pen.jpg');
new CatalogItem('PetSlippers', 'images/pet-sweep.jpg');
new CatalogItem('Scissors', 'images/scissors.jpg');
new CatalogItem('Shark', 'images/shark.jpg');
new CatalogItem('Sweep', 'images/sweep.jpg');
new CatalogItem('Tauntaun', 'images/tauntaun.jpg');
new CatalogItem('Unicorn', 'images/unicorn.jpg');
new CatalogItem('Usb', 'images/usb.jpg');
new CatalogItem('WateringCan', 'images/water-can.jpg');
new CatalogItem('WineGlass', 'images/wine-glass.jpg');
};

if (localStorage.imageArrayStringified) {
  console.log('Local Storage is being fed content');
  var localData= JSON.parse(localStorage.imageArrayStringified)
  imageArray = localData;

} else {
  console.log('Local Storage is hungry!');
  newObjects();
}

// DISPLAY 3 IMAGES- LEFT- CENTER- RIGHT
function getNewRandomImages() {
var randomValue = getRandomImage();
var leftImg = document.getElementById('left');
leftImg.src = randomValue.filePath;
leftImg.alt = randomValue.imageName;

randomValue = getRandomImage();
var centerImg = document.getElementById('center');
centerImg.src = randomValue.filePath;
centerImg.alt = randomValue.imageName;

randomValue = getRandomImage();
var rightImg = document.getElementById('right');
rightImg.src = randomValue.filePath;
rightImg.alt = randomValue.imageName;
}

//GET RANDOM ELEMENT & ENSURE NOT DUPE
function getRandomImage () {
  while (true){
    var randomValue = imageArray[Math.floor(Math.random() * imageArray.length)];
    if (shownItems.indexOf(randomValue.imageName) === -1){
      //IMAGE HAS NOT BEEN SHOWN
      shownItems.push(randomValue.imageName);
      if (shownItems.length > 6) {
        shownItems.shift();
      }
      randomValue.tallyDisplayed++;
      console.log(randomValue.tallyDisplayed);
      return randomValue;
    }
  }
}

//TALLY # TIMES CLICKED
function imageClicked(element) {
  console.log(element.target.alt);
  if (element.target.id === 'display') {
    alert('Click a picture silly.');
    return;
  }

  for (var i = 0; i < imageArray.length; i++) {
    if (imageArray[i].imageName === element.target.alt) {
      imageArray[i].tallyclicked++;
      clicks++;
    }
  }

  //SHOW RESULTS AFTER 25 ROUNDS
  if (clicks === 25) {
    displayImg.removeEventListener('click', imageClicked);
    resultsButton.hidden = false;
    return;
  } else {
    imageArrayStringified = JSON.stringify(imageArray);
    localStorage.setItem('imageArrayStringified', imageArrayStringified);
  };
  getNewRandomImages();
}

//SHOW RESULTS DATA IN CHART
function showResults() {
var labels = [];
var dataClicks = [];
var dataShown = [];

for (var i = 0; i < imageArray.length; i++) {
  labels.push(imageArray[i].imageName);
  dataClicks.push(imageArray[i].tallyclicked);
  dataShown.push(imageArray[i].tallyDisplayed);
}

  var ctx = document.getElementById("myChart");
  var myChart = new Chart(
    ctx,
    {
      type: 'bar',
      data:
      {
        labels: labels,
        datasets:
        [{
          label: 'Number of Clicks',
          data: dataClicks,
          backgroundColor: '#FF8821',
        },
        {
          label: 'Number of Times Shown',
          data: dataShown,
        }]
      },
      options: {
        responsive: false
      }
  });
}

//
getNewRandomImages();
var displayImg = document.getElementById('display');
displayImg.addEventListener('click', imageClicked);
resultsButton.addEventListener('click', showResults)
