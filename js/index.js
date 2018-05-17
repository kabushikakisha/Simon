// variables
var pattern = [];
var playerPattern = [];
var count = 0;
var skip = true;
var strict = false;
var playing = false;
var interval = 750;

// audio objects
var gSound = document.getElementById("gSound"); 
var rSound = document.getElementById('rSound');
var ySound = document.getElementById('ySound');
var bSound = document.getElementById('bSound');

// functions

// light up buttons
function luG() {
  $('#G').css('background-color', 'hsl(120 70% 65%)');
  gSound.play();
}

function reG() {
  $('#G').css('background-color', 'hsl(120 70% 45%)');
  //gSound.pause();
}

function luR() {
  $('#R').css('background-color', 'hsl(0 70% 65%)');
  rSound.play();
}
function reR() {
  $('#R').css('background-color', 'hsl(0 70% 45%)');
  //rSound.pause();
}

function luB() {
  $('#B').css('background-color', 'hsl(240 70% 65%)');
  bSound.play();
}

function reB() {
  $('#B').css('background-color', 'hsl(240 70% 45%)');
  //bSound.pause();
}

function luY(){
  $('#Y').css('background-color', 'hsl(60 70% 65%)');
  ySound.play();
}

function reY() {
  $('#Y').css('background-color', 'hsl(60 70% 45%)');
  //ySound.pause();
}

// determine the next button in the pattern and add it to the array
function nextButton(){
  var num = Math.floor(Math.random() * (5) + 1);
  console.log(num);
  
  
  switch (num) {
    case 1:
      pattern.push('G');
      break;
    case 2:
      pattern.push('R');
      break;
    case 3:
      pattern.push('Y');
      break;
    case 4:
      pattern.push('B');
      break;
  }
}

// display the pattern
function displayPattern() {
  var i = 0;
  
  var disp = window.setInterval(function(){
    
    var item = pattern[i];
    
    if (item == pattern[i - 1] && skip) {
      console.log('double');
      skip = false;
    } else {      
      switch (item) {
        case 'G':
          luG();
          window.setTimeout(reG, interval);
          break;
        case 'R':
          luR();
          window.setTimeout(reR, interval);
          break;
        case 'Y':
          luY();
          window.setTimeout(reY, interval);
          break;
        case 'B':
          luB();
          window.setTimeout(reB, interval);
          break;
        }

      i++;
      skip = true;
      if (i >= pattern.length) {
       window.clearInterval(disp);
        }
    }
  }, interval);
}

// receive button presses
$('#G').click(function(){
  if (playing){
    luG();
  //playerPattern.push('G');
    window.setTimeout(reG, interval);
    checkButton('G');  
  }
});

$('#R').click(function(){
  if (playing) {
    luR();
    //playerPattern.push('R');
    window.setTimeout(reR, interval);
    checkButton('R');  
  }
  
});

$('#Y').click(function(){
  if (playing) {
    luY();
    //playerPattern.push('Y');
    window.setTimeout(reY, interval);
    checkButton('Y');    
  }
});

$('#B').click(function(){
  if (playing) {
    luB();
    //playerPattern.push('B');
    window.setTimeout(reB, interval);
    checkButton('B');
  }
});

// start the game
$('#start').click(function() {
  if(!playing) {
    $('#lbl-start').html('reset');
    playing = true;
    go();
    
  } else if (playing) {
    reset();
  }

});

// repeat button press
$('#repeat').mousedown(function() {
  $('#repeat').css('background-color', 'red');
  displayPattern();
});
$('#repeat').mouseup(function() {
  $('#repeat').css('background-color', 'yellow');
});

// activate strict mode
$('#strict').click(function(){
  if (!strict){
    $('#strict').css('background-color', 'red');
    strict = true;
  } else if (strict) {
    $('#strict').css('background-color', 'yellow');
    strict = false;
  }
  
});

// reset the game
function reset() {
  pattern = [];
  playerPattern = [];
  interval = 750;
  count = 0;
  updateCount();
  playing = false;
  $('#lbl-start').html('start');
}

// determine if player pressed the right button
function checkButton(button) {

  if(button == pattern[playerPattern.length]) {
   playerPattern.push(button);
    advance();
  } else {
    mistake();
  }
}

function advance() {
  if (pattern.length == playerPattern.length) {
    playerPattern = [];
    go();
  }
}

// handle mistakes - repeat or restart
function paws() {
  $('#countp').html('');
  updateCount();
}

function brrp() {
  $('#countp').html('!!');
};

function mistake() {
  $('#countp').html('');
  window.setTimeout(brrp, 100);
  window.setTimeout(updateCount, 750);
    
  if (strict) {
    reset();
  } else {
    playerPattern = [];
    displayPattern();
  }
}


// update and display count with 2 digits even when 
function updateCount() {
  count = pattern.length;
  if (count < 10) {
    count = '0' + count;
  }
  
  if (count == 5) {
    interval = 600;
  } else if (count == 9) {
    interval = 500;
  } else if (count == 13) {
    interval = 400;
  } else if (count >= 20) {
    count = '**';
  }
  
  $('#countp').html(count);
  
  if (count == '**') {
    window.setTimeout(reset, 1000);
  }
}

// collect functions into a single computer turn
function go() {
    nextButton();
    updateCount();
    displayPattern();
}