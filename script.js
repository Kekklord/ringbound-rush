//http://www.colourlovers.com/palette/408962/Monkey_Announcemts
var settings = {
  general: {
    speed: 4.2,
    gravity: 15,
    jump: -3.5,
    margin: 154,
    biggestGradient: 5,
    step: 300,
    ring: {
      x: 100,
      height: 130,
      thickness: 10 } },


  game: {
    audio: true,
    score: 0,
    process: 0,
    elements: [],
    x: -1,
    y: -1,
    ay: -5,
    draw: function () {
      var prex = 0;
      var prey = 0;
      strokeWeight(6);
      stroke("#574C41");
      // console.log(settings.game.elements.length);
      for (var i = 1; i < settings.game.elements.length; i++) {
        //settings.game.elements[i].move();
        if (settings.game.elements[i][0] - settings.game.x < -2 * settings.general.step) {
          settings.game.elements.splice(0, 1);
        } else {
          noStroke();
          fill("#574C41");
          ellipse(settings.game.elements[i][0] - settings.game.x, settings.game.elements[i][1], 12, 12);

          noFill();
          strokeWeight(6);
          stroke("#574C41");
          line(settings.game.elements[i - 1][0] - settings.game.x, settings.game.elements[i - 1][1], settings.game.elements[i][0] - settings.game.x, settings.game.elements[i][1]);
          if (settings.game.elements[i][0] - settings.game.x < 550 && i == settings.game.elements.length - 1) {
            var par = (settings.game.elements[i][1] - settings.general.margin) / (windowHeight - 2 * settings.general.margin);
            var apar = 1 - par;

            var min = -200 * par;
            var max = 200 * apar;

            var h = Math.floor(random(min, max)) + settings.game.elements[i][1];

            settings.game.elements.push([settings.game.elements[i][0] += settings.general.step, h]);
          }
        }
        if (settings.game.elements[i][0] - settings.game.x - settings.general.step < settings.general.ring.x && settings.game.elements[i][0] - settings.game.x > settings.general.ring.x) {
          var per = (settings.game.x + settings.general.ring.x) % settings.general.step / settings.general.step;
          var newy = settings.game.elements[i - 1][1] +
          (settings.game.elements[i][1] - settings.game.elements[i - 1][1]) * per;
          strokeWeight(1);
          if (Math.abs(newy - settings.game.y) > settings.general.ring.height / 2 - settings.general.ring.thickness - 1) {
            settings.game.process = 2;
            $(".end").removeClass("hide");
            if (settings.game.audio) {
              deathAudio.play();
            }
          }
        }
        if (settings.game.x < 600 && Math.abs(settings.game.elements[0][1] - settings.game.y) > settings.general.ring.height / 2 - settings.general.ring.thickness - 1) {
          settings.game.process = 2;
          $(".end").removeClass("hide");
          if (settings.game.audio) {
            deathAudio.play();
          }
        }
      }

    },
    start: function () {
      settings.game.elements.push([0, windowHeight / 2]);
      settings.game.elements.push([600, windowHeight / 2]);
      //settings.game.elements.push([600,windowHeight / 3]);
    } },

  tools: {
    setup: function () {
      //console.clear();
      settings.game.y = windowHeight / 2;
    } } };


var deathAudio = new Audio('https://freesound.org/data/previews/204/204450_2801113-lq.mp3'),
jumpAudio = new Audio('https://freesound.org/data/previews/187/187025_2567799-lq.mp3'),
pointAudio = new Audio('https://freesound.org/data/previews/135/135125_2337290-lq.mp3');

function setup() {
  settings.tools.setup();
  createCanvas(500, windowHeight);
  setInterval(function () {
    if (settings.game.process == 1) {
      settings.game.ay += settings.general.gravity / 120;
      settings.game.y += settings.game.ay;
      settings.game.x += settings.general.speed / 2;
    }
  }, 8);
}

function windowResized() {
  switch (settings.game.process) {
    case 0:
    case 1:
    case 2:
      resizeCanvas(500, windowHeight);
      settings.game.y = windowHeight / 2;
      break;}

}

