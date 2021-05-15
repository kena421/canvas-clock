
var canvas = document.querySelector('canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');
/*
//draw rectangle
c.fillStyle = "red";
c.fillRect(100,100,100,100); //fill color
//draw lines
c.beginPath();
c.moveTo(50,300);
c.lineTo(300, 100);
c.lineTo(500, 100);
c.lineTo(500, 200);
c.strokeStyle = "green"; //stroke color
c.stroke();

//drawing circles
c.beginPath();
c.arc(200, 200, 40, 0, 2 * Math.PI);
c.stroke();

//text in rectangle
c.fillText("hello world ", 50,50)
c.stroke()

//text stroke
c.font = "30px arial"
c.strokeText("hello world ", 250,50)
c.stroke()

// //drawing linear gradient
// var grad = c.createLinearGradient(10,10,200,0);
// grad.addColorStop(0,'red')
// grad.addColorStop(1,'green')
// grad.addColorStop(0.25,'white')
// c.fillStyle = grad
// c.fillRect(10,10,150,80)

//drawing linear gradient
// Create gradient
var grd = c.createRadialGradient(75, 50, 5, 90, 60, 100);
grd.addColorStop(0, "red");
grd.addColorStop(1, "green");

// Fill with gradient
c.fillStyle = grd;
c.fillRect(190, 10, 150, 80);

console.log(canvas);

// var gradient = c.createRadialGradient(90,80,50, 135,100,100);

// // Add three color stops
// gradient.addColorStop(0, 'pink');
// gradient.addColorStop(.9, 'red');
// gradient.addColorStop(1, 'rgba(1,1,1,1)');

// // Set the fill style and draw a rectangle
// c.fillStyle = gradient;
// c.fillRect(10, 0, 400, 400);
*/

var r = 200;
var h = canvas.height;
var w = canvas.width;


//hour minute second hand length
var hl = r*0.6;
var ml = r*0.83;
var sl = r*0.9;


//width of hands
var hw = r*0.07;
var mw = r*0.07;
var sw = r*0.02;

c.translate(w/2,h/2);
var a = 0;
setInterval(()=>{
    a++;
    createClock(a%2);
}, 1000);

function createClock(andarBahar){
    if(andarBahar === 1) c.translate(50,50);
    else c.translate(-50,-50);
    drawFace(c,r);
    drawNumbers(c,r);
    darwTime(c,r);
}



function drawFace(c, r){

    
    //starting the path to create circle
    c.beginPath();
    //pointer is already at center
    
    c.arc(0,0, r, 0, 2*Math.PI)
    c.fillStyle = "white";
    c.fill();
    
    //creating radial gradient for the stroke or white circle
    var radialGradient = c.createRadialGradient(0,0,r*0.95,0,0,r*1.05); 
    radialGradient.addColorStop(0,'#333');
    radialGradient.addColorStop(0.5,'white');
    radialGradient.addColorStop(1,'#333');
    
    c.strokeStyle = radialGradient;
    c.lineWidth = r*0.1;
    c.stroke();
    
    c.beginPath();
    c.arc(0,0,15,0,Math.PI*2);
    c.fillStyle = 'black';
    c.fill();
    //now creating the middle black circle
}
 
function drawNumbers(c,r){

    //now drawing numbers on the clock
    var angle;
    var num;
    c.font = `${r*0.15}px arial`;
    //make the text in middle of line wrt horizontal line
    c.textBaseline = 'middle';
    //making the text in center wrt vertical line
    c.textAlign = 'center';
    for(num = 1; num < 13; num++){
        //this is the angle we need to rotate each time
        angle = num*Math.PI/6;
        //rotate the axis first by clockwise
        c.rotate(angle);
        //move by some distance in rotated axes
        //we are only moving in y axis
        c.translate(0, -r*.85);
        //we reached to the desired point but our axes are rotated
        //if wrote at this point then it will be written rotated
        //so we need to restore the angle
        c.rotate(-angle);
        //now write in normal axes
        //we need to write at origin 
        c.fillText(num.toString(), 0,0);
        // now we need to go back to the center of cricle
        //make the axes rotated then move in y axis
        c.rotate(angle);
        c.translate(0, r*.85);
        //we have come to center but axes are rotated so restore axes
        c.rotate(-angle);
    
    }
}



function  drawHand(c, angle, length, width,){
    //we need to create paths
    c.beginPath();
    //path stroke width 
    c.lineWidth = width;
    //corners should be round
    c.lineCap = "round";
    //strting from origin
    c.moveTo(0,0);
    c.rotate(angle);
    //now we need to rotate axes 
    //and move in that axis
    c.lineTo(0,-length);
    //now give the stroke
    c.stroke();
    //restore the axes
    c.rotate(-angle);
    
}


//now our time is hour : minute : second

function darwTime(c,r){
    
    //now we need to find the current time
    
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    hour = hour%12
    

    var hourAngleMade = hour*Math.PI/6 + minute*Math.PI/360 + second*Math.PI/(6*3600);
    var minuteAngleMade = minute*Math.PI/30 + second*Math.PI/30/60;
    var secondAngleMade = second*Math.PI/30;
    console.log(hourAngleMade, minuteAngleMade, secondAngleMade);
    drawHand(c,hourAngleMade, hl,hw );
    drawHand(c,minuteAngleMade, ml,mw );
    drawHand(c,secondAngleMade, sl,sw );
}






