'use strict';

// GLOBAL DECLARATION
var imageArray = [];
var shownItems = [];

// OBJECT
function CatalogItem(imageName, filePath) {
  this.imageName = imageName;
  this.filePath = filePath;
  this.tallyclicked = 0;
  this.tallyDisplayed = 0;

  imageArray.push(this);
}

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


// function ___ (newCatalogItem){
function getNewRandomImages() {
var randomValue = getRandomImage();
var leftImg = document.getElementById('left');
leftImg.src = randomValue.filePath;
leftImg.alt = randomValue.imageName;
leftImg.addEventListener('click', imageClicked);

randomValue = getRandomImage();
var centerImg = document.getElementById('center');
centerImg.src = randomValue.filePath;
centerImg.alt = randomValue.imageName;
centerImg.addEventListener('click', imageClicked);

randomValue = getRandomImage();
var rightImg = document.getElementById('right');
rightImg.src = randomValue.filePath;
rightImg.alt = randomValue.imageName;
rightImg.addEventListener('click', imageClicked);
}

//GET RANDOM ELEMENT & ENSURE NOT DUPE
function getRandomImage () {
  while (true){
    var randomValue = imageArray[Math.floor(Math.random() * imageArray.length)];
    if (shownItems.indexOf(randomValue.imageName) === -1){
      //IMAGE HAS NOT BEEN SHOWN
      shownItems.push(randomValue.imageName);
      if (shownItems.length > 6) {
        shownItems.pop();
      }
      randomValue.tallyDisplayed++;
      console.log(randomValue.tallyDisplayed);
      return randomValue;

    }
  }
}

function imageClicked(element) {
  console.log(element.target.alt);

  for (var i = 0; i < imageArray.length; i++) {
    if (imageArray[i].imageName === element.target.alt) {
      imageArray[i].tallyclicked++;
    }
  }
  getNewRandomImages();
}
getNewRandomImages();