function draw() {
  if (settings.game.process != 2) {
    clear();
    noFill();

    //First
    strokeWeight(settings.general.ring.thickness);
    stroke("#E3A56B");
    bezier(settings.general.ring.x, settings.game.y - settings.general.ring.height / 2, settings.general.ring.x - settings.general.ring.height * 0.3, settings.game.y - settings.general.ring.height / 2, settings.general.ring.x - settings.general.ring.height * 0.3, settings.game.y + settings.general.ring.height / 2, settings.general.ring.x, settings.game.y + settings.general.ring.height / 2);

    //Lines
    strokeWeight(6);
    stroke("#574C41");
    if (settings.game.process == 0) {
      line(0, windowHeight / 2, 500, windowHeight / 2);
    } else {
      settings.game.draw();
    }
    //Last
    strokeWeight(settings.general.ring.thickness);
    stroke("#E3A56B");
    bezier(settings.general.ring.x, settings.game.y - settings.general.ring.height / 2, settings.general.ring.x + settings.general.ring.height * 0.3, settings.game.y - settings.general.ring.height / 2, settings.general.ring.x + settings.general.ring.height * 0.3, settings.game.y + settings.general.ring.height / 2, settings.general.ring.x, settings.game.y + settings.general.ring.height / 2);
    if (settings.game.process == 1) {
    }
    //Page
    if (settings.game.score != Math.max(Math.floor((settings.game.x + settings.general.ring.x - settings.general.step * 2) / settings.general.step), 0)) {
      settings.game.score = Math.max(Math.floor((settings.game.x + settings.general.ring.x - settings.general.step * 2) / settings.general.step), 0);
      $(".score").text(settings.game.score);
      $(".end.tweet").attr("href", `https://twitter.com/intent/tweet?original_referer=http%3A%2F%2Fflappyring.koya.io%2F&ref_src=twsrc%5Etfw&text=I%20got%20${settings.game.score}%20points%20in%20Flappy%20Ring!%20%23flappyring&tw_p=tweetbutton&url=http%3A%2F%2Fflappyring.koya.io%2F&via=koya_io`);
      $(".end.tweet span").text(`I got ${settings.game.score} points in Flappy Ring!`);
      if (settings.game.process == 1 && settings.game.audio) {
        pointAudio.play();
      }
    }
  } else {

  }

  //Frame
  strokeWeight(10);
  stroke("#574C41");
  line(0, 0, 0, windowHeight);
  line(499, 0, 499, windowHeight);

}

// $('body').click(function (evt) {
//   if ($(this).hasClass("noclick") || $(evt.target).closest('.noclick').length) {
//     return;
//   }

//   tap();
// });
$(document).on("touchstart", "body", function (evt) {
  if ($(this).hasClass("noclick") || $(evt.target).closest('.noclick').length) {
    return;
  }
  tap();
});

$(document).keydown(function (evt) {
  if (evt.keyCode == 32) {
    if (settings.game.process != 2) {
      tap();
    } else
    {
      restart();
    }
  }
});

function tap() {
  if (settings.game.process != 2 && settings.game.audio) {
    jumpAudio.play();
  }
  if (settings.game.process == 0) {
    settings.game.start();
    settings.game.process = 1;
    $(".start").addClass("hide");
  }
  settings.game.ay = settings.general.jump;
}

$(".end.button").click(function () {
  restart();
});

function restart() {
  $(".end").addClass("hide");
  $(".start").removeClass("hide");
  settings.game.elements = [];
  settings.game.x = 0;
  settings.game.y = windowHeight / 2;
  settings.game.ay = 0;
  setTimeout(function () {settings.game.process = 0;}, 100);
}

$(".sound").click(function () {
  settings.game.audio = !settings.game.audio;
  if (settings.game.audio) {
    $(".sound i").removeClass("fa-volume-off").addClass("fa-volume-up");
  } else {
    $(".sound i").addClass("fa-volume-off").removeClass("fa-volume-up");
  }
});