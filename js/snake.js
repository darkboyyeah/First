//点击开始游戏，出现向右运动的三节蛇，随机生成食物。
//蛇吃到食物，食物消失，蛇长度加一。
//蛇吃到自己，游戏结束。

var main = document.getElementById('map');
var start = document.getElementById('start');
var pause = document.getElementById('pause');
var scoreBox = document.getElementById('score');
var close = document.getElementById('close');
var snakeMove;
var speed = 150;
var startGameBool = true;   //是否开始游戏
var startPauseBool = true;	//是否暂停了
init();

function init() {
	//地图
	this.mapW = parseInt(getComputedStyle(main).width);
	this.mapH = parseInt(getComputedStyle(main).height);
	this.mapDiv = main;
	//食物的属性
	this.foodW = 10;
	this.foodH = 10;
	this.foodX = 0;
	this.foodY = 0;
	//蛇的属性
	this.snakeW = 10;
	this.snakeH = 10;
	this.snakeBody = [
		[3, 1, 'head'],
		[2, 1, 'body'],
		[1, 1, 'body']
	];
	this.direction = 'right';
	this.left = false;
	this.right = false;
	this.up = true;
	this.down = true;
	this.score = 0;
	bindEvent();
	
}
//游戏开始
function startGame() {
			//食物
		food();
		//蛇
		snake();
}

//食物
function food() {
	var food = document.createElement('div');
	food.style.width = this.foodW + 'px';
	food.style.height = this.foodH + 'px';
	food.style.position = 'absolute';
	this.foodX = Math.floor(Math.random() * (this.mapW / 10));
	this.foodY = Math.floor(Math.random() * (this.mapH / 10));
	food.style.left = this.foodX * 10 + 'px';
	food.style.top = this.foodY * 10 + 'px';
	this.mapDiv.appendChild(food).setAttribute('class', 'food');
}
//蛇
function snake() {
	for (var i = 0; i < this.snakeBody.length; i++) {
		var snake = document.createElement('div'); //创建蛇
		snake.style.width = this.snakeW + 'px';
		snake.style.height = this.snakeH + 'px';
		snake.style.position = 'absolute';
		snake.style.left = this.snakeBody[i][0] * 10 + "px";
		snake.style.top = this.snakeBody[i][1] * 10 + "px";
		snake.classList.add(this.snakeBody[i][2]); //给蛇的每个部位添加class属性
		this.mapDiv.appendChild(snake).classList.add('snake');
		//当方向改变，蛇头也需要相应变化
		switch (this.direction) {
			case 'right':
				break;
			case 'left':
				snake.style.transform = 'rotate(180deg)';
				break;
			case 'up':
				snake.style.transform = 'rotate(270deg)';
				break;
			case 'down':
				snake.style.transform = 'rotate(90deg)';
		}
	}
}

//蛇运动
function move() {
	for (var i = this.snakeBody.length - 1; i > 0; i--) {
		this.snakeBody[i][0] = this.snakeBody[i - 1][0];
		this.snakeBody[i][1] = this.snakeBody[i - 1][1];
	}
	switch (this.direction) {
		case 'right': //向右运动
			this.snakeBody[0][0] += 1;
			break;
		case 'left': //向左运动
			this.snakeBody[0][0] -= 1;
			break;
		case 'up': //向上运动
			this.snakeBody[0][1] -= 1;
			break;
		case 'down': //向下运动
			this.snakeBody[0][1] += 1;
			break;
		default:
			break;
	}
	removeClass('snake'); //移除蛇
	snake(); //创建蛇
	//蛇吃食物
	if (this.snakeBody[0][0] == this.foodX && this.snakeBody[0][1] == this.foodY) {
		var snakeEndX = this.snakeBody[this.snakeBody.length - 1][0]; //蛇尾的X坐标
		var snakeEndY = this.snakeBody[this.snakeBody.length - 1][1]; //蛇尾的Y坐标
		switch (this.direction) {
			case 'right':
				this.snakeBody.push([snakeEndX + 1, snakeEndY, 'body']);
				break;
			case 'left':
				this.snakeBody.push([snakeEndX - 1, snakeEndY, 'body']);
				break;
			case 'up':
				this.snakeBody.push([snakeEndX, snakeEndY - 1, 'body']);
				break;
			case 'down':
				this.snakeBody.push([snakeEndX, snakeEndY + 1, 'body']);
				break;
			default:
				break;
		}
		this.score += 1;
		scoreBox.innerHTML = this.score;
		removeClass('food');
		food();
	}

	//蛇碰到边界
	if (this.snakeBody[0][0] < 0 || this.snakeBody[0][1] < 0 ||
		this.snakeBody[0][0] >= this.mapW / 10 || this.snakeBody[0][1] >= this.mapH / 10) {
			
			alert("哎呀，你撞墙了！你的得分为"+this.score);
			reloadGame();
	}
	var snakeHX = this.snakeBody[0][0];
	var snakeHY = this.snakeBody[0][1];
	//蛇吃到自己
	for (var i = 1; i < this.snakeBody.length; i++) {
		if (snakeHX == this.snakeBody[i][0] && snakeHY == this.snakeBody[i][1]) {
			alert("哎呀，你吃到自己了！你的得分为"+this.score);
			reloadGame();
		}
	}

}

function reloadGame() {
	removeClass('snake');
	removeClass('food');
	clearInterval(snakeMove);
	this.snakeBody = [
		[3, 1, 'head'],
		[2, 1, 'body'],
		[1, 1, 'body']
	];
	this.direction = 'right';
	this.left = false;
	this.right = false;
	this.up = true;
	this.down = true;
	this.score = 0;
	scoreBox.innerHTML = 0;
	startGameBool = true;   
	startPauseBool = true;
	start.innerHTML = '开始游戏';	
}

//蛇每次移动，都要将之前的蛇移除掉，然后再重新生成
function removeClass(className) {
	var ele = document.getElementsByClassName(className);
	while (ele.length > 0) {
		ele[0].parentNode.removeChild(ele[0]);
	}
}

//设置蛇运动方向
function setDirect(code) {
	switch (code) {
		case 37:
			if (this.left) {
				this.direction = 'left';
				this.left = false;
				this.right = false;
				this.up = true;
				this.down = true;
			}
			break;
		case 38:
			if (this.up) {
				this.direction = 'up';
				this.left = true;
				this.right = true;
				this.up = false;
				this.down = false;
			}
			break;
		case 39:
			if (this.right) {
				this.direction = 'right';
				this.left = false;
				this.right = false;
				this.up = true;
				this.down = true;
			}
			break;
		case 40:
			if (this.down) {
				this.direction = 'down';
				this.left = true;
				this.right = true;
				this.up = false;
				this.down = false;
			}
			break;
		default:
			break;
	}
}

//监听键盘按下的事件
function bindEvent() {

	start.onclick = function() {
		startAndPause();
	}

}
function startAndPause() {
	if(startPauseBool){   //当前没有暂停游戏  值为true
		if(startGameBool){
			startGame();
			startGameBool = false;
			
		}
		
		start.innerHTML = '暂停游戏';
		document.onkeydown = function(e) {
			var ev = e || window.event;
			var code = ev.keyCode;
			setDirect(code);
		}
		snakeMove = setInterval(function() {
			move();
		}, speed);
		startPauseBool = false;
	}else{
		start.innerHTML = '开始游戏';
		clearInterval(snakeMove);
		document.onkeydown = function(e) {
			var ev = e || window.event;
			ev.returnValue = false;
			return false;
		};
		startPauseBool = true; 
	}
}