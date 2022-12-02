var canvas;
var bubbleBox;
function Animation(selector, option) {
  this.canvas = this.init(selector);
  this.bubbles = new Array(option.count).fill({}).map(function () {
    return new Bubbles(option);
  });
}

Animation.prototype.init = function (selector) {
  canvas = document.querySelector(selector);
  var resize = function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  resize();
  window.addEventListener("resize", resize);

  return canvas;
};

Animation.prototype.draw = function () {
  var drawer = this.draw.bind(this);

  this.bubbles.forEach(function (bubble) {
    animation(bubble.speed);
  });
  // window.requestAnimationFrame(drawer);
};

function Bubbles(option) {
  this.x = random(10, 320);
  this.y = random(10, 450);
  this.size = random(option.bubbleMinSize, option.bubbleMaxSize);
  this.speed = option.speed;
  var styles = {
    left: this.x > canvas.offsetWidth ? canvas.offsetWidth - 30 : this.x,
    top:
      this.y > canvas.offsetHeight
        ? canvas.offsetHeight
        : this.y < 350
        ? 350
        : this.y,
    size: this.size > 50 ? 50 : this.size,
    speed: this.speed > 5 ? 5 : this.speed < 0 ? 0 : this.speed,
  };
  createBubble(styles);
  bubbleBox = document.querySelectorAll(".cc-bubbles");
}

function createBubble(values) {
  var bubbleDiv = document.createElement("div");
  bubbleDiv.setAttribute("class", "cc-bubbles");
  bubbleDiv.style.left = values.left + "px";
  bubbleDiv.style.top = values.top + "px";
  bubbleDiv.style.width = values.size + "px";
  bubbleDiv.style.height = values.size + "px";
  canvas.append(bubbleDiv);
}

function animation(speed) {
  var t1;
  bubbleBox.forEach((i) => {
    t1 = gsap.fromTo(
      i,
      {
        y: i.style.top,
        transformOrigin: "center",
      },
      {
        y: -canvas.offsetHeight,
        x: Math.PI * 4,
        duration: Math.floor(Math.random() * 60) / speed,
        modifiers: {
          x: function (x) {
            return Math.sin(parseFloat(x)) * 20 + "px";
          },
        },
      }
    );
    t1.repeat(1);
  });
}

function random(min, max) {
  return Math.round(Math.floor(Math.random() * (max - min) + min));
}

new Animation("#effect", {
  count: 30,
  bubbleMinSize: 10,
  bubbleMaxSize: 30,
  speed: 4, // 1 ~ 5 : Slower > Faster
}).draw();
