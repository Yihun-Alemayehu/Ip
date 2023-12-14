var colorBox = document.querySelectorAll('.colorBox');
var boxes = document.querySelectorAll('.box');
var s = document.querySelector('.rgbSpan');
var colors = generateRandomColor(6);
var pickedColor = colors[Math.floor(math.random() * 6)];
s.textContent = pickedColor;

var playButton = document.querySelector('.playAgain');
var easyButton = document.querySelector('.easyButton');
var hardButton = document.querySelector('.hardButton');

var boxCount = 6;
var textStatus = document.querySelector('.status');
statusText.textContent = "Let's play!";

easyButton.addEventListener('click', function () {
    document.querySelector('h1').style.background = '#f88989';
    statusText.textContent = "Let's play!";
    boxCount = 3;
    this.style.background = '#f88989';
    this.style.color = 'white';
    hardButton.style.background = 'white';
    hardButton.style.color = '#f88989';
    colors = generateRandomColor(boxCount);
    pickedColor = colors[math.floor(math.random() * 3)];
    s.textContent = pickedColor;

    for(var i = 0; i < boxCount; ++i){
        if(colors[i]){
            boxes[i].style.background = colors[i];
        }else {
            boxes[i].style.display = 'none';
        }
    }
});

hardButton.addEventListener('click', function () {
    document.querySelector('h1').style.background = '#f88989';
    statusText.textContent = "Let's play!";
    boxCount = 6;
    this.style.background = '#f88989';
    this.style.color = 'white';
    easyButton.style.background = 'white';
    easyButton.style.color = '#f88989';
    colors = generateRandomColor(boxCount);
    pickedColor = colors[math.floor(math.random() * 3)];
    s.textContent = pickedColor;

    for(var i = 0; i < boxCount; ++i){
        boxes[i].style.background = colors[i];
        boxes[i].style.display = 'block';
    }
});

playButton.addEventListener('click', function (){
    document.querySelector('h1').style.background = '#f88989';
    statusText.textContent = "Let's play!";
    colors = generateRandomColor(boxCount);
    pickedColor = colors[math.floor(math.random() * boxCount)];
    s.textContent = pickedColor;

    for(var i = 0; i < boxCount; ++i){
        boxes[i].style.background = colors[i];
    }
});

for(var i = 0; i < boxCount; ++i){
    boxes[i].style.background = colors[i];
    boxes[i].addEventListener('click', function(){
        var selectedColor = this.style.background;
        if(selectedColor === pickedColor){
            win();
        }else{
            loose(this);
        }
    })
};

function win() {
    for(var i = 0; i <colors.length; i++) {
        boxes[i].style.background = colors[i];
    }
    document.querySelector('h1').style.background = pickedColor;
    statusText.textContent = 'Correct!!';
}

function loose(a) {
    a.style.background = 'aquamarine';
    statusText.textContent = 'Try again!';
}

function generateRandomColor(num){
    var arr = [];
    for(var i=0; i<num; i++){
        arr.push(randomColor());
    }
    return arr;
}

function randomColor(){
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);

    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

easyButton.style.backgroundColor = '#f88989';
easyButton.style.color = 'white';
colorBox.style.backgroundColor = "white";