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
let newValues=[];
let repeated = [];
let yes = null;

let NamesArr = []; // for chart

/******************** template *********************/

function Products(name,path){

  this.name = name;
  this.path = path;
  this.timesShown = 0;
  this.vote = 0;

  Products.items.push(this);  // to push each instance object here 
  NamesArr.push(this.name); // to add x-axis to chart
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

// check repeat at 2 next iterations

function CheckRepeat(){
    
  for(let i=0;i < newValues.length;i++){
    repeated.push(newValues.includes(Values[i]));
  };
  yes = repeated.includes(true);
  repeated=[];
}

// render 3 images:

function RenderImages(){

  // get previous iteration values
  Values = [leftIndex,midIndex,rightIndex];

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

  // get new values
  newValues = [leftIndex,midIndex,rightIndex];

  // prevent image repeat at 2 next iterations
  CheckRepeat();
  
  while(yes === true){
    
    leftIndex = randomIndex();
    midIndex = randomIndex();
    rightIndex = randomIndex();
    newValues = [leftIndex,midIndex,rightIndex];

    CheckRepeat();
  };
  
  // set source attribute for the images:
  leftImage.src = Products.items[leftIndex].path;
  Products.items[leftIndex].timesShown++; // to find how many times photos show
  rightImage.src = Products.items[rightIndex].path;
  Products.items[rightIndex].timesShown++; // to find how many times photos show
  midImage.src = Products.items[midIndex].path;
  Products.items[midIndex].timesShown++; // to find how many times photos show

};
RenderImages();


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
    }else if(e.target.id === 'mid'){
      Products.items[midIndex].vote++;
    }else{
      alert('please click one the photos'); // when user click outside any photo but inside the container
      count--;
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

  let ul = document.getElementById('list'); // parent

  let li=null;
  let VotesArr = []; // for chart
  let TimesShownArr = []; // for chart

  for(let i=0; i< Products.items.length;i++){

    VotesArr.push(Products.items[i].vote); // to add votes to chart y-axis 
    TimesShownArr.push(Products.items[i].timesShown); // to add timesShown to chart y-axis 

    li = document.createElement('li');
    ul.appendChild(li);
    li.textContent = `${Products.items[i].name} had ( ${Products.items[i].vote} ) votes, and was seen ( ${Products.items[i].timesShown} ) times.`
  };

  button.removeEventListener('click', Results); // to prevent repeating results

  // chart code:
  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: NamesArr, // products
        datasets: [
          {
            label: '# of Votes',
            data: VotesArr, // votes
            backgroundColor: ['rgba(255, 99, 132, 0.2)'],
            borderWidth: 1
          },
          {  // second object for number of time shown
            label: '# of Times Shown',
            data: TimesShownArr, // times shown
            backgroundColor: ['rgba(99, 255, 132, 0.2)'],
            borderWidth: 1
          }
        ]
    }
  });

};


