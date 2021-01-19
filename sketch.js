const Engine = Matter.Engine;
const Body = Matter.Body;
const Bodies = Matter.Bodies;
const World = Matter.World;

//Create variables here
//var dogImage, happyDogImage;
var dogSprite;
var dog, happyDog;
var foodS, foodStock;
var database;
var buttonFeed, buttonAdd;
var fedTime, lastFed;
var foodObj;

function preload() {
  //load images here
  dog = loadImage("images/Dog.png");
  happyDog = loadImage("images/happyDog.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  dogSprite = createSprite(250,250,100,100);
  imageMode(CENTER);
  //image(dog,250,250,100,100);
  dogSprite.addImage(dog,100,100,5,5);
  dogSprite.scale=0.15;

  foodStock=database.ref("food");
  foodStock.on("value",readStock);

  fedTime = database.ref("FeedTime");
  fedTime.on("value", readTime);

  foodObj = new Food(foodS,lastFed);

  buttonFeed = createButton("Feed the Dog");
  buttonFeed.position(700,95);
  buttonFeed.mousePressed(feedDog);

  buttonAdd = createButton("Add Food");
  buttonAdd.position(800,95);
  buttonAdd.mousePressed(reStock);
}


function draw() {  
  background(46,139,87);

  foodObj.display();
  fedTime = database.ref("FeedTime");

 
  drawSprites();

  foodObj.display();

  //add styles here
  textSize(20);
  fill(0,0,0);
  stroke(10);
  
  text("Milk bottles remaining: "+ foodS,125,30);
  text("Last yummy meal : "+ lastFed,125,450);
}

function readStock(data){
  foodS = data.val();
  console.log(foodS);

}

function readTime(data){
  lastFed = data.val();

}


function feedDog(){
if(foodS<=0){
  foodS=0;
}
else{
  foodS=foodS-1;
}
database.ref('/').update({
  food:foodS
})

var currentTime = hour();
  database.ref('/').update({
    FeedTime:currentTime
  })
}

function reStock(){
      foodS=foodS+1;
  
  database.ref('/').update({
    food:foodS
  })

  

  console.log(foodS);
}