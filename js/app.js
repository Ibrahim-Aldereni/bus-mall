/*********************** get images and intilizing *********************/

// get images:

let leftImage = document.getElementById('left');
let midImage = document.getElementById('mid');
let rightImage = document.getElementById('right');
let container = document.getElementById('images');
let button = document.getElementById('btn1');
button.style.display = 'none';  // hide results button till max count reached 


// initilize counters:

let count = 0;
let maxCount = 25;

let leftIndex =0;
let midIndex = 0;
let rightIndex= 0;

let Values = []; // for how many times images shown


/******************** template *********************/

function Products(name,path){

  this.name = name;
  this.path = path;
  this.timesShown = 0;
  this.vote = 0;

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
  };

  // set source attribute for the images:
  leftImage.src = Products.items[leftIndex].path;
  rightImage.src = Products.items[rightIndex].path;
  midImage.src = Products.items[midIndex].path;

  // to find how many times photos show
  Values.push(leftIndex,midIndex,rightIndex);

};
RenderImages();

// to show how many times image shown

function countShow(arr){
  arr.sort(); //source: https://stackoverflow.com/questions/19395257/how-to-count-duplicate-value-in-an-array-in-javascript

  var current = null;
  var cnt = 0;
  for (var i = 0; i < arr.length; i++) {
      if (arr[i] != current) {
          if (cnt > 0) {
              Products.items[current].timesShown = cnt;
              console.log(current, cnt)
          }
          current = arr[i];
          cnt = 1;
      } else {
          cnt++;
      }
  }
  if (cnt > 0) {
    Products.items[current].timesShown = cnt;
    console.log(current, cnt)
  }
}

/********************* event listeners *******************************/

// add event listener to each image:

container.addEventListener('click',vote);

// vote function:

function vote(e){
  count++;
  
  // limit clicks to specific number
  if(maxCount >= count){

    if(e.target.id === 'left'){
      Products.items[leftIndex].vote++;
    }else if(e.target.id === 'right'){
      Products.items[rightIndex].vote++;
    }else{
      Products.items[midIndex].vote++;
    }
    RenderImages(); // to rendomize images each time we click
    
  }else{ // remove event listner when maxcount reached

    container.removeEventListener('click',vote);
  
  };

  // show button when max count reached
  if(maxCount === count){
    button.style.display = 'inline-block'; 
  };
};


// show results when button clicked 
button.addEventListener('click', Results);

function Results(){

  countShow(Values); // times of showing

  let ul = document.getElementById('list'); // parent

  let li=null;
  for(let i=0; i< Products.items.length;i++){
    li = document.createElement('li');
    ul.appendChild(li);
    li.textContent = `${Products.items[i].name} had ( ${Products.items[i].vote} ) votes, and was seen ( ${Products.items[i].timesShown} ) times.`
  };

  button.removeEventListener('click', Results); // to prevent repeating results

};