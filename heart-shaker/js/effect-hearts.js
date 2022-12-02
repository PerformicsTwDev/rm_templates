var canvas;
var iconBox;

function Animation(selector, option) {
  this.canvas = this.init(selector);
  this.icons = new Array(option.count).fill({}).map(function () {
    return new Icon(option);
  });
}

Animation.prototype.init = function (selector) {
  canvas = document.querySelector(selector);
  return canvas;
};

Animation.prototype.draw = function () {
  var speedSet;
  this.icons.forEach((i) => {
    createIcon(i);
    speedSet = i.speed;
  });
  iconBox = document.querySelectorAll(".cc-hearts");
  // setInterval(animation(speedSet), 2000);
  animation(speedSet);
};

function Icon(option) {
  var posX = random(2, 190);
  var posY = random(-10, 50);
  var ranSpeed = random(10, option.speed);

  (this.x = posX > canvas.offsetWidth ? canvas.offsetWidth : posX),
    (this.y = posY < canvas.offsetHeight ? canvas.offsetHeight : posY),
    (this.size = random(option.minSize, option.maxSize));
  this.speed = ranSpeed;
}

function createIcon(values) {
  var bubbleDiv = document.createElement("div");
  bubbleDiv.setAttribute("class", "cc-hearts");
  bubbleDiv.style.left = values.x + "px";
  bubbleDiv.style.top = values.y + "px";
  bubbleDiv.style.width = values.size + "px";
  bubbleDiv.style.height = parseInt(values.size + 15) + "px";
  canvas.append(bubbleDiv);
}

function animation(speed) {
  var opc = random(1, 2);
  var scaleS = random(2, 3) / 100;

  iconBox.forEach((i) => {
    var t1 = gsap.fromTo(
      i,
      { y: random(20, -120), opacity: 0 },

      {
        y: random(-parseInt(i.style.top), -150),
        opacity: opc > 1 ? 1 : opc,
        scale: scaleS > 1 ? 1 : scaleS,
        duration: random(1.9, speed),
        ease: Power2.easeInOut,
        delay: 0.3,
        onComplete: function () {
          i.style.opacity = 0;
        },
      }
    );
    t1.repeat(2);
  });
}

function random(min, max) {
  return Math.round(Math.floor(Math.random() * (max - min) + min));
}

new Animation("#effect", {
  count: 13,
  minSize: 20,
  maxSize: 65,
  speed: 5, // 1 ~ 5 : Faster > Slower
}).draw();
