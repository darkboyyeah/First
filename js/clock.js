var clock = document.getElementById("myCanvas");
var ctx = clock.getContext("2d");
var width = ctx.canvas.width;
var height = ctx.canvas.height;
var r = width / 2;

function drawClock() {
	ctx.save();
	ctx.translate(r, r);
	ctx.beginPath();
	ctx.lineWidth = 10;
	ctx.arc(0, 0, r - 5, 0, 2 * Math.PI), false;
	ctx.stroke();


	var hourNumbers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
	ctx.font = '18px Arial';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	hourNumbers.forEach(function(number, i) {
		var rad = 2 * Math.PI / 12 * i;
		var x = Math.cos(rad) * (r - 30);
		var y = Math.sin(rad) * (r - 30);
		ctx.fillText(number, x, y);
	});
	for (var i = 0; i <= 60; i++) {
		var rad = 2 * Math.PI / 60 * i;
		var x = Math.cos(rad) * (r - 18);
		var y = Math.sin(rad) * (r - 18);
		ctx.beginPath();
		if (i % 5 == 0) {
			ctx.fillStyle = '#000000';
			ctx.arc(x, y, 2, 0, 2 * Math.PI, false);
		} else {
			ctx.fillStyle = '#ccc';
			ctx.arc(x, y, 2, 0, 2 * Math.PI, false);
		}

		ctx.fill();
	}
}

function drawHour(hour, minute) {
	ctx.save();
	ctx.beginPath();
	ctx.lineCap = "round";
	var rad = 2 * Math.PI / 12 * hour;
	var mrad = 2 * Math.PI / 12 / 60 * minute;
	ctx.rotate(rad + mrad);
	ctx.lineWidth = 7;
	ctx.moveTo(0, 10);
	ctx.lineTo(0, -r / 2);
	ctx.stroke();
	ctx.restore();
}

function drawMinute(minute) {
	ctx.save();
	ctx.beginPath();
	var rad = 2 * Math.PI / 60 * minute;
	ctx.rotate(rad);
	ctx.lineCap = "round";
	ctx.lineWidth = 5;
	ctx.moveTo(0, 10);
	ctx.lineTo(0, -r + 50);
	ctx.stroke();
	ctx.restore();
}

function drawSecond(second) {
	ctx.save();
	var rad = 2 * Math.PI / 60 * second;
	ctx.beginPath();
	ctx.fillStyle = "red";
	ctx.rotate(rad);
	ctx.moveTo(-2, 20);
	ctx.lineTo(2, 20);
	ctx.lineTo(1, -r + 40);
	ctx.lineTo(-1, -r + 40);
	ctx.fill();
	ctx.restore();
}

function drawDot() {
	ctx.beginPath();
	ctx.fillStyle = '#ffffff';
	ctx.arc(0, 0, 3, 0, 2 * Math.PI, false);
	ctx.fill();
}

function draw() {
	ctx.clearRect(0, 0, width, height);
	var myDate = new Date();
	var h = myDate.getHours();
	var m = myDate.getMinutes();
	var s = myDate.getSeconds();
	drawClock();
	drawHour(h, m);
	drawMinute(m);
	drawSecond(s);
	drawDot();
	ctx.restore();
}

draw();
setInterval(draw, 1000);