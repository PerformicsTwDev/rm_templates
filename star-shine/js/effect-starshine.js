var canvas;
var starBox;
function Animation(selector, option) {
  this.canvas = this.init(selector, option);
  this.stars = new Array(option.position).fill({}).map(function () {
    return new Stars(option);
  });
}

Animation.prototype.init = function (selector, option) {
  canvas = document.querySelector(selector);
  canvas.style.width = option.canvasWidth + "px";
  canvas.style.height = option.canvasHeight + "px";
  canvas.style.top = option.canvasTop + "px";
  return canvas;
};

Animation.prototype.draw = function () {
  var drawer = this.draw.bind(this);

  this.stars.forEach(function (star) {
    animation();
  });
};

function Stars(option) {
  option.position.map((v) => {
    this.x = v[0];
    this.y = v[1];
    var styles = {
      left: this.x,
      top: this.y,
      size: random(option.minSize, option.maxsize),
    };

    createStars(styles);
  });

  starBox = document.querySelectorAll(".cc-stars");
}

function createStars(values) {
  console.log(values);
  var starDiv = document.createElement("div");
  starDiv.setAttribute("class", "cc-stars");
  starDiv.style.left = values.left + "px";
  starDiv.style.top = values.top + "px";
  starDiv.style.width = values.size + "px";
  starDiv.style.height = values.size + "px";
  canvas.append(starDiv);
}

function animation() {
  var v = random(1, 0.4);
  starBox.forEach((i) => {
    gsap.to(i, {
      opacity: v < 0.3 ? 1 : v,
      duration: random(2, 0.8),
      ease: "power1.out",
      repeat: 7,
      repeatDelay: 1,
      yoyo: true,
    });
    gsap.to(i, {
      rotation: 360,
      repeat: 6,
      yoyo: true,
      ease: "power3.out",
      duration: random(5, 2),
    });
    gsap.to(i, {
      opacity: 0.3,
      duration: 1,
    });
  });
}

function random(min, max) {
  if (max == null) {
    max = min;
    min = 0;
  }
  if (min > max) {
    var tmp = min;
    min = max;
    max = tmp;
  }
  return min + (max - min) * Math.random();
}

new Animation("#effect", {
  canvasWidth: 320,
  canvasHeight: 300,
  canvasTop: 180,
  minSize: 30,
  maxsize: 70,
  position: [
    [10, 20],
    [120, 90],
    [170, 220],
    [100, 40],
    [200, 10],
    [190, 105],
  ],
}).draw();
