//Create variables here

var dog, happyDog, database, foodS, foodStock;
var fedTime,lastFed,foodObject;
var feed,add;

function preload()
{
	//load images here
  dogImage=loadImage("images/dogImg.png");
  happyDog=loadImage("images/dogImg1.png")
}

function setup() {
  database=firebase.database();
	createCanvas(1000, 500);
  foodObject=new FOOD();
  dog=createSprite(750,250, 20, 20);
  dog.scale=0.5;
  dog.addImage(dogImage);
  foodStock=database.ref('Food');
  foodStock.on("value", readStock);
  feed=createButton("Feed The Dog!🐶");
  feed.position(800,50);
  feed.mousePressed(feedDog);
  add=createButton("Add Food!🥣");
  add.position(700,50);
 add.mousePressed(addFood);
}



function draw() {  
background(46,139,87);

foodObject.display();
fedTime=database.ref("feedTime");
fedTime.on("value", function(data){
  lastFed=data.val();
});


fill("white");
textSize(15);
if(lastFed>=12){
  text("Last Fed: "+lastFed%12+"p.m",50,30);
}
else if(lastFed===0){
  text("Last Fed: 12 a.m",50,30);
}

else{
text("Last Fed: "+lastFed+"a.m",50,30);
}



  drawSprites();
  //add styles here

}
function readStock(food) {
foodS=food.val();
foodObject.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDog);
  if (foodObject.getFoodStock()<=0){
    foodObject.updateFoodStock(0);
  }
  else{
    foodObject.updateFoodStock(foodObject.getFoodStock()-1);
  }

  database.ref("/").update({
    Food:foodObject.getFoodStock(),
    feedTime:hour(),
  });
}

function addFood() {
  foodS++
  database.ref("/").update({
    Food:foodS,
  })
}
