/*********************** get images and intilizing *********************/

// get images:

let leftImage = document.getElementById('left');
let midImage = document.getElementById('mid');
let rightImage = document.getElementById('right');

// initilize counters:

let counts = 0;
let maxCount = 5; // change it to 25

let leftIndex;
let midIndex;
let rightIndex;


/******************** template *********************/

function Products(name,path){

  this.name = name;
  this.path = path;
  this.timesShown = 0;
  this.click = 0;

  Products.items.push(this);  // to push each instance object here 
}

Products.items = []; // to have all instances in array 

/******************** Instances *********************/

new Products('bag','../img/bag.jpg');
new Products('banana','../img/banana.jpg');
new Products('bathroom','../img/bathroom.jpg');
new Products('boots','../img/boots.jpg');
new Products('breakfast','../img/breakfast.jpg');
new Products('bubblegum','../img/bubblegum.jpg');
new Products('chair','../img/chair.jpg');
new Products('cthulhu','../img/cthulhu.jpg');
new Products('dog-duck','../img/dog-duck.jpg');
new Products('dragon','../img/dragon.jpg');
new Products('pen','../img/pen.jpg');
new Products('pet-sweep','../img/pet-sweep.jpg');
new Products('scissors','../img/scissors.jpg');
new Products('shark','../img/shark.jpg');
new Products('sweep','../img/sweep.png');
new Products('tauntaun','../img/tauntaun.jpg');
new Products('unicorn','../img/unicorn.jpg');
new Products('usb','../img/usb.gif');
new Products('water-can','../img/water-can.jpg');
new Products('wine-glass','../img/wine-glass.jpg');


/********************* functions *******************************/

// generate random index according to the instances number:

function randomIndex(){
  return Math.floor(Math.random() * Products.items.length);
};

// render 3 images:

function RenderImages(){

  // give random number to each index
  leftIndex = randomIndex();
  midIndex = randomIndex();
  rightIndex = randomIndex();

  // prevent duplicate photos
  while(leftIndex === midIndex || leftIndex === rightIndex || midIndex === rightIndex){
    leftIndex = randomIndex();
    midIndex = randomIndex();
    rightIndex = randomIndex();
  }



};
RenderImages();



