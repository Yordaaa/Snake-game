
const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
console.log(ctx);


const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

// Now we need an array to save the bodies of our snake 
let score = 0; 
let snake = [];

 

snake[0]= {
  x : (Math.floor(Math.random() *
    columns)) * scale,
  y : (Math.floor(Math.random() *
    rows)) * scale
};
console.log(snake);

let food = {
  x : (Math.floor(Math.random() *
    columns)) * scale, 
  y : (Math.floor(Math.random() *
    rows)) * scale
}

// call our draw function every 100 ms
let playGame = setInterval(draw,100);

//control the snake direction
// Let's initially make the snake move right  
let d = "right";

// Use the keyboard keys to control the direction of the snake 
document.onkeydown = direction;

function direction(event){
  let key = event.keyCode;
  if( key == 37 && d != "right"){
      d = "left";
  }else if(key == 38 && d != "down"){
      d = "up";
  }else if(key == 39 && d != "left"){
      d = "right";
  }else if(key == 40 && d != "up"){
      d = "down";
  }
}
// Function to draw our snake and the food 
function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// Draw snake 
	for (let i=0; i<snake.length; i++) {
		ctx.fillStyle = "#fff";
		ctx.strokeStyle = "red";
	  ctx.fillRect(snake[i].x,
	    snake[i].y, scale, scale);
      ctx.strokeRect(snake[i].x,snake[i].y,scale,scale);  
	}
	console.log(snake);
	// Draw food 
	ctx.fillStyle = "#ff0";
	ctx.strokeStyle = "green";
	ctx.fillRect(food.x, food.y, scale, scale);
	ctx.strokeRect(food.x, food.y,scale,scale);
  // old head position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;
  console.log(snakeX);
  // which direction
  if( d == "left") snakeX -= scale;
  if( d == "up") snakeY -= scale;
  if( d == "right") snakeX += scale;
  if( d == "down") snakeY += scale;

  if (snakeX > canvas.width) {
    snakeX = 0;
  }
  if (snakeY > canvas.height) {
    snakeY = 0;
  }
  if (snakeX < 0) {
    snakeX = canvas.width;
  }
  if (snakeY < 0) {
    snakeY = canvas.height;
  }
  // if the snake eats the food, it grows 
  if(snakeX == food.x && snakeY == food.y){
      score++;
      food = {
          x : (Math.floor(Math.random() * columns)) * scale,
          y : (Math.floor(Math.random() * rows)) * scale
      }
  }else{
      
      snake.pop();
  }
  console.log(snake);
  // New head position 
  let newHead = {
      x : snakeX,
      y : snakeY
  }
  console.log(snake);
  if(eatSelf(newHead,snake)){
  	clearInterval(playGame);
  }
  snake.unshift(newHead);
}

// check if snake is eating itself 
function eatSelf(head,array){
  for(let i = 0; i < array.length; i++){
      if(head.x == array[i].x && head.y == array[i].y){
          return true;
      }
  }
  return false;
}

